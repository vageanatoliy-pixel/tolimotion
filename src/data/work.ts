/* Work shown on the home page. Loops live in /public/loops/<loop>.mp4 + .jpg (silent, 3–9 s).
   status: 'public' = already on the live site or Toli's own; 'ask' = client work Toli still has to clear
   before it goes live (it is in the local build so he can judge the layout). */

export type Clip = { loop: string; title: string; client: string; href: string; w: number; alt: string; fit?: 'cover' | 'contain'; pos?: string; status?: 'public' | 'ask' };

/* Hero timeline: clip width = w (relative). Order = the story of the first screen. */
export const timeline: Clip[] = [
  { loop: 'cissp-ad2-adapts', title: 'CISSP MasterClass ads', client: 'Destination Certification', href: '/work/cissp-masterclass-ads/', w: 5,
    alt: 'CISSP ad: the CAT exam simulator dashboard slides in under the line “The CISSP exam adapts to you”, and the cursor clicks Prepare to Start Exam.' },
  { loop: 'cat-card', title: 'CAT exam simulator launch', client: 'Destination Certification', href: '#work-cat', w: 4, status: 'ask',
    alt: 'Launch card for the CISSP CAT exam simulator: the title builds on the left while a question card on the right fills in and the cursor clicks Next.' },
  { loop: 'adv-holo', title: 'Audience AI explainer, remade', client: 'Advertima · paid test project', href: '/work/advertima-audience-ai/', w: 5,
    alt: 'Advertima explainer: a family in a supermarket turns into glowing anonymous figures inside a sensor view, with small data labels.' },
  { loop: 'liveshops-3up', title: 'App splash animation', client: 'Liveshops', href: '#work-liveshops', w: 3,
    alt: 'Liveshops splash screen: on three white phone screens a red shopping bag with a play button drops, swings and hops, and the letters of Liveshops spill out beside it.' },
  { loop: 'fitrise-led-flashy', title: 'Stadium LED intro', client: 'Fitrise', href: '/work/fitrise-stadium-intro/', w: 4, fit: 'contain',
    alt: 'Fitrise LED ribbon: bold words “Excuses scoren niet. Actie wel. Kom in beweging.” punch across a navy strip, a yellow bar sweeps, and the Fitrise logo resolves.' },
];

export type Work = {
  id: string;
  client: string;
  title: string;
  line: string;
  role: string;
  meta: string;
  loop: string;
  ratio: string;
  span: 'xl' | 'lg' | 'md' | 'sm' | 'full' | 'tall';
  fit?: 'cover' | 'contain';
  pos?: string;
  href?: string;
  cta?: string;
  status: 'public' | 'ask';
  alt: string;
  trio?: { loop: string; label: string; alt: string }[];   // several vertical loops in one tile
  film?: { src: string; poster: string; label: string };   // quick view with sound, opens in the film dialog
};

export const works: Work[] = [
  {
    id: 'work-cissp', client: 'Destination Certification', title: 'CISSP MasterClass ads',
    line: 'Two ads that show the course working instead of listing features — then land on the pass rate.',
    role: 'Storyboard · design · motion · sound', meta: '37 s + 21 s · 16:9, 1:1, 9:16 · 2026',
    loop: 'cissp-ad1-sort', ratio: '16 / 9', span: 'xl', href: '/work/cissp-masterclass-ads/', cta: 'Case study', status: 'public',
    film: { src: '/work/cissp/ad1-16x9.mp4', poster: '/work/cissp/ad1-16x9.jpg', label: 'Watch ad 1 · 0:37' },
    alt: 'CISSP ad: a personal review guide re-sorts itself, pulling the weakest exam domains to the top while the background shifts from violet to coral.',
  },
  {
    id: 'work-advertima', client: 'Advertima · paid test project', title: 'Audience AI explainer, remade',
    line: 'A paid test: chapters 1–3 of Advertima’s explainer rebuilt in one photoreal store — AI-generated shots with hand-built sensor UI, profile cards, a live audience map and the logo reveal.',
    role: 'Concept · motion graphics · AI shot direction · compositing', meta: '42 s · 16:9 · 2026',
    loop: 'adv-map', ratio: '4 / 5', span: 'tall', pos: '100% 50%', href: '/work/advertima-audience-ai/', cta: 'Case study', status: 'public',
    film: { src: '/work/advertima-audience-ai/assets/video/hero.mp4', poster: '/work/advertima-audience-ai/assets/img/hero-poster.jpg', label: 'Watch the explainer · 0:42' },
    alt: 'Advertima explainer: glowing dots for shoppers gather into a dark audience map while a card counts up to 48,000 shoppers a week.',
  },
  {
    id: 'work-cat', client: 'Destination Certification', title: 'CAT exam simulator launch',
    line: 'A launch card for a new product feature: the real question screen rebuilt as layers and walked through by the cursor.',
    role: 'Design · UI animation', meta: '10 s · 16:9 · 2026',
    loop: 'cat-card', ratio: '16 / 9', span: 'md', status: 'ask',
    alt: 'Launch card for the CISSP CAT exam simulator: the title builds on the left while a question card fills in on the right and the cursor clicks Next.',
  },
  {
    id: 'work-liveshops', client: 'Liveshops', title: 'App splash animation',
    line: 'Logo animation for a live-shopping app’s splash screen: three motion options, delivered as Lottie files built from shape layers.',
    role: 'Logo animation · Lottie', meta: '2–3 s · Lottie JSON · 2026',
    loop: 'liveshops-3up', ratio: '16 / 9', span: 'md', status: 'public',
    alt: 'Liveshops splash screen on three phones: a red bag with a play button drops, swings and hops, and the letters of Liveshops spill out.',
  },
  {
    id: 'work-review', client: 'Destination Certification', title: 'Personal review guide',
    line: 'Product UI animation for an AI-security certification course (AAISM): a readiness ring fills, study sources tick in and the domains rank themselves.',
    role: 'UI animation', meta: '12 s · 4K · 2026',
    loop: 'dc-review-guide', ratio: '16 / 9', span: 'md', status: 'ask',
    alt: 'DestCert personal review guide: a 68 percent readiness ring, a list of study sources and three AI domains with progress bars ranking themselves.',
  },
  {
    id: 'work-formats', client: 'Vertical cuts', title: 'Cut for the phone, not cropped',
    line: 'Vertical versions are laid out again — captions, UI and camera — so nothing important sits under the crop or the app buttons.',
    role: 'Reels · Stories · TikTok · Shorts', meta: '9:16 · 1:1 · 4:5 · 16:9',
    loop: 'cissp-ad2-9x16', ratio: '9 / 16', span: 'md', status: 'public',
    alt: 'Three vertical ads side by side.',
    trio: [
      { loop: 'cissp-ad2-9x16', label: 'Product ad', alt: 'CISSP ad in 9:16: “The CISSP exam adapts to you” over the simulator dashboard, a click on Prepare to Start Exam, then a timed question.' },
      { loop: 'fitrise-reel-hook', label: 'Reel hook', alt: 'Fitrise reel in 9:16: a coach talks to camera while the hook “Afgevallen… en weer snel aangekomen? JOJO-EFFECT” builds in yellow captions.' },
      { loop: 'bf-kinetic', label: 'Kinetic type', alt: 'Kinetic type sale ad in 9:16: BLACK FRIDAY fills the frame in white and red, “Everything on sale” scrolls in columns, 40% OFF lands on red, an arrow points to SHOP NOW.' },
    ],
  },
  {
    id: 'work-fitrise', client: 'Fitrise', title: 'Stadium LED intro',
    line: 'Fifteen seconds for a 1440 × 270 LED ribbon around a pitch: storyboarded, animated and delivered in a clean and a flashy cut.',
    role: 'Storyboard · animation', meta: '15 s · 1440 × 270 · 2026',
    loop: 'fitrise-led-flashy', ratio: '16 / 3', span: 'full', fit: 'cover', href: '/work/fitrise-stadium-intro/', cta: 'Case study', status: 'public',
    alt: 'Fitrise LED ribbon: bold Dutch words punch across a navy strip, a yellow bar sweeps through, and the Fitrise logo resolves with its service list.',
  },
];
