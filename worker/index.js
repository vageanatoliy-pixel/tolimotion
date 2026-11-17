/**
 * tolimotion.com — the site itself is static (Astro → dist/, served by Workers Static Assets).
 * This Worker has one job: byte-range requests for video.
 *
 * Workers Static Assets ignores the Range header (it answers 200 with the whole file), and Apple's
 * media stack (Safari on iPhone, iPad and Mac) will not play a video from a server that cannot serve
 * byte ranges (AVFoundation error -11850, "server incorrectly configured"; verified 2026-11-17).
 * Cloudflare documents this and prescribes the same fix: route the video paths to a Worker
 * (assets.run_worker_first in wrangler.jsonc) and answer ranges there with 206 Partial Content.
 *
 * Two runtime facts shape the code (both measured with wrangler 4.164 / workerd 1.20261117):
 * - responses from the ASSETS binding carry no Content-Length, so file sizes come from
 *   video-sizes.json, written from dist/ before every deploy (worker/video-sizes.mjs);
 * - a default stream reader returns 4 KiB per read, so skipping to a far offset would cost thousands
 *   of JS iterations (over the free plan's 10 ms CPU); 1 MiB BYOB reads keep it to a few, and once the
 *   rest of the file is the rest of the range the bytes go through a native pipe.
 */
import SIZES from './video-sizes.json';

const BLOCK = 1 << 20; // 1 MiB
const SINGLE_RANGE = /^bytes=(\d*)-(\d*)$/i;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const range = request.headers.get('Range');
    const size = sizeOf(url.pathname);
    if (size === undefined) {
      /* Not a known video, so most likely the 404 page: no revalidation (a 304 would bring back the
         /loops/* 7-day caching from public/_headers), so finish() can mark it uncacheable. */
      const h = new Headers(request.headers);
      h.delete('If-None-Match');
      h.delete('If-Modified-Since');
      return finish(await env.ASSETS.fetch(new Request(request, { headers: h })));
    }
    if (request.method !== 'GET' || !range) return finish(await env.ASSETS.fetch(request));

    /* Range, If-Range and If-Match are evaluated here (for Range requests only); If-None-Match by the
       asset server, which answers 304 for one exact tag. */
    const headers = new Headers(request.headers);
    headers.delete('Range');
    headers.delete('If-Range');
    headers.set('Accept-Encoding', 'identity');
    const asset = await env.ASSETS.fetch(new Request(url, { method: 'GET', headers }));
    if (asset.status !== 200 || !asset.body || asset.headers.has('Content-Encoding')) return finish(asset);

    const etag = asset.headers.get('ETag');
    /* If-Match: never continue a download with bytes of a file that has changed since. */
    const ifMatch = request.headers.get('If-Match');
    if (ifMatch && !matchesAny(ifMatch, etag)) return bodiless(asset, 412);
    /* If-Range: the range applies only while the client's copy is still this exact file. */
    const ifRange = request.headers.get('If-Range');
    if (ifRange && !strongEqual(ifRange.trim(), etag)) return finish(asset);

    const m = SINGLE_RANGE.exec(range.trim());
    /* Several ranges or another unit: the whole file, which RFC 9110 allows. */
    if (!m || (m[1] === '' && m[2] === '')) return finish(asset);

    let start;
    let end;
    if (m[1] === '') {
      const n = Number(m[2]); // bytes=-N: the last N bytes
      if (n === 0) return bodiless(asset, 416, size);
      start = Math.max(0, size - n);
      end = size - 1;
    } else {
      start = Number(m[1]);
      const last = m[2] === '' ? Infinity : Number(m[2]);
      if (last < start) return finish(asset); // malformed: ignore the Range header
      if (start >= size) return bodiless(asset, 416, size);
      end = Math.min(last, size - 1);
    }

    const out = new Headers(asset.headers);
    out.set('Accept-Ranges', 'bytes');
    out.set('Content-Range', `bytes ${start}-${end}/${size}`);
    const { readable, writable } = new FixedLengthStream(end - start + 1); // sends Content-Length
    ctx.waitUntil(copyRange(asset.body, writable, start, end, size).catch(() => {})); // streams while the client reads
    return new Response(readable, { status: 206, headers: out });
  },
};

/* Bytes [start, end] of `src` into `dst`. Skips in 1 MiB BYOB reads (the buffer is reused, nothing is
   written yet); a range that runs to the end of the file then becomes a native pipe; a bounded range is
   copied in ≤ 1 MiB reads into fresh buffers, and the rest of the file is never read. */
async function copyRange(src, dst, start, end, size) {
  const reader = src.getReader({ mode: 'byob' });
  const writer = dst.getWriter();
  let pos = 0;
  let piped = false;
  let buf = new ArrayBuffer(BLOCK);
  try {
    while (pos < start) {
      const want = Math.min(BLOCK, start - pos);
      const { done, value } = await reader.readAtLeast(want, new Uint8Array(buf, 0, want));
      if (done || !value) throw new Error('video is shorter than video-sizes.json says');
      pos += value.byteLength;
      buf = value.buffer; // a BYOB read detaches the buffer it was given and hands it back here
    }
    if (end === size - 1) {
      reader.releaseLock();
      writer.releaseLock();
      piped = true;
      await src.pipeTo(dst);
      return;
    }
    while (pos <= end) {
      const want = Math.min(BLOCK, end + 1 - pos);
      const { done, value } = await reader.readAtLeast(want, new Uint8Array(want));
      if (value && value.byteLength) {
        await writer.write(value);
        pos += value.byteLength;
      }
      if (done) break;
    }
    await writer.close();
  } catch (err) {
    if (!piped) await writer.abort(err).catch(() => {});
    throw err;
  } finally {
    if (!piped) await reader.cancel().catch(() => {});
  }
}

function sizeOf(pathname) {
  let path;
  try {
    path = decodeURIComponent(pathname);
  } catch {
    return undefined;
  }
  return Object.hasOwn(SIZES, path) ? SIZES[path] : undefined;
}

/* 200: say that ranges work. Errors (the 404 page for a missing video): never cached, even under
   /loops/* where public/_headers asks browsers to keep files for 7 days. */
function finish(res) {
  if (res.status !== 200 && res.status < 400) return res;
  const r = new Response(res.body, res);
  if (res.status === 200) r.headers.set('Accept-Ranges', 'bytes');
  else r.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  return r;
}

/* 412 / 416 with the file's own headers (ETag, _headers rules) but no body. */
function bodiless(asset, status, size) {
  asset.body.cancel().catch(() => {});
  const h = new Headers(asset.headers);
  h.delete('Content-Length');
  h.delete('Content-Type');
  h.set('Accept-Ranges', 'bytes');
  h.set('Cache-Control', 'no-store');
  if (status === 416) h.set('Content-Range', `bytes */${size}`);
  return new Response(null, { status, headers: h });
}

/* If-Range: one strong entity-tag, compared exactly (a weak tag or a date never matches). */
function strongEqual(tag, etag) {
  return !!etag && !etag.startsWith('W/') && !tag.startsWith('W/') && tag === etag;
}

/* If-Match: "*" or a list of strong entity-tags. */
function matchesAny(list, etag) {
  if (list.trim() === '*') return !!etag;
  return list.split(',').some((t) => strongEqual(t.trim(), etag));
}
