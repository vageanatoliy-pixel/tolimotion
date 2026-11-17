// Writes worker/video-sizes.json — { "/path/file.mp4": bytes } for every MP4 in dist/.
// wrangler runs this before every `wrangler deploy` / `wrangler dev` (wrangler.jsonc → build.command),
// so the sizes always describe the files being uploaded. The Worker needs them because responses from
// the ASSETS binding carry no Content-Length.
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
if (!existsSync(join(dist, 'index.html'))) {
  console.error('worker/video-sizes.mjs: dist/ is missing. Run `npm run build` before `wrangler deploy` or `wrangler dev`.');
  process.exit(1);
}
const sizes = {};
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.mp4$/i.test(e.name)) sizes['/' + relative(dist, p).split(sep).join('/')] = statSync(p).size;
  }
};
walk(dist);
writeFileSync(join(root, 'worker', 'video-sizes.json'), JSON.stringify(sizes, null, 1) + '\n');
console.log(`worker/video-sizes.json: ${Object.keys(sizes).length} MP4 files`);
