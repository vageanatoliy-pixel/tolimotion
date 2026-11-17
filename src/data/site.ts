/* All home-page copy and facts live here, so text can be changed in one place.
   Rule for this file: only facts that are true today. Anything still waiting for Toli is an empty
   string or an empty array — empty items are not rendered (open the site with ?draft to see the slots).
   Prices, turnaround and payment terms are the ones Toli set for the services prototype on 2026-11-07. */

/* Draft slots and internal notes are rendered only in `npm run dev` or a `PUBLIC_DRAFT=1 npm run build`
   (then open with ?draft). Production HTML never contains them. */
export const DRAFT = import.meta.env.DEV || import.meta.env.PUBLIC_DRAFT === '1';

export const person = {
  name: 'Toli Herasymenko',          // DECISION FOR TOLI: public name (logo says "Toli"; legal "Anatolii")
  short: 'Toli',
  role: 'Motion designer & video editor',
  email: 'hello@tolimotion.com',
  city: 'Uzhhorod, Ukraine',
  tz: 'Europe/Kyiv',                 // UTC+2 in winter, UTC+3 in summer
  years: 8,
  photo: '',                         // MISSING: a real portrait, 4:5, ≥ 1200 px tall → /public/about/portrait.jpg
  bookingUrl: '',                    // MISSING: Cal.com 20-min call link
  upworkUrl: '',                     // MISSING: public Upwork profile URL
  socials: [] as { label: string; href: string }[], // MISSING: LinkedIn / Behance / Instagram URLs
};

/* Client names as plain text (no logo files without permission). Canon / BWD never.
   DECISION FOR TOLI: confirm each name may be listed; add more only with permission. */
/* Client work Toli has not cleared yet (status 'ask' in work.ts + the CISSP drafts in Process):
   true = show it, false = hide it everywhere until the client says yes. */
export const showPendingClientWork = true;

export const clients: { name: string; what: string }[] = [
  { name: 'Destination Certification', what: 'cybersecurity EdTech' },
  { name: 'Advertima', what: 'retail AI' },
  { name: 'Fitrise', what: 'fitness' },
  { name: 'Liveshops', what: 'live-shopping app' },
];

/* Where the video files are served from. Empty = this site. Cloudflare Workers static assets answer
   Range requests with the whole file, which iPhone Safari needs for video; once the MP4s live in an R2
   bucket on a subdomain, set e.g. 'https://media.tolimotion.com' and every loop and film follows. */
export const mediaBase = '';
export const media = (path: string) => (/^https?:/.test(path) ? path : `${mediaBase}${path}`);

export const availability = {
  // DECISION FOR TOLI: keep it true. Example: 'Booking projects for December'.
  label: 'Taking new projects',
};

export type Service = { id: string; name: string; line: string; items: string[]; from: string; time: string; loop: string; ratio?: string; draft?: boolean };
export const services: Service[] = [
  {
    id: 'product', name: 'Product & UI animation',
    line: 'Your app, shown working: walkthroughs and feature launches built from your own Figma screens.',
    items: ['UI rebuilt as clean, animatable layers', 'Cursor, clicks and camera moves that follow the story', '16:9, 1:1 and 9:16 cuts'],
    from: '$900 for 3 product ads, all formats', time: 'About 10 working days', loop: 'cissp-ad2-real',
  },
  {
    id: 'ads', name: 'Video ads',
    line: 'Hook-first ads for Meta, YouTube and LinkedIn, delivered in every format your media buyer needs.',
    items: ['Script polish and hook options', 'Kinetic type, captions, sound design', 'Safe zones for Reels and TikTok'],
    from: '$150 for a trial ad, one format', time: '5 working days', loop: 'cissp-ad1-weak',
  },
  {
    id: 'explainers', name: 'Explainers',
    line: 'One idea explained in 60–90 seconds: script, storyboard, animatic, animation and mix.',
    items: ['Storyboard and style frames before animation', 'Voice-over casting and mix', '16:9 master + 9:16 cut'],
    from: '$1,200', time: '3–4 weeks', loop: 'adv-overhead',
  },
  {
    id: 'brand', name: 'Logo & brand motion',
    line: 'Logo reveals, app splash screens, LED and event loops, lower thirds and titles.',
    items: ['ProRes with alpha, MP4, Lottie JSON', 'Tested in a Lottie player before delivery', 'Screen-size masters for LED walls'],
    from: '$150', time: 'About 1 week', loop: 'adv-logo',
  },
  {
    id: 'editing', name: 'Video editing',
    line: 'Interviews, podcasts, events and reels — cut tight, captioned, coloured and mixed.',
    items: ['Speaker cuts and cold opens', 'Captions in your brand style', 'Cut-downs for every platform'],
    from: '$350 for a 3–5 minute edit', time: 'About 1 week', loop: 'fitrise-reel-hook',
  },
  {
    id: 'partner', name: 'Monthly motion partner', draft: true, // DECISION FOR TOLI: buyers asked for a number here
    line: 'A standing block of hours each month for ads, cut-downs, launch assets and edits — one queue, one person.',
    items: ['Priority turnaround', 'Templates and rigs reused across a series', 'Monthly planning call'],
    from: 'MISSING: monthly price (e.g. hours × rate)', time: 'Month to month', loop: 'cissp-ad2-adapts',
  },
];

/* Quotes only with the client's permission — name, role, company, ideally a photo.
   MISSING: none collected yet. Ask the DestCert marketing lead, the Fitrise owner and the Liveshops founder. */
export type Quote = { quote: string; name: string; role: string; company: string; photo?: string; result?: string };
export const quotes: Quote[] = [];

export const facts: [string, string][] = [
  ['Based in', 'Uzhhorod, Ukraine · Kyiv time (UTC+2; UTC+3 in summer)'],
  ['Overlap', 'Europe all day · US East mornings'],
  ['Experience', '8 years full-time in production'],
  ['Replies', 'Within one working day'],
  ['Motion', 'After Effects · Lottie · Figma'],
  ['Edit & finish', 'Premiere Pro · DaVinci Resolve · Final Cut Pro · sound'],
  ['Also use', 'Cinema 4D · Blender · Rive · Photoshop · Illustrator'],
  ['Generated shots', 'Kling · Seedream (Advertima)'],
];

/* For agencies. points = how the work runs (true today); terms = numbers only Toli can give (draft until filled). */
export const agencies = {
  points: [
    { t: 'White-label by default', d: 'Happy to sign your NDA before the brief. No credit, no portfolio use and no contact with your client unless you ask for it.' },
    { t: 'Your pipeline', d: 'I animate from your boards and style frames, in your After Effects templates, with your naming and delivery specs.' },
    { t: 'Clean handoff', d: 'Organised projects with named layers, live text and no paid plugins, plus controller layers for the values your team will change.' },
    { t: 'Every format', d: '16:9, 1:1, 4:5 and 9:16 reframed, captioned and caption-free versions, ProRes or MP4.' },
  ],
  terms: [
    { t: 'Day rate', d: '', missing: 'MISSING: agency day / half-day rate and minimum booking.' },
    { t: 'Capacity', d: '', missing: 'MISSING: days per week for agencies, lead time, next free date.' },
  ],
};

export type Step = { n: string; name: string; text: string; you: string };
export const steps: Step[] = [
  { n: '01', name: 'Brief & call', text: 'Twenty minutes on goals, audience and formats. You get a fixed price and a schedule.', you: 'You approve: the offer' },
  { n: '02', name: 'Script & look', text: 'Script polish, storyboard and two or three style frames for the key moments.', you: 'You approve: script and look' },
  { n: '03', name: 'Animatic', text: 'The boards on a camera, timed to the voice-over and music. Changes are cheap here.', you: 'You approve: timing' },
  { n: '04', name: 'Animation & sound', text: 'Full animation, sound design and mix. Two rounds of changes.', you: 'You approve: the final cut' },
  { n: '05', name: 'Delivery', text: 'Every format, captioned and caption-free versions, organised source files.', you: 'You get: the files' },
];

export type Faq = { q: string; a: string; draft?: boolean };
export const faq: Faq[] = [
  { q: 'What does a project cost?',
    a: 'A trial ad (one ad, one format) or a logo animation starts at $150. Three product ads in all formats start at $900, an explainer at $1,200, a 3–5 minute edit at $350. You get a fixed quote after a short call, before any work starts.' },
  { q: 'How long does it take?',
    a: 'About 5 working days for a single ad or logo animation, about 10 for three ads, 3–4 weeks for an explainer, about a week for an edit. Small pieces can be rushed in 48 hours.' },
  { q: 'How many revisions are included?',
    a: 'Two rounds on most projects. A round is one combined list of changes from your team. You sign off the script, the look and the animatic before animation starts, so late surprises stay small.' },
  { q: 'Do you use AI?',
    a: 'Yes — where it makes the result better or cheaper than a shoot: generated environments and b-roll, early concepts. Every motion graphic, layout and edit is built by hand, and AI shots are directed, composited and graded inside the edit. You approve the cost before anything is generated. If your brand needs an AI-free project, say so.' },
  { q: 'What files do I get?',
    a: 'A master in every ratio you run (16:9, 1:1, 4:5, 9:16), as MP4 or ProRes. Captioned and caption-free versions, plus an SRT caption file. Lottie or WebM for web and apps, pixel-true renders for LED screens.' },
  { q: 'Who owns the work? Do I get source files?',
    a: 'You do, once the project is paid. Organised source files with named layers and live text come with every project — After Effects, Premiere, Final Cut, Resolve or Figma.' },
  { q: 'Do you work with agencies and under NDA?',
    a: 'Yes. White-label work is welcome: your naming, your delivery specs, and nothing is shown publicly without your OK.' },
  { q: 'How do payments work?',
    a: 'Every contract runs through Upwork, so your payment is protected: fixed-price milestones you fund up front and release when you approve, or hourly with a weekly cap. If you found me on this site, I send you an Upwork Direct Contract after our call.' },
  { q: 'Where are you, and when can we talk?',
    a: 'Uzhhorod, in western Ukraine, on Kyiv time (UTC+2; UTC+3 in summer). That is a full working day with Europe and the morning of the US East Coast. I reply within one working day.' },
  { q: 'Are voice-over and music included, and cleared for paid ads?', a: '', draft: true }, // MISSING: VO talent fees, music library (Artlist?) and paid-ads licence terms
  { q: 'Can you invoice our company directly?', a: '', draft: true }, // MISSING: invoice currency, Wise/Payoneer, W-8BEN for US clients — only if true
  { q: 'What if the power or the internet goes down?',
    a: '', draft: true }, // MISSING: Toli's real backup setup (generator / battery / second connection) — answer only if true
];
