/* =====================================================================
   script.js
   Renders CONTENT (content.js) into index.html and hides anything that is
   empty or still "TODO:". Also: lazy media, fade-in on scroll, a lightbox
   for stills and analytics events. Plain JS, no dependencies.
   ===================================================================== */
(() => {
  'use strict';

  const C = window.CONTENT || {};
  const L = C.labels || {};
  const DEBUG = C.debug === true || /[?&]debug\b/.test(location.search);
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- Content helpers ---------------------------------------- */

  // Filled = a non-empty string that does not start with "TODO".
  const isSet = (v) => typeof v === 'string' && v.trim() !== '' && !/^TODO\b/i.test(v.trim());
  const val = (v) => (isSet(v) ? v.trim() : null);
  const list = (v) => (Array.isArray(v) ? v : []);
  const get = (path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), C);
  const join = (...parts) => parts.filter(isSet).join(': ') || null;

  // Tiny element builder: h('p', { class: 'x' }, 'text', childElement)
  function h(tag, attrs = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'style') el.style.cssText = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
    el.append(...kids.flat().filter((k) => k != null && k !== false));
    return el;
  }

  // A string becomes one paragraph, an array becomes a bullet list.
  function prose(v, cls) {
    if (Array.isArray(v)) {
      const items = v.filter(isSet);
      return items.length ? h('ul', { class: ['prose', cls].filter(Boolean).join(' ') }, items.map((t) => h('li', {}, t.trim()))) : null;
    }
    return isSet(v) ? h('p', { class: cls }, v.trim()) : null;
  }

  // "Every shelf, *one story.*" -> text with the starred part in <em>.
  const rich = (s) => s.split(/\*([^*]+)\*/).map((part, i) => (i % 2 ? h('em', {}, part) : part));

  // A path that is filled in but whose file is missing: hide its item, then
  // any group (section, grid) left with no visible items, instead of showing it broken.
  function drop(el, src) {
    console.warn(`[content] File not found, hiding it: ${src}`);
    const item = el.closest('[data-item]');
    if (!item) return;
    item.hidden = true;
    const grid = item.parentElement;
    if (grid?.dataset.count) grid.dataset.count = [...grid.children].filter((c) => !c.hidden).length;
    for (let g = item.parentElement?.closest('[data-group]'); g; g = g.parentElement?.closest('[data-group]')) {
      const alive = $$('[data-item]', g).some((i) => !i.hidden && i.parentElement.closest('[data-group]') === g);
      if (alive) break;
      g.hidden = true;
    }
  }

  // Still image inside a button that opens the lightbox.
  function still(src, alt) {
    const img = h('img', { src: src.trim(), alt: alt || '', loading: 'lazy', decoding: 'async' });
    img.addEventListener('error', () => drop(img, src), { once: true });
    return h('button', { type: 'button', class: 'zoom', 'aria-label': join(L.openFull, alt) }, img);
  }

  // Video. Lazy ones get their src only when they come near the screen.
  function video(src, poster, { lazy = true, ...attrs } = {}) {
    const v = h('video', { playsinline: true, preload: lazy ? 'none' : 'metadata', ...attrs });
    if (lazy) {
      v.dataset.src = src.trim();
      if (isSet(poster)) v.dataset.poster = poster.trim();
    } else {
      v.src = src.trim();
      if (isSet(poster)) v.poster = poster.trim();
    }
    v.addEventListener('error', () => drop(v, src), { once: true });
    return v;
  }

  const frame = (child, attrs = {}) => h('div', { class: 'frame', 'data-item': true, ...attrs }, child);

  // Loom / Vimeo share links -> embed URLs. Other http(s) URLs pass through as they are.
  function embedUrl(raw) {
    if (!isSet(raw)) return null;
    let u;
    try { u = new URL(raw.trim()); } catch { return null; }
    if (!/^https?:$/.test(u.protocol)) return null;
    const host = u.hostname.replace(/^www\./, '');
    let m;
    if (host === 'loom.com' && (m = u.pathname.match(/^\/(?:share|embed)\/([\w-]+)/))) return `https://www.loom.com/embed/${m[1]}`;
    if (host === 'vimeo.com' && (m = u.pathname.match(/^\/(\d+)(?:\/(\w+))?/))) return `https://player.vimeo.com/video/${m[1]}${m[2] ? `?h=${m[2]}` : ''}`;
    return u.href;
  }

  /* ---------- Analytics ---------------------------------------------- */
  // Plausible or Umami if their script is on the page (see index.html <head>),
  // otherwise navigator.sendBeacon to CONTENT.analytics.endpoint.

  const endpoint = val(C.analytics?.endpoint);
  const sid = Math.random().toString(36).slice(2, 10); // per page load, not a person
  const umamiTag = () => document.querySelector('script[data-website-id]');
  const waiting = [];

  function send(name, props, canWait = true) {
    if (typeof window.plausible === 'function') { window.plausible(name, { props }); return 'plausible'; }
    if (typeof window.umami?.track === 'function') { window.umami.track(name, props); return 'umami'; }
    if (canWait && umamiTag() && document.readyState !== 'complete') { waiting.push([name, props]); return 'queued for umami'; }
    if (endpoint && navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, JSON.stringify({
        event: name, props, path: location.pathname, referrer: document.referrer || null,
        width: innerWidth, sid, ts: new Date().toISOString(),
      }));
      return 'beacon';
    }
    return 'nowhere (no analytics set up)';
  }

  function track(name, props = {}) {
    const via = send(name, props);
    if (DEBUG) console.info(`[analytics] ${name}`, props, `-> ${via}`);
  }

  addEventListener('load', () => waiting.splice(0).forEach(([n, p]) => send(n, p, false)));

  function trackHeroVideo(v) {
    const sent = new Set();
    const mark = (pct) => [25, 50, 75, 100].forEach((m) => {
      if (pct >= m && !sent.has(m)) { sent.add(m); track('hero_progress', { percent: m }); }
    });
    v.addEventListener('play', () => track('hero_play'), { once: true });
    v.addEventListener('timeupdate', () => { if (v.duration) mark(Math.min(99, (v.currentTime / v.duration) * 100)); });
    v.addEventListener('ended', () => mark(100));
  }

  // Cross-origin players (Loom, Vimeo) don't report play. A click into the
  // iframe moves focus out of this window, so that click counts as the play.
  function trackEmbedClick(iframe) {
    const onBlur = () => setTimeout(() => {
      if (document.activeElement !== iframe) return;
      removeEventListener('blur', onBlur);
      track('walkthrough_play', { player: 'embed' });
    });
    addEventListener('blur', onBlur);
  }

  // One section_view per section, when it fills ~35% of the screen
  // (or, for short ones like the footer, when it is almost fully visible).
  function trackSectionViews() {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const need = Math.min((e.rootBounds?.height ?? innerHeight) * 0.35, e.boundingClientRect.height * 0.9);
      if (!e.isIntersecting || e.intersectionRect.height < need) return;
      io.unobserve(e.target);
      track('section_view', { section: e.target.id });
    }), { threshold: Array.from({ length: 21 }, (_, i) => i / 20) });
    $$('.section:not([hidden]), #footer').forEach((s) => io.observe(s));
  }

  /* ---------- Sections ------------------------------------------------ */

  // Light under the intro: a tiny copy of the frame sits behind the video (the
  // video's lower edge fades into it). Below the frame, the colours of its
  // bottom edge carry on downward, spreading sideways and fading out, as if the
  // light source sat just under the frame. CSS blurs the result. Redrawn every
  // frame while the video plays, so the join never shows.
  const GLOW_W = 96;      // canvas width in pixels; CSS stretches and blurs it
  const GLOW_FADE = 0.13; // how far the light reaches below the frame, as a share of the intro height (higher = longer)
  const GLOW_SPREAD = 0.45; // how much it spreads sideways while it fades

  function introGlow(sec, v) {
    // The canvas is a little wider than the screen (CSS), so the blur has
    // colour to pull in at the edges instead of darkening them.
    const c = h('canvas');
    const ctx = c.getContext('2d', { willReadFrequently: true });
    if (!ctx) return () => {};
    sec.prepend(h('div', { class: 'intro-glow', 'aria-hidden': 'true' }, c));
    let src = null; // the video, or an <img> while a still is what's on screen

    // Opacity at distance d below the frame (in intro heights): starts flat at 1,
    // so the join has no edge, then eases out; k = share of rows left, which
    // tapers the last quarter to exactly 0.
    const fade = (d, k) => { const t = d / GLOW_FADE; return (1 + t) * Math.exp(-t) * Math.min(1, k * 4); };

    // Each row below the frame: the bottom-edge colours, box-blurred sideways
    // with a radius that grows with the distance.
    function spread(W, Hi, rows) {
      const edge = ctx.getImageData(0, Hi - 2, W, 2).data;
      const sum = new Float32Array((W + 1) * 3);
      for (let x = 0; x < W; x++) {
        for (let k = 0; k < 3; k++) sum[(x + 1) * 3 + k] = sum[x * 3 + k] + (edge[x * 4 + k] + edge[(W + x) * 4 + k]) / 2;
      }
      const img = ctx.createImageData(W, rows), px = img.data;
      for (let y = 0; y < rows; y++) {
        const d = (y + 0.5) / Hi, r = Math.round(d * GLOW_SPREAD * W), a = 255 * fade(d, (rows - y) / rows);
        for (let x = 0; x < W; x++) {
          const x0 = Math.max(0, x - r), x1 = Math.min(W, x + r + 1), i = (y * W + x) * 4;
          for (let k = 0; k < 3; k++) px[i + k] = (sum[x1 * 3 + k] - sum[x0 * 3 + k]) / (x1 - x0);
          px[i + 3] = a;
        }
      }
      ctx.putImageData(img, 0, Hi);
    }

    // Fallback if the pixels can't be read (video served from another domain):
    // copy the bottom edge down, row by row, with the same fade.
    function stretch(W, Hi, rows) {
      for (let y = 0; y < rows; y++) {
        ctx.globalAlpha = fade((y + 0.5) / Hi, (rows - y) / rows);
        ctx.drawImage(c, 0, Hi - 2, W, 2, 0, Hi + y, W, 1);
      }
      ctx.globalAlpha = 1;
    }

    function draw() {
      const fw = src?.videoWidth || src?.naturalWidth, fh = src?.videoHeight || src?.naturalHeight;
      const box = sec.getBoundingClientRect(), out = c.getBoundingClientRect();
      if (!fw || !fh || !box.width || !box.height || !out.width || !out.height) return;
      const W = GLOW_W, k = W / out.width; // canvas pixels per CSS pixel
      const Hi = Math.max(2, Math.round(box.height * k)), H = Math.max(Hi + 1, Math.round(out.height * k));
      const m = Math.max(0, Math.round((box.left - out.left) * k)); // side margin, in canvas pixels
      if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
      ctx.clearRect(0, 0, W, H);
      // The part of the frame the video shows (object-fit: cover), with its
      // outer columns stretched into the side margins...
      const a = box.width / box.height;
      let sx = 0, sy = 0, sw = fw, sh = fh;
      if (a < fw / fh) { sw = fh * a; sx = (fw - sw) / 2; } else { sh = fw / a; sy = (fh - sh) / 2; }
      ctx.drawImage(src, sx, sy, sw, sh, m, 0, W - 2 * m, Hi);
      if (m) {
        ctx.drawImage(src, sx, sy, 2, sh, 0, 0, m, Hi);
        ctx.drawImage(src, sx + sw - 2, sy, 2, sh, W - m, 0, m, Hi);
      }
      // ...then the light below it.
      try { spread(W, Hi, H - Hi); } catch { stretch(W, Hi, H - Hi); }
    }
    function follow() {
      draw();
      if (src !== v || v.paused || v.ended) return;
      if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(follow);
      else requestAnimationFrame(follow);
    }
    v.addEventListener('playing', () => { src = v; follow(); });
    v.addEventListener('ended', draw);
    addEventListener('resize', draw, { passive: true });

    // Draw from a still (poster or end frame) until the video takes over.
    // The latest still asked for wins, whichever finishes loading first.
    let wanted = null;
    return (url) => {
      if (!isSet(url)) return;
      const img = (wanted = new Image());
      img.onload = () => { if (src !== v && wanted === img) { src = img; draw(); } };
      img.src = url.trim();
    };
  }

  // Logo animation: plays once on load, muted (browsers only autoplay muted
  // video), then holds on its last frame. If autoplay is blocked, or the
  // visitor asks for reduced motion or data saving, the end still shows instead.
  function renderIntro() {
    const sec = $('#intro');
    if (!sec) return;
    const it = C.intro || {};
    if (!isSet(it.video)) { sec.hidden = true; return; }
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true;
    const first = calm && isSet(it.endStill) ? it.endStill : it.poster;
    const v = video(it.video, first, {
      lazy: false, preload: calm ? 'none' : 'auto', autoplay: !calm,
      disablepictureinpicture: true, disableremoteplayback: true, 'aria-label': val(it.label),
    });
    v.muted = true; // the property, not the attribute, is what lets autoplay start
    sec.prepend(v);
    const glowFrom = introGlow(sec, v);
    glowFrom(first);
    const done = () => sec.classList.add('done');
    if (calm) return done();
    v.addEventListener('ended', done, { once: true });
    v.play().catch(() => { // blocked (e.g. iOS Low Power Mode): show the logo
      if (isSet(it.endStill)) { v.poster = it.endStill.trim(); glowFrom(it.endStill); }
      done();
    });
  }

  function renderHero() {
    const hero = C.hero || {};
    const slot = $('[data-slot="hero-video"]');
    if (isSet(hero.video)) {
      const v = video(hero.video, hero.poster, { lazy: false, controls: true });
      slot.append(frame(v));
      trackHeroVideo(v);
    }
    const chips = [
      isSet(hero.duration) ? h('li', { class: 'chip chip--accent' }, [L.duration, hero.duration].filter(isSet).join(' ')) : null,
      ...list(hero.tools).filter(isSet).map((t) => h('li', { class: 'chip' }, t.trim())),
    ];
    $('[data-slot="hero-chips"]').append(...chips.filter(Boolean));
  }

  function renderChanges(sec) {
    const cards = list(C.changes?.cards).map((c) => {
      const body = prose(c.text);
      if (!isSet(c.heading) || !body) return null;
      const pair = isSet(c.reference) && isSet(c.mine)
        ? h('div', { class: 'pair', 'data-item': true },
          h('figure', { class: 'still' }, still(c.reference, join(L.reference, c.heading)), h('figcaption', {}, val(L.reference))),
          h('figure', { class: 'still still--mine' }, still(c.mine, join(L.mine, c.heading)), h('figcaption', {}, val(L.mine))))
        : null;
      return h('article', { class: 'card', 'data-item': true }, h('div', {}, h('h3', {}, c.heading.trim()), body), pair);
    }).filter(Boolean);
    $('[data-slot="changes"]', sec).append(...cards);
    return cards.length > 0;
  }

  function renderWalkthrough(sec) {
    const w = C.walkthrough || {};
    const url = embedUrl(w.embedUrl);
    let player = null;
    if (url) {
      const iframe = h('iframe', {
        src: url, title: val(w.title) || 'Walkthrough video', loading: 'lazy', allowfullscreen: true,
        allow: 'autoplay; fullscreen; picture-in-picture; encrypted-media',
      });
      player = frame(iframe);
      trackEmbedClick(iframe);
    } else if (isSet(w.video)) {
      const v = video(w.video, w.poster, { controls: true });
      v.addEventListener('play', () => track('walkthrough_play', { player: 'mp4' }), { once: true });
      player = frame(v);
    }
    if (!player) return false;
    $('[data-slot="walkthrough"]', sec).append(player);
    return true;
  }

  function renderWorld(sec) {
    const w = C.world || {};
    const slot = $('[data-slot="world"]', sec);
    if (isSet(w.sheet)) slot.append(h('figure', { class: 'sheet', 'data-item': true }, still(w.sheet, val(w.title))));
    const locs = list(w.locations).filter((l) => isSet(l?.src));
    if (locs.length) {
      slot.append(h('div', { class: 'grid', 'data-group': true, 'data-item': true, 'data-count': locs.length },
        locs.map((l) => h('figure', { 'data-item': true }, still(l.src, val(l.caption)), isSet(l.caption) ? h('figcaption', {}, l.caption.trim()) : null))));
    }
    return slot.children.length > 0;
  }

  function renderBrand(sec) {
    const b = C.brand || {};
    const cards = list(b.cards).filter((c) => isSet(c?.src));
    if (!isSet(b.intro) && !cards.length) return false;
    const slot = $('[data-slot="brand"]', sec);
    const css = getComputedStyle(document.documentElement);

    const swatches = list(b.swatches).map((s) => {
      const value = /^--[\w-]+$/.test(s?.cssVar || '') ? css.getPropertyValue(s.cssVar).trim() : '';
      if (!value) return null;
      const hexes = value.match(/#[0-9a-f]{3,8}\b/gi);
      return h('li', { class: 'swatch', style: `--c: var(${s.cssVar})` },
        h('i'), h('span', {}, val(s.name), h('small', {}, hexes ? hexes.join(' → ') : value)));
    }).filter(Boolean);

    // Typography sample: only once the brand font file has actually loaded.
    let type = null;
    if (isSet(b.fontName)) {
      type = h('div', { class: 'type', hidden: true },
        h('div', { class: 'type-row', 'aria-hidden': 'true' }, list(b.weights).filter(isSet).map((w) =>
          h('div', {}, h('span', { style: `font-weight: ${parseInt(w, 10) || 400}` }, val(L.specimen) || 'Aa'), h('small', {}, w)))),
        h('div', {}, h('p', { class: 'type-name' }, b.fontName.trim()), prose(b.typeSample, 'type-sample')));
      const family = css.getPropertyValue('--font').split(',')[0].trim();
      document.fonts?.load(`400 1em ${family}`)
        .then((faces) => { if (faces.some((f) => f.status === 'loaded')) type.hidden = false; })
        .catch(() => {});
    }

    if (swatches.length || type) slot.append(h('div', { class: 'brand-top' }, swatches.length ? h('ul', { class: 'swatches' }, swatches) : null, type));
    if (cards.length) {
      slot.append(h('div', { class: 'grid', 'data-group': true, 'data-item': true, 'data-count': cards.length },
        cards.map((c) => h('figure', { class: 'ui', 'data-item': true }, still(c.src, val(c.caption)), isSet(c.caption) ? h('figcaption', {}, c.caption.trim()) : null))));
    }
    return true;
  }

  function renderFormats(sec) {
    const f = C.formats || {};
    const items = list(f.items).filter((it) => isSet(it?.src));
    if (!items.length) return false;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true;
    const auto = f.autoplay !== false && !calm;
    $('[data-slot="formats"]', sec).append(...items.map((it) => {
      let [w, ht] = String(it.ratio || '').split(':').map(Number);
      if (!(w > 0 && ht > 0)) [w, ht] = [16, 9];
      const v = video(it.src, it.poster, auto ? { loop: true, 'data-autoplay': true } : { controls: true });
      v.muted = auto; // the property, not the attribute, is what lets autoplay start
      return h('figure', { class: 'format', 'data-item': true, style: `--ar: ${w} / ${ht}; --r: ${(w / ht).toFixed(4)}` },
        h('div', { class: 'frame' }, v),
        h('figcaption', {}, h('strong', {}, val(it.ratio)), val(it.caption)));
    }));
    return true;
  }

  function renderProcess(sec) {
    const p = C.process || {};
    const rows = list(p.tools).filter((r) => isSet(r?.tool) && isSet(r?.use));
    if (!rows.length) return false;
    const slot = $('[data-slot="process"]', sec);
    const steps = list(p.steps).filter(isSet);
    if (steps.length) slot.append(h('ol', { class: 'pipeline' }, steps.map((s) => h('li', {}, s.trim()))));
    slot.append(h('table', { class: 'tools' },
      h('thead', {}, h('tr', {}, h('th', { scope: 'col' }, val(L.tool)), h('th', { scope: 'col' }, val(L.toolUse)))),
      h('tbody', {}, rows.map((r) => h('tr', {}, h('td', {}, r.tool.trim()), h('td', {}, r.use.trim()))))));
    return true;
  }

  function renderCollab(sec) {
    const blocks = list(C.collab?.blocks).map((b) => {
      const body = prose(b?.text);
      return body ? h('div', { class: 'block', 'data-item': true }, isSet(b.heading) ? h('h3', {}, b.heading.trim()) : null, body) : null;
    }).filter(Boolean);
    $('[data-slot="collab"]', sec).append(...blocks);
    return blocks.length > 0;
  }

  const SECTIONS = {
    changes: renderChanges, walkthrough: renderWalkthrough, world: renderWorld, brand: renderBrand,
    formats: renderFormats, process: renderProcess, collab: renderCollab,
  };

  /* ---------- Behaviour ----------------------------------------------- */

  // Give a lazy video its src (and poster) once it nears the screen.
  // preload="metadata" also tells us early if the file is missing.
  function load(v) {
    lazyIO.unobserve(v);
    if (!v.dataset.src) return;
    if (v.dataset.poster) v.poster = v.dataset.poster;
    v.preload = 'metadata';
    v.src = v.dataset.src;
    delete v.dataset.src;
  }
  const lazyIO = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && load(e.target)), { rootMargin: '400px 0px' });

  // Format clips: play muted while on screen, pause when off.
  const playIO = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (!e.isIntersecting) return v.pause();
    load(v);
    v.play().catch(() => { v.controls = true; }); // autoplay blocked (e.g. iOS low power): fall back to controls
  }), { threshold: 0.35 });

  function setupReveal() {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }), { rootMargin: '0px 0px -8% 0px' });
    $$('#hero .wrap > *').forEach((el, i) => el.style.setProperty('--i', i));
    $$('#hero .wrap > *, .section:not([hidden]) .wrap > *').forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }

  function setupLightbox() {
    const box = $('#lightbox');
    if (!box?.showModal) return;
    const img = $('img', box);
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.zoom');
      if (!btn) return;
      const src = $('img', btn);
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      box.showModal();
    });
    box.addEventListener('click', () => box.close());
  }

  function listTodos() {
    const todo = [];
    (function walk(o, path) {
      for (const [k, v] of Object.entries(o)) {
        const p = path ? `${path}.${k}` : k;
        if (typeof v === 'string' && /^\s*TODO\b/i.test(v)) todo.push(p);
        else if (v && typeof v === 'object') walk(v, p);
      }
    })(C, '');
    console.info(`[content] ${todo.length} field(s) still TODO (hidden on the page):`, todo);
  }

  /* ---------- Init ---------------------------------------------------- */
  function init() {
    if (isSet(C.pageTitle)) document.title = C.pageTitle.trim();

    $$('[data-text]').forEach((el) => { const v = get(el.dataset.text); if (isSet(v)) el.textContent = v.trim(); else el.remove(); });
    $$('[data-rich]').forEach((el) => { const v = get(el.dataset.rich); if (isSet(v)) el.append(...rich(v.trim())); else el.remove(); });
    $$('[data-href]').forEach((el) => { const v = get(el.dataset.href); if (isSet(v)) el.href = v.trim(); else el.remove(); });
    $$('[data-aria]').forEach((el) => { const v = get(el.dataset.aria); if (isSet(v)) el.setAttribute('aria-label', v.trim()); });

    renderIntro();
    renderHero();
    for (const [id, render] of Object.entries(SECTIONS)) {
      const sec = document.getElementById(id);
      if (sec) sec.hidden = !render(sec);
    }

    $$('video[data-src]').forEach((v) => lazyIO.observe(v));
    $$('video[data-autoplay]').forEach((v) => playIO.observe(v));
    setupReveal();
    setupLightbox();

    // Plausible and Umami count page views themselves; the beacon fallback does not.
    if (typeof window.plausible !== 'function' && !umamiTag()) track('page_view');
    trackSectionViews();
    if (DEBUG) listTodos();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
