/* Case-study content, shared by the home page and the case pages (/work/cissp-masterclass-ads/,
   /work/fitrise-stadium-intro/). Moved here from the case pages' frontmatter on 2026-11-21 so the text
   lives in one place. Edit copy here, not in the pages. Files live in /public/work/cissp/ and /public/work/fitrise/. */
import { ad1, ad2, type Board } from './cissp-storyboard';

/* ======================= CISSP MasterClass ads (Destination Certification) ======================= */
type Fmt = { ratio: string; use: string; gif: string; still: string; size: string; file: string; w: number; h: number; alt: string; loop: string };
type Ad = {
  id: string; n: string; name: string; len: string; text: string;
  film: { src: string; poster: string; note: string };
  formats: Fmt[]; boards: Board[];
};
export const cisspAds: Ad[] = [
  {
    id: 'ad1', n: '01', name: 'A mile wide', len: '37 s',
    text: 'CISSP covers a huge syllabus, so people over-study what they already know and miss the rest. The ad drops from that line straight into the course: a lesson ends, a quick check follows, and the answers build a review guide that pulls the weak domains to the top.',
    film: { src: '/work/cissp/ad1-16x9.mp4', poster: '/work/cissp/ad1-16x9.jpg', note: '37 s · sound on' },
    formats: [
      { ratio: '1:1', use: 'Feed', loop: 'case-ad1-1x1', gif: '/work/cissp/ad1-1x1.gif', still: '/work/cissp/ad1-1x1.jpg', size: '12.3 MB', file: 'CISSP-MasterClass_AD1_1x1', w: 400, h: 400,
        alt: 'Ad 1 in square format: topic pills float over the line “An inch deep”, then the course player, quick check questions, the review guide and the pass rate.' },
      { ratio: '9:16', use: 'Stories · Reels', loop: 'case-ad1-9x16', gif: '/work/cissp/ad1-9x16.gif', still: '/work/cissp/ad1-9x16.jpg', size: '8.3 MB', file: 'CISSP-MasterClass_AD1_9x16', w: 270, h: 480,
        alt: 'Ad 1 in vertical format, re-framed for a phone: the same scenes stacked for a tall screen.' },
    ],
    boards: ad1,
  },
  {
    id: 'ad2', n: '02', name: 'The exam adapts', len: '21 s',
    text: 'The real CISSP exam adapts to every answer. This ad puts the viewer inside the CAT exam simulator — start the exam, answer against the clock, read the score report — so “it already feels familiar” is shown, not claimed.',
    film: { src: '/work/cissp/ad2-16x9.mp4', poster: '/work/cissp/ad2-16x9.jpg', note: '21 s · sound on' },
    formats: [
      { ratio: '1:1', use: 'Feed', loop: 'case-ad2-1x1', gif: '/work/cissp/ad2-1x1.gif', still: '/work/cissp/ad2-1x1.jpg', size: '9.6 MB', file: 'CISSP-MasterClass_AD2_1x1', w: 400, h: 400,
        alt: 'Ad 2 in square format: “Works just like the real exam” above a timed exam question with an answer being picked.' },
      { ratio: '9:16', use: 'Stories · Reels', loop: 'case-ad2-9x16', gif: '/work/cissp/ad2-9x16.gif', still: '/work/cissp/ad2-9x16.jpg', size: '7.9 MB', file: 'CISSP-MasterClass_AD2_9x16', w: 270, h: 480,
        alt: 'Ad 2 in vertical format: the simulator dashboard, an exam question on the clock, the score report and the pass rate, stacked for a phone.' },
    ],
    boards: ad2,
  },
];
export const cisspFacts: [string, string][] = [
  ['Client', 'Destination Certification'],
  ['Product', 'CISSP MasterClass'],
  ['Formats', '16:9 · 1:1 · 9:16'],
  ['Length', '37 s + 21 s'],
  ['Role', 'Storyboard, design, motion, sound'],
  ['Year', '2026'],
];

export const cissp = {
  label: 'Case · Product ads',
  title: 'Two ads that show the course working.',
  titleEm: 'working',
  seoTitle: 'CISSP MasterClass ads — Toli Herasymenko',
  description: 'Two performance ads for Destination Certification’s CISSP MasterClass — storyboard, design, motion and sound — each cut for 16:9, 1:1 and 9:16.',
  lead: 'Ads for the CISSP MasterClass by Destination Certification. Instead of listing features, each one walks through the product the way a student meets it, then lands on the pass rate. Both are cut three ways: 16:9 for YouTube and the web, 1:1 for the feed, 9:16 for Stories and Reels.',
  heroLoop: { name: 'cissp-ad1-sort', alt: 'Ad 1: the personal review guide re-sorts itself, pulling the weakest exam domains to the top.' },
  reframed: 'Re-framed, not cropped: for each shape the camera, the captions and the UI are laid out again in After Effects, so nothing important sits under a crop line.',
  board: { title: 'Every beat, in order.', lead: 'Grey blocks for what is on screen, dashed marks for where the camera and the UI move, and the line each beat lands on.' },
  notes: [
    ['Product first', 'Every screen is the real course UI rebuilt as clean layers, so each claim in the voice-over has a click on screen to back it.'],
    ['One camera', 'Each ad is a single 3D camera moving over flat boards. Pushes land on the button a student would press next, so the cuts read as one session.'],
    ['One mix', 'Voice-over, music and effects are mixed once on the master and carried into all three formats, frame for frame.'],
  ] as [string, string][],
  ask: 'Need product ads that show your app working — in every format?',
  subject: 'Project like the CISSP ads',
};

/* ======================= Fitrise: stadium LED intro + reels ======================= */
type Cut = {
  id: string; n: string; name: string; text: string; gif: string; still: string; mp4: string; loop: string;
  gifSize: string; mp4Size: string; file: string; note: string; alt: string;
};
export const fitCuts: Cut[] = [
  {
    id: 'clean', n: '01', name: 'Clean',
    text: 'The calm version. Each screen lands, holds long enough to read from the stands, and hands over to the next through the same yellow bar.',
    loop: 'fitrise-led-clean', gif: '/work/fitrise/clean-r1.gif', still: '/work/fitrise/clean.png', mp4: '/work/fitrise/clean-r1.mp4',
    gifSize: '7.7 MB', mp4Size: '6.0 MB', file: 'Fitrise_LED_Intro_Clean_1440x270_r1', note: '1 px = 1 LED',
    alt: 'Fitrise LED intro, clean cut: yellow text on navy — Excuses scoren niet, Actie wel, Kom in beweging — ending on the Fitrise logo with Personal training, Leefstijlcoaching, Bedrijfsfitness.',
  },
  {
    id: 'flashy', n: '02', name: 'Flashy',
    text: 'Same story, louder. The first line is typed with the bar as a blinking cursor, every hit flashes, the letters jump in a stadium wave and the background pulses with light.',
    loop: 'fitrise-led-flashy', gif: '/work/fitrise/flashy-r1.gif', still: '/work/fitrise/flashy.png', mp4: '/work/fitrise/flashy-r1.mp4',
    gifSize: '11.2 MB', mp4Size: '10.0 MB', file: 'Fitrise_LED_Intro_Flashy_1440x270_r1', note: 'Flashes kept under 3 per second',
    alt: 'Fitrise LED intro, flashy cut: the first line is typed letter by letter behind a blinking yellow cursor, words flash on every hit, ending on the Fitrise logo with its three services.',
  },
];
type Reel = { id: string; n: string; name: string; badge?: string; text: string; gif: string; still: string; gifSize: string; file: string; alt: string; loop: string };
export const fitReels: Reel[] = [
  {
    id: 's1', n: '01', name: 'Brand serif', badge: 'Closest to brand',
    text: 'IBM Plex Serif — the brand font for quotes — with the key words in yellow italic. Each word slides in and the line re-centres around it.',
    loop: 'fitrise-cap-s1', gif: '/work/fitrise/reels/s1-brand-serif.gif', still: '/work/fitrise/reels/s1-brand-serif.jpg', gifSize: '5.0 MB', file: 'Fitrise_Reel_Captions_01_Brand_Serif',
    alt: 'Caption style 01 on a talking-head reel: white serif words appear one by one under the speaker, the key words “heel snel” in yellow italic.',
  },
  {
    id: 's2', n: '02', name: 'Site italic',
    text: 'Inter Italic, like the headings on fitrise.nl. Words rise from the baseline; key words turn yellow and get the underline from the site menu.',
    loop: 'fitrise-cap-s2', gif: '/work/fitrise/reels/s2-site-italic.gif', still: '/work/fitrise/reels/s2-site-italic.jpg', gifSize: '6.1 MB', file: 'Fitrise_Reel_Captions_02_Site_Italic',
    alt: 'Caption style 02: white italic sans words rise from a baseline, the key words in bold yellow italic with a yellow underline.',
  },
  {
    id: 's3', n: '03', name: 'Highlight bar',
    text: 'Heavy italic caps. Key words sit on a yellow bar cut at the 30° angle of the logo, with the three stripes from the logo mark.',
    loop: 'fitrise-cap-s3', gif: '/work/fitrise/reels/s3-highlight-bar.gif', still: '/work/fitrise/reels/s3-highlight-bar.jpg', gifSize: '5.2 MB', file: 'Fitrise_Reel_Captions_03_Highlight_Bar',
    alt: 'Caption style 03: bold italic capitals punch in, the key words in navy on a slanted yellow bar with three yellow stripes.',
  },
  {
    id: 's4', n: '04', name: 'LED karaoke',
    text: 'The language of the stadium intro: Oswald caps on a navy panel with the yellow bar. The word he is saying turns yellow and a cursor follows it.',
    loop: 'fitrise-cap-s4', gif: '/work/fitrise/reels/s4-led-karaoke.gif', still: '/work/fitrise/reels/s4-led-karaoke.jpg', gifSize: '6.1 MB', file: 'Fitrise_Reel_Captions_04_LED_Karaoke',
    alt: 'Caption style 04: condensed capitals on a navy panel with a yellow edge bar; the spoken word turns yellow with a yellow cursor under it.',
  },
];
type Title = { id: string; n: string; name: string; badge?: string; text: string; img: string; alt: string };
export const fitTitles: Title[] = [
  { id: 't1', n: '01', name: 'Brand quote', badge: 'Closest to brand',
    text: 'His words as a quote in IBM Plex Serif, his name in yellow caps, the logo mark as a tonal pattern.',
    img: '/work/fitrise/reels/t1-brand-quote.jpg',
    alt: 'Title design 01: quote “Wat je bent afgevallen, ben je ook weer heel snel aangekomen.” in white serif with the last words in yellow, name Ulrich Heidstra in yellow caps, on a navy fade.' },
  { id: 't2', n: '02', name: 'Site hero',
    text: 'The fitrise.nl hero: yellow Inter Italic over a darkened photo, with the yellow button.',
    img: '/work/fitrise/reels/t2-site-hero.jpg',
    alt: 'Title design 02: “Afgevallen… en weer snel aangekomen?” in large yellow italic, a yellow Jojo-effect button below.' },
  { id: 't3', n: '03', name: 'Stripes',
    text: 'Bold italic caps on slanted bars; the stripes of the logo rise into the yellow arrow.',
    img: '/work/fitrise/reels/t3-stripes.jpg',
    alt: 'Title design 03: white italic caps on slanted navy bars, Jojo-effect in navy on a yellow arrow bar, four yellow stripes rising from the corner.' },
  { id: 't4', n: '04', name: 'LED campaign',
    text: 'The stadium intro on a phone: Oswald on navy, the yellow bar, the slash and the 30° stripes.',
    img: '/work/fitrise/reels/t4-led-campaign.jpg',
    alt: 'Title design 04: condensed white and yellow capitals on a navy panel with a yellow bar and slash, Jojo-effect large.' },
];
export const fitFacts: [string, string][] = [
  ['Client', 'Fitrise'],
  ['Canvas', '1440 × 270 px'],
  ['Screen', 'P6 LED, 9.6 × 1.8 m'],
  ['Length', '15 s · 25 fps'],
  ['Role', 'Storyboard, motion'],
  ['Year', '2026'],
];

export const fitrise = {
  label: 'Case · Stadium LED',
  title: 'A 15-second intro for a stadium ribbon.',
  titleEm: 'stadium',
  seoTitle: 'Fitrise stadium intro — Toli Herasymenko',
  description: 'A 15-second logo intro for Fitrise on a 1440 × 270 stadium LED ribbon — two cuts, clean and flashy — plus four caption styles for the coach’s Instagram reels.',
  lead: 'Logo intro for Fitrise — personal training, lifestyle coaching and corporate fitness — made for a 9.6 × 1.8 m LED board. One yellow bar carries all four screens: it writes the line, floods the wall, fires across and lands as the slash in the logo.',
  heroLoop: { name: 'fitrise-led-flashy', alt: 'The flashy cut playing: bold words punch across the navy LED strip, the yellow bar sweeps and the Fitrise logo resolves.' },
  notes: [
    ['Pixel-true', 'Rendered at exactly 1440 × 270, so the player maps one pixel to one LED. No scaling, no soft edges.'],
    ['Flat brand colours', 'Navy, yellow and white straight from the brand. No gradients or fine lines that shimmer on camera.'],
    ['Safe to flash', 'Full-screen flashes only at the big transitions, checked frame by frame against the broadcast limit of three per second.'],
  ] as [string, string][],
  reels: {
    label: 'Next · Instagram Reels',
    title: 'From the stadium to the phone.',
    lead: 'Fitrise founder Ulrich Heidstra films short talks about training and lifestyle. Three layers make a reel stop the scroll and still look like Fitrise: a hook for the first second, a title in the brand look and captions that follow his voice. All built on one 11-second clip about the yo-yo effect.',
    hook: {
      step: '01 · The hook', title: 'One line, landed in a second.',
      copy: 'The opener lifts the strongest line of the talk into a glowing lockup in Fitrise yellow and navy: a flash, the pill, the line word by word, a comet underneath and JOJO-EFFECT popping letter by letter. Everything is on screen before he finishes the first sentence — then it keeps breathing, so the frame never freezes.',
      loop: 'fitrise-hook-full',
      alt: 'Animated hook: a yellow pill with “Afgevallen…” blurs in, “en weer snel aangekomen?” appears word by word, a white comet streaks under it and JOJO-EFFECT pops letter by letter in glowing yellow, with floating question marks.',
      gif: '/work/fitrise/reels/hook.gif', gifSize: '7.2 MB', file: 'Fitrise_Reel_Hook',
    },
    titlesStep: '02 · Titles', titlesTitle: 'The same moment, four ways.',
    captionsStep: '03 · Captions', captionsTitle: 'Every word on the frame he says it.',
    notes: [
      ['Sound off, still clear', 'Words are timed to his voice from a word-level transcript of the Dutch audio. Nothing is paraphrased.'],
      ['Brand, not preset', 'Navy, yellow, Inter and IBM Plex Serif straight from the Fitrise style sheet, and the stripes of the logo mark.'],
      ['One template, every reel', 'Each style is an After Effects template: a new clip and its transcript go in, the words time and centre themselves.'],
    ] as [string, string][],
  },
  ask: 'Need a screen intro, a logo animation or a reel system?',
  subject: 'Project like the Fitrise intro',
};
