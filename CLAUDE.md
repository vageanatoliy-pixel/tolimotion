# tolimotion.com — portfolio of Toli (Anatolii), motion designer

Static one-pager built with Astro. Hosted on **Cloudflare Workers** (Workers Builds, account vageanatoliy@gmail.com): every push to `main` runs `npm run build` → `npx wrangler deploy` (build settings live in the Cloudflare dashboard, no wrangler config in the repo). Older commits in the queue show as “Skipped” when a newer one lands — that is normal. Builds can sit in “Queued” during a Cloudflare Workers Builds incident (check cloudflarestatus.com); do not push extra commits to “nudge” it.
Source of truth for design: Figma file `jEyOe03C9NdZC0plKxLOu9`, page **"v3 — AI-Integrated"**.
Storyboard for the hero Rive scene: page **"Rive — The Timeline (storyboard)"** in the same file.

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (must pass before any commit)
- `npm run preview` — preview the build

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
3. One accent color (green) in ALL site UI. Exception: illustration artwork (hero scene, future Lottie vignettes) uses the Bauhaus scene palette: scene-red, scene-blue, scene-yellow, scene-pink, indigo + ink, on cream. Deliberately NOT the Google primaries. These colors never leak into buttons, links, chips or body text. Mapping in the hero orrery: planets = red (the character, innermost), yellow, blue (+ indigo moon), pink (+ indigo ring); sun, orbits, stars & comet = ink; sun glow & rim = scene-yellow; un-ignited planets = muted. Clips: simple = blue, light = yellow (label in ink for contrast), deep = indigo; playhead & diamonds = ink.
4. `prefers-reduced-motion` must disable all animation and show final frames. Already wired in global.css — keep it working.
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
- Still waiting for Toli (all render only with `?draft`): testimonials, Upwork record, booking link, agency day rate + capacity, monthly partner price, VO/music licensing and invoicing answers, the power/internet continuity answer.

## Redesign 2026-11 (LIVE since 2026-11-17)
Built 2026-11-17 on Toli's request («локально перероби… щоб максимально приваблювало»), published on his word «Implement цю версію» the same evening. He chose to publish the three DestCert pieces that had no recorded client OK (CAT launch card, review guide, CISSP drafts in Process); `showPendingClientWork` in `src/data/site.ts` hides all of them at once if that changes. Review notes and the full audit: `~/Documents/tolimotion-redesign-review/index.html`.
- **Where copy lives:** `src/data/site.ts` (person, clients, availability, services + prices, process steps, FAQ, facts, quotes) and `src/data/work.ts` (hero timeline clips, work tiles). Edit text there, not in components. Empty fields are not rendered; open any page with `?draft` to see the slots still waiting for content (photo, quotes, Upwork record, booking link, continuity answer) and the "Needs client OK" flags.
- **Home order:** Header (sticky, mobile menu, scroll playhead) → Hero (headline + The Timeline of real clips) → WorkGrid (dark band, loops, private-work row) → Process (5 steps + CISSP rough → final) → Services (prices) → AiNote → About (+ quotes) → Faq → Contact (brief form → mailto) → Footer (local time, motion switch). `/work/` lists the same grid; `404.astro` is branded.
- **Loops instead of GIFs:** `src/components/LoopVideo.astro` + `/public/loops/<name>.mp4|.jpg`. H.264, no audio, 3–9 s, 40–650 KB; still first, video only near the screen, paused off-screen, never under reduced motion / motion switch off / Save-Data. Encoder: `loop.sh SRC IN DUR NAME [WIDTH] [CROP] [XFADE]` (copy in the review folder). Unused spare loops: review folder `spare-loops/`.
- **Hero = edit suite:** `Hero.astro`. Program monitor plays the clip under the playhead (true aspect); the V1 track below is a filmstrip of stills; hover scrubs the monitor frame by frame (hero loops are encoded with 12-frame GOPs for fast seeks); phones scroll clips under a fixed centre playhead. A1 lane = real loudness of the showreel (`/loops/reel-wave.json`). Sizes are bound to viewport height (svh) so the monitor is in the first screen on 1366×768.
- **Section labels** are `Marker.astro` (timecode + sentence-case label) — not ALL-CAPS eyebrows.
- **Motion:** one kinetic moment (hero H1). No per-section reveals. Header playhead is CSS scroll-driven. Motion switch (footer + timeline Pause) sets `html[data-motion=off]`.
- **Rule changes (owner decision 2026-11-17):** rule 2 rewritten (silent loops allowed). Rule 3 unchanged (green is the only UI accent). Unused legacy components kept for reference, not rendered: RecentWork, Work, Toolbox, Pipeline, TimelineScene.
- **Video hosting (open issue, affects iPhones):** Workers static assets ignore Range requests (verified 2026-11-17: `Range: bytes=0-1` on /showreel.mp4 → 200 + full 13.9 MB), and iPhone Safari needs ranges for video. Plan: put MP4s in an R2 bucket on `media.tolimotion.com`, then set `mediaBase` in `src/data/site.ts` — loops, quick-view films and the reel all go through `media()`. Case pages' VideoPiece sources still use site paths (switch them too).
- **Live-site issues found 2026-11-17 (owner's Cloudflare/Porkbun settings):** www.tolimotion.com → 302 to a dead Porkbun l.ink page; http:// is served without redirect to https.
