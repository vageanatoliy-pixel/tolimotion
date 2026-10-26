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
2. Exactly **two** videos on the whole site: the showreel in Work and the piece(s) in “My recent work” (owner decision 2026-10-26; was one). Everything else is Rive, Lottie or code. Both use `src/components/VideoPiece.astro` (poster + `preload="none"`, native controls after click).
3. One accent color (green) in ALL site UI. Exception: illustration artwork (hero scene, future Lottie vignettes) uses the Bauhaus scene palette: scene-red, scene-blue, scene-yellow, scene-pink, indigo + ink, on cream. Deliberately NOT the Google primaries. These colors never leak into buttons, links, chips or body text. Mapping in the hero orrery: planets = red (the character, innermost), yellow, blue (+ indigo moon), pink (+ indigo ring); sun, orbits, stars & comet = ink; sun glow & rim = scene-yellow; un-ignited planets = muted. Clips: simple = blue, light = yellow (label in ink for contrast), deep = indigo; playhead & diamonds = ink.
4. `prefers-reduced-motion` must disable all animation and show final frames. Already wired in global.css — keep it working.
5. No new npm dependencies without a reason. Approved for later phases: `gsap`, `@rive-app/canvas`, `@lottiefiles/dotlottie-web`.
6. Lighthouse ≥ 90 on every category. Budget: each .lottie < 150 KB, .riv < 200 KB.
7. English copy only. Tone: plain, confident, no marketing fluff.

## Motion grammar (Phase 3 — not built yet)
- One reveal move for everything: 24px rise + fade-in.
- Durations: 200 / 400 / 700 ms (tokens already in global.css). Easing: --ease-out. Stagger step: 60 ms.
- Scroll triggers via GSAP ScrollTrigger, play once.
- Hero headline: kinetic type on load (GSAP SplitText), word stagger, the italic settles last.
- Toolbox "8": odometer count-up 1→8 on scroll into view.
- Adobe tiles & pills: staggered pop-in; tiles tilt slightly on hover.
- Pipeline nodes: light up left-to-right on scroll, arrows draw in sequence.

## Phase 4 — animation slots (placeholders already in markup)
- **2026-10-23: the hero Timeline card is UNMOUNTED** — replaced under the hero by `src/components/RecentWork.astro` ("My recent work": `<video>` players, poster + `preload="none"`, custom play, native controls after click). Files live in `/public/recent/`, entries are listed in the `pieces` array at the top of the component (one entry = full-width player, several = grid; `aspect: '9 / 16'` for vertical ads). `TimelineScene.astro` stays in the repo, not rendered.
- Hero scene "The Timeline" (unmounted, see above) is DONE in code: `src/components/TimelineScene.astro` (Canvas 2D stage + SVG timeline + vanilla JS, zero deps). The stage is an orrery drawn EDGE-ON: all orbits collapse into one dashed line. Over "simple" it is a grey line drawing; over "light" the planets ignite inner-to-outer in the scene palette and the sun glows; entering "deep" the system snaps into a tilted 3D view (underdamped spring on orbit squash, sharp open / stiff close) revealing full orbits, depth-sorted passes behind the sun, faint stars, a moon, a ring and a rare comet. Behavior contract: pointer X scrubs the playhead (lerp); touch scrubs only after 8px horizontal intent (vertical stays page scroll); idle loop 9s sweep + 2.5s hold on the 3D view + 0.6s rewind; cooldown 1.5–2s before idle resumes from the current position; IntersectionObserver pauses offscreen; prefers-reduced-motion shows the static deep frame. Every visual parameter is a pure function of playhead position plus a free-running clock — scrubbing is fully bidirectional. A Rive rebuild may replace the innards later — keep the same behavior contract. Color key lives on the Figma page "Rive — The Timeline (storyboard)".
- **2026-10-26: showreel is LIVE** — `.poster` in Work replaced by `VideoPiece` with `/public/showreel.mp4` (26 s, 1080p H.264, ~14 MB) and `/public/showreel.jpg`. Re-export: 4K master → `ffmpeg -vf scale=1920:1080 -c:v libx264 -crf 22 -maxrate 7M -movflags +faststart`.
- Each `.row` in the project index — gets a Lottie vignette: play on scroll-into-view, replay on hover. dotLottie format.
- Contact spark — reuse the same Rive asset in idle state (later).

## Open items (do not silently "fix")
- Portrait photo: `.photo` placeholder in About.
- Social links in Contact are `href="#"` — real URLs pending.
- Brand name in body copy: logo says "Toli", lead/footer say "Anatolii" — owner decides, don't change unilaterally.
