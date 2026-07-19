# tolimotion.com — portfolio of Toli (Anatolii), motion designer

Static one-pager built with Astro. Deployed on Vercel, auto-deploy on push to `main`.
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
| --clay  | #C96F4A | reserved (video chip in spec) — currently unused |
| --cream | #F6F3EA | text on green |

Typography: **Newsreader Variable** (display + serif paragraphs, weight 500 for headings, italic for accents), **Inter Variable** (UI, labels, buttons). Both self-hosted via @fontsource-variable.

## Hard rules
1. Text stays real text — never bake copy into images, video or Lottie.
2. Exactly **one** video on the whole site (the showreel). Everything else is Rive, Lottie or code.
3. One accent color (green). The 8-point spark is the only brand mark.
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
- `#rive-band` — replaced by the Rive canvas. Scene "The Timeline": inputs `scrub` (0–100, from pointer X with lerp ~0.1), `pointer_in` (bool), `tap_burst` (trigger). Idle autoplay loop on touch. Spec lives in the Figma storyboard page.
- `.poster` in Work — becomes the real showreel player: `<video>` with poster, custom play, `preload="none"`. File goes to `/public/showreel.mp4` (H.264, ~15–25 MB max).
- Each `.row` in the project index — gets a Lottie vignette: play on scroll-into-view, replay on hover. dotLottie format.
- Contact spark — reuse the same Rive asset in idle state (later).

## Open items (do not silently "fix")
- Portrait photo: `.photo` placeholder in About.
- Social links in Contact are `href="#"` — real URLs pending.
- Brand name in body copy: logo says "Toli", lead/footer say "Anatolii" — owner decides, don't change unilaterally.
