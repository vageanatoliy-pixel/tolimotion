# tolimotion.com — portfolio of Toli (Anatolii), motion designer

Static one-pager built with Astro. Hosted on **Cloudflare Workers** (Workers Builds, account vageanatoliy@gmail.com): every push to `main` runs `npm run build` → `npx wrangler deploy` (the two commands live in the Cloudflare dashboard). Since 2026-11-17 `wrangler.jsonc` in the repo defines the Worker: `dist/` served as static assets (404 page, trailing-slash redirects, `public/_headers`) plus `worker/index.js`, which runs only for `*.mp4` and answers byte-range requests. Before that the repo had no config, and on every build wrangler's autoconfig turned the site into the Astro Cloudflare adapter (its Worker answered only paths with no static file; Workers Logs on); the open Cloudflare bot PR "Add Cloudflare Workers configuration" (branch `cloudflare/workers-autoconfig`) would bring that back: close it, never merge it. Keep `name` = `tolimotion` (it must match the Worker in the dashboard) and never add `routes` to the config (they would replace the dashboard's custom domain). Rollback if a deploy breaks something: dashboard → Workers → tolimotion → Deployments → Rollback. Older commits in the queue show as “Skipped” when a newer one lands — that is normal. Builds can sit in “Queued” during a Cloudflare Workers Builds incident (check cloudflarestatus.com); do not push extra commits to “nudge” it.
Design since 2026-11-21: **"Pearl"** — see the section below. The older Figma file `jEyOe03C9NdZC0plKxLOu9` ("v3 — AI-Integrated") describes the previous paper/green design and is history.

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (must pass before any commit)
- `npx wrangler deploy --dry-run` — must also pass when `worker/` or `wrangler.jsonc` change (needs `dist/` from the build; runs the size script and bundles the Worker; no login, nothing uploaded)
- `npm run preview` — preview the build

## Pearl (LIVE design since 2026-11-21)
Toli picked the light "Pearl" look from a four-variant sketch (`~/Documents/portfolio-case-site/template/?v=1`) and asked for it on tolimotion.com («внедряй під толімотіон»); on 2026-11-21 he chose to restyle the case pages too, on the same URLs. White page, pastel aurora, black Outfit type, big headings, pill buttons, white cards. The whole portfolio is one long home page; the CISSP and Fitrise case pages keep the extra material (storyboards, GIF/MP4 downloads); the Advertima page stays its own branded static page.
- **Files:** layout `src/layouts/Pearl.astro` (head, aurora, header, footer, live region, script) · styles `src/styles/pearl.css` (the only stylesheet; tokens in its `:root`) · behaviour `src/scripts/pearl.js` · components `src/components/pearl/` (Top, Foot, Mark, Loop, Film, Stage, Facts, Features, WorkCard, Contact, CaseEnd) · `src/components/Storyboard.astro` (shared, recoloured for Pearl).
- **Pages:** `/` (hero with reel → About → Work: CISSP, Advertima, four cards, Fitrise, private work → Services and prices → Process + Inside one project → For agencies → AI → FAQ → Contact) · `/work/` (all work as cards + brief) · `/work/cissp-masterclass-ads/` (the UI-animation link Toli sends in proposals — keep the URL) · `/work/fitrise-stadium-intro/` · `/work/advertima-audience-ai/` (static, own brand, untouched) · `404`.
- **Copy:** `src/data/site.ts` (person, clients, services + prices + loop alts, facts, agencies, steps, FAQ), `src/data/work.ts` (work items), `src/data/cases.ts` (CISSP + Fitrise case content, shared by home and case pages), `src/data/home.ts` (home-only lines). Edit text there, never in components. Rule from the rebuild: no invented copy — new text only where a label is built from existing data.
- **Fonts:** Outfit variable 400–600, self-hosted in `public/fonts/` (from Google Fonts, OFL; `README.txt`), preloaded. Newsreader/Inter packages are only used by legacy files.
- **Media:** loops `<Loop>` (still first; the MP4 loads after 250 ms in view, pauses off-screen, is released three screens away; never autoplays under reduced motion / motion switch / Save-Data). Films `<Film>` (lazy still `<img>`, `preload="none"`, native controls in the markup for no-JS, overlay gone for good once started so a paused film can be scrubbed; one film at a time; `data-play="<film id>"` buttons scroll to a film and start it). Reel poster `public/showreel.jpg` = frame 0:12.6 of the reel (the DestCert roadmap illustration), chosen to sit on the light page.
- **Reveal:** blocks with `.reveal` rise in once; they are hidden only after the script runs (`html[data-reveal]`), never without JS, under reduced motion, with the motion switch off, in print or when the page opens on an anchor.
- **Social card:** `public/og.jpg` (1200×630) and the icons (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, black tile + white mark) were re-rendered for Pearl on 2026-11-21.
- **Legacy, not rendered (kept for reference / rollback):** `src/layouts/Base.astro`, `src/styles/global.css`, and the components Header, Footer, Hero, WorkGrid, Process, Services, AiNote, Agencies, About, Faq, Contact, MobileCta, ReelDialog, Marker, Motion, LoopVideo, VideoPiece, CaseCta, RecentWork, Work, Toolbox, Pipeline, TimelineScene, Spark. Their rules below (paper/green tokens, motion grammar, edit-suite hero) describe the previous design.

## Pearl tokens (never invent new colours)
| token | value | use |
|---|---|---|
| --bg | #f8f8fb | page |
| --ink | #0e0e14 | text, dark buttons, the logo tile |
| --ink-70 | ink at 74% | body text |
| --muted | #565664 | secondary text (6.8:1 on the page, ≥ 4.5:1 on the pastel washes — measured; do not go lighter) |
| --line | ink at 12% | hairlines |
| --surface | #fff | cards, white pills |
| --chip | #efeff5 | small chips, storyboard tints |
| --peach / --pink / --lav / --sky | #ffc7a6 / #f6a9e2 / #b9a7ff / #8fd0ff | the aurora and the gradient capsule (`--accent`) only — never text or buttons |
| --ok | #14a06c | status dots only |
| --bad | #c2263a | form errors only |
Type: Outfit 600 for headings (`.h-hero`, `.h-giant`, `.h-xl`, `.h-l`), 400–500 for text; sizes are the `--fs-*` tokens.

## Previous design (paper/green, 2026-11-17 → 2026-11-20) — history
## Design tokens (never invent new colors)
| token | value | use |
|---|---|---|
| --paper | #F4F1E8 | page background |
| --band  | #EAE4D6 | rive band, tints |
| --card  | #FBF9F2 | cards, nodes, pills |
| --ink   | #262319 | text, tiles |
| --soft  | #413C30 | serif body paragraphs |
| --muted | #6F6857 | secondary text |
| --line  | #DCD5C3 | hairlines, borders |
| --green | #2E5E4E | the only accent |
| --clay  | #C96F4A | reserved, currently unused |
| --indigo | #44518F | illustration palette (hero scene: "deep" clip) |
| --scene-red / blue / yellow / pink | #D9493A / #4E97CF / #EDBE4B / #E38DA6 | illustration palette ONLY |
| --cream | #F6F3EA | text on green |

Typography: **Newsreader Variable** (display + serif paragraphs, weight 500 for headings, italic for accents), **Inter Variable** (UI, labels, buttons). Both self-hosted via @fontsource-variable.

## Hard rules
1. Text stays real text — never bake copy into images, video or Lottie.
2. **Silent preview loops are allowed** (owner decision 2026-11-17, redesign launch): short muted MP4 loops through `src/components/LoopVideo.astro`, still first, played only near the screen, never under reduced motion / motion switch off / Save-Data. Players **with sound** stay few: the showreel and the case films (VideoPiece on case pages, the shared film dialog `ReelDialog.astro` on home). The rest of this rule is history: ~~Exactly **two** videos on the whole site: the showreel in Work and the piece(s) in “My recent work” (owner decision 2026-10-26; was one). Everything else is Rive, Lottie or code. Both use `src/components/VideoPiece.astro` (poster + `preload="none"`, native controls after click). Exception (owner decision 2026-11-01): the Advertima case page `/work/advertima-audience-ai/` is a self-contained static page (own HTML/CSS/JS in `public/work/advertima-audience-ai/`, Advertima's brand, not the site tokens) and carries its own two videos — the film it was made to show and a 3.5 s logo intro. Exception (owner decision 2026-11-06): the case page `/work/cissp-masterclass-ads/` carries the two 16:9 ad films (VideoPiece, files in `public/work/cissp/`); their square and vertical cuts are GIFs. Since 2026-11-06 “My recent work” shows three square GIF tiles instead of a video (owner request), so the showreel is the only video on the home page.~~ Since 2026-11-17 the CISSP 1:1 and 9:16 cuts play as loops (GIFs remain as download links).
3. *(Previous design.)* One accent color (green) in ALL site UI. Exception: illustration artwork (hero scene, future Lottie vignettes) uses the Bauhaus scene palette: scene-red, scene-blue, scene-yellow, scene-pink, indigo + ink, on cream. Deliberately NOT the Google primaries. These colors never leak into buttons, links, chips or body text. Mapping in the hero orrery: planets = red (the character, innermost), yellow, blue (+ indigo moon), pink (+ indigo ring); sun, orbits, stars & comet = ink; sun glow & rim = scene-yellow; un-ignited planets = muted. Clips: simple = blue, light = yellow (label in ink for contrast), deep = indigo; playhead & diamonds = ink.
4. `prefers-reduced-motion` must disable all animation and show final frames. Wired in `pearl.css` (and in the legacy global.css) — keep it working.
5. No new npm dependencies without a reason. Approved for later phases: `gsap`, `@rive-app/canvas`, `@lottiefiles/dotlottie-web`.
6. Lighthouse ≥ 90 on every category. Budget: each .lottie < 150 KB, .riv < 200 KB.
7. English copy only. Tone: plain, confident, no marketing fluff.

## Motion grammar (Phase 3 — superseded 2026-11-17, see the Redesign section: one kinetic H1, no per-section reveals)
- One reveal move for everything: 24px rise + fade-in.
- Durations: 200 / 400 / 700 ms (tokens already in global.css). Easing: --ease-out. Stagger step: 60 ms.
- Scroll triggers via GSAP ScrollTrigger, play once.
- Hero headline: kinetic type on load (GSAP SplitText), word stagger, the italic settles last.
- Toolbox "8": odometer count-up 1→8 on scroll into view.
- Adobe tiles & pills: staggered pop-in; tiles tilt slightly on hover.
- Pipeline nodes: light up left-to-right on scroll, arrows draw in sequence.

## Phase 4 — animation slots (placeholders already in markup)
- **2026-10-23: the hero Timeline card is UNMOUNTED** — replaced under the hero by `src/components/RecentWork.astro` ("My recent work"). **2026-11-06:** it is now a row of three square GIF tiles (CISSP ad → its case, Advertima → its case, Liveshops logo splash), still JPG first, GIF swapped in after the first interaction when on screen; entries live in the `pieces` array at the top of the component, files in `/public/recent/` (or next to the case page). The old `/public/recent/ad2.mp4` + `.jpg` are no longer used. `TimelineScene.astro` stays in the repo, not rendered.
- Hero scene "The Timeline" (unmounted, see above) is DONE in code: `src/components/TimelineScene.astro` (Canvas 2D stage + SVG timeline + vanilla JS, zero deps). The stage is an orrery drawn EDGE-ON: all orbits collapse into one dashed line. Over "simple" it is a grey line drawing; over "light" the planets ignite inner-to-outer in the scene palette and the sun glows; entering "deep" the system snaps into a tilted 3D view (underdamped spring on orbit squash, sharp open / stiff close) revealing full orbits, depth-sorted passes behind the sun, faint stars, a moon, a ring and a rare comet. Behavior contract: pointer X scrubs the playhead (lerp); touch scrubs only after 8px horizontal intent (vertical stays page scroll); idle loop 9s sweep + 2.5s hold on the 3D view + 0.6s rewind; cooldown 1.5–2s before idle resumes from the current position; IntersectionObserver pauses offscreen; prefers-reduced-motion shows the static deep frame. Every visual parameter is a pure function of playhead position plus a free-running clock — scrubbing is fully bidirectional. A Rive rebuild may replace the innards later — keep the same behavior contract. Color key lives on the Figma page "Rive — The Timeline (storyboard)".
- **2026-10-26: showreel is LIVE** — `.poster` in Work replaced by `VideoPiece` with `/public/showreel.mp4` (26 s, 1080p H.264, ~14 MB) and `/public/showreel.jpg`. Re-export: 4K master → `ffmpeg -vf scale=1920:1080 -c:v libx264 -crf 22 -maxrate 7M -movflags +faststart`.
- Each `.row` in the project index — gets a Lottie vignette: play on scroll-into-view, replay on hover. dotLottie format.
- Contact spark — reuse the same Rive asset in idle state (later).

## Open items (do not silently "fix")
- Portrait photo: About shows a green tile with the mark until `person.photo` is set in `src/data/site.ts`.
- Social links: hidden until real URLs go into `person.socials` / `person.upworkUrl` (no more `href="#"`).
- Brand name: the redesign (published by the owner 2026-11-17) uses "Toli Herasymenko" everywhere and "I'm Toli — Anatolii Herasymenko" once in About.
- Still waiting for Toli (their slots exist only in `npm run dev` or a `PUBLIC_DRAFT=1 npm run build`, shown with `?draft`; production HTML has none of them): testimonials, Upwork record, booking link, agency day rate + capacity, monthly partner price, VO/music licensing and invoicing answers, the power/internet continuity answer.

## Redesign 2026-11 (LIVE since 2026-11-17)
Built 2026-11-17 on Toli's request («локально перероби… щоб максимально приваблювало»), published on his word «Implement цю версію» the same evening. He chose to publish the three DestCert pieces that had no recorded client OK (CAT launch card, review guide, CISSP drafts in Process); `showPendingClientWork` in `src/data/site.ts` hides all of them at once if that changes. Review notes and the full audit: `~/Documents/tolimotion-redesign-review/index.html`.
- **Where copy lives:** `src/data/site.ts` (person, clients, availability, services + prices, process steps, FAQ, facts, quotes) and `src/data/work.ts` (hero timeline clips, work tiles). Edit text there, not in components. Empty fields are not rendered. The slots still waiting for content (photo, quotes, Upwork record, booking link, continuity answer, agency terms, monthly price) and the "Needs client OK" flags are compiled in only when `DRAFT` in `src/data/site.ts` is true (`npm run dev`, or `PUBLIC_DRAFT=1 npm run build`); open the page with `?draft` to see them. The production build ships none of that text.
- **Home order:** Header (sticky, mobile menu, scroll playhead) → Hero (headline + The Timeline of real clips) → WorkGrid (dark band, loops, private-work row) → Process (5 steps + CISSP rough → final) → Services (prices) → AiNote → About (+ quotes) → Faq → Contact (brief form → mailto) → Footer (local time, motion switch). `/work/` lists the same grid; `404.astro` is branded.
- **Loops instead of GIFs:** `src/components/LoopVideo.astro` + `/public/loops/<name>.mp4|.jpg`. H.264, no audio, 3–9 s, 40–650 KB; still first, video only near the screen, paused off-screen, never under reduced motion / motion switch off / Save-Data. Encoder: `loop.sh SRC IN DUR NAME [WIDTH] [CROP] [XFADE]` (copy in the review folder). Unused spare loops: review folder `spare-loops/`.
- **Hero = edit suite:** `Hero.astro`. Program monitor plays the clip under the playhead (true aspect); the V1 track below is a filmstrip of stills; hover scrubs the monitor frame by frame (hero loops are encoded with 12-frame GOPs for fast seeks); phones scroll clips under a fixed centre playhead. A1 lane = real loudness of the showreel (`/loops/reel-wave.json`). Sizes are bound to viewport height (svh) so the monitor is in the first screen on 1366×768.
- **Section labels** are `Marker.astro` (timecode + sentence-case label) — not ALL-CAPS eyebrows.
- **Motion:** one kinetic moment (hero H1). No per-section reveals. Header playhead is CSS scroll-driven. Motion switch (footer + timeline Pause) sets `html[data-motion=off]`.
- **Rule changes (owner decision 2026-11-17):** rule 2 rewritten (silent loops allowed). Rule 3 unchanged (green is the only UI accent). Unused legacy components kept for reference, not rendered: RecentWork, Work, Toolbox, Pipeline, TimelineScene.
- **Video byte ranges (fixed 2026-11-17):** Workers static assets ignore `Range` (they answer 200 + the whole file), and Apple's media stack refuses such video: every MP4 failed in AVFoundation with -11850 "server incorrectly configured", so loops, the reel and case films did not play on iPhone, iPad or Safari (the reel since October). `worker/index.js` now answers single ranges with 206 for `*.mp4` (`assets.run_worker_first` in `wrangler.jsonc`); everything else never touches the Worker. Check after any hosting change: `curl -sD - -o /dev/null -H 'Range: bytes=0-1' https://tolimotion.com/showreel.mp4` must say `206` and `content-range: bytes 0-1/…`. Sizes: responses from the ASSETS binding carry no Content-Length, so `worker/video-sizes.mjs` writes `worker/video-sizes.json` from `dist/` (wrangler runs it before every deploy, when `wrangler dev` starts and when `dist/` changes, see `build`; the JSON is not committed). Skipping to a far offset uses 1 MiB BYOB reads (a default reader gets 4 KiB per read, which would blow the free plan's 10 ms CPU on seeks in the 20 MB films). Only `.mp4` and `.MP4` are routed to the Worker (exact case; `.Mp4` is not): another video format needs a `run_worker_first` rule and a matching pattern in the size script. Video requests now count as Worker requests (free plan: 100k a day per account, reset 00:00 UTC; past that Cloudflare answers them with a 429 page while the rest of the site keeps working). 404s for missing files under `/loops/*` and `/_astro/*` inherit the `_headers` caching (7 days / 1 year; the Worker resets it for missing .mp4 only), so never reference a loop file that is not committed. Local check: `npm run build && npx wrangler dev`, then the Range curl above against http://localhost:8787. If traffic ever gets near that, move the MP4s to R2 on `media.tolimotion.com` and set `mediaBase` in `src/data/site.ts` (loops, quick-view films and the reel go through `media()`; case-page VideoPiece and the Advertima page use site paths).
- **Live-site issues found 2026-11-17 (owner's Cloudflare/Porkbun settings):** www.tolimotion.com → 302 to a dead Porkbun l.ink page; http:// is served without redirect to https.
