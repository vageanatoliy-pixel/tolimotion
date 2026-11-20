/* Home-page copy that is not in site.ts / work.ts / cases.ts. Same text as the 2026-11-17 home page
   (moved here from its components on 2026-11-21, when the home became the one-page "Pearl" layout). */

export const hero = {
  h1: 'Motion design that makes complex products simple to watch.',
  lead: 'I storyboard, design, animate and edit ads, explainers and product walkthroughs for SaaS, EdTech and tech brands. One senior designer, from the brief to final files in every format you run.',
  reel: { src: '/showreel.mp4', poster: '/showreel.jpg', length: '0:26' },
};

export const about = {
  title: 'One person, the whole pipeline.',
  paragraphs: [
    'I’m Toli — Anatolii Herasymenko — a motion designer and video editor from Ukraine. I have worked in production full-time for eight years, from quick social cuts to long launch campaigns. Along the way I have cut commercials, event films, music videos and YouTube shows for clients in Ukraine.',
    'My main client is Destination Certification, a Canadian cybersecurity-training company. I run their video work end to end: ads, product animation, kinetic type and sound, even the book covers. I keep room for a few other projects at a time and do every one myself — no hand-offs, no account managers.',
  ],
  trio: [
    ['Simple', 'Nothing on screen without a job to do.'],
    ['Light', 'Pacing that never makes the viewer work.'],
    ['Deep', 'Sound, systems and detail underneath.'],
  ] as [string, string][],
};

export const workIntro = {
  title: 'Work that shipped.',
  label: 'Selected work',
  note: ['Ads, an explainer, product UI and brand motion from the last year. Much of my work sits under NDA or white-label — ', 'ask for a private reel', '.'] as [string, string, string],
  privateWork: [
    ['More for Destination Certification', 'Nine CISSP performance ads, the AAISM launch campaign, kinetic type, book covers and sound. Most of it is not on this site.'],
    ['White-label for agencies', 'Animation and edits delivered under NDA, with the agency’s name on them.'],
  ] as [string, string][],
};

export const servicesIntro = {
  title: 'What I make and what it costs.',
  note: 'Fixed prices after a short call. Starting points below — the quote depends on length, formats and how much is new design.',
};

export const process = {
  title: 'You see it early, and often.',
  lead: 'Animation projects run on five steps. You sign off the script, the look and the timing before full animation starts — so the expensive part never goes in the wrong direction. Edits skip steps 02 and 03.',
  inside: {
    title: 'CISSP ad: animatic to final in ten days.',
    lead: 'The opening line is “CISSP is a mile wide and an inch deep.” Here is the same ad at three stages, with the two decisions that changed it most.',
    rough: { loop: 'proc-ad1-rough-mile', alt: 'Rough animatic: plain text “A mile wide. An inch deep.” on a violet gradient, then a row of topic pills slides in.', date: '23 Oct', name: 'Animatic', text: 'Boards on a camera, timed to the voice-over.' },
    final: { loop: 'cissp-ad1-mile', alt: 'Final ad: “A mile wide” resolves out of blur, then topic pills float over the glowing line “An inch deep”.', date: '2 Nov', name: 'Final', text: 'Kinetic type, depth and one camera move.' },
    looks: [
      { img: '/loops/proc-ad1-sf-A_waterline.jpg', tag: 'A', name: 'Waterline', verdict: 'Too literal', pick: false },
      { img: '/loops/proc-ad1-sf-B_depth-field.jpg', tag: 'B', name: 'Depth field', verdict: 'Runner-up', pick: false },
      { img: '/loops/proc-ad1-sf-C_thin-layer.jpg', tag: 'C', name: 'Thin layer', verdict: 'Chosen', pick: true },
    ],
    looksCaption: { date: '1 Nov', name: 'Three looks', text: 'for the hook frame. The literal one was dropped; the abstract “thin layer” was built.' },
    before: { loop: 'proc-ad1-rough-pass', alt: 'Animatic: two donut charts side by side, 93.6% and 100%.', text: 'Before: two charts compete for the eye.' },
    after: { loop: 'proc-ad1-final-pass', alt: 'Final: one large number counts up to 93.6% — pass on their first attempt — then on to nearly 100% by the second.', text: 'After: one number counts through both results.' },
    decision: 'the animatic showed DestCert’s two pass rates as two donut charts — a stock dashboard layout. In the final, one number counts through time: 93.6% pass on the first attempt, then on to nearly 100% by the second. One hero moment instead of two halves.',
  },
};

export const agenciesIntro = {
  title: 'Overflow work, under your name.',
  lead: 'I animate and edit inside your pipeline: your boards and style frames, your naming, your review tool. Nothing is shown publicly without your written OK.',
};

export const ai = {
  title: 'AI where it saves you time. Craft where it shows.',
  loop: 'adv-family',
  alt: 'Advertima explainer: an AI-generated family walks a supermarket aisle while hand-built data cards track them, anonymously.',
  caption: 'AI-generated store, hand-built sensor UI and data cards — Advertima.',
  cols: [
    ['What AI does', ['Environments and b-roll that would otherwise need a shoot', 'Fast concept options before anything is animated', 'Rough timing, transcripts and caption drafts']],
    ['What it never does', ['Your logo, type or brand graphics', 'Motion design, layout and the edit — all hand-built', 'Final decisions on taste']],
    ['What you can count on', ['You approve any generation cost first', 'AI-free on request, for brands with a policy', 'Every AI shot is directed, composited and graded']],
  ] as [string, string[]][],
};

export const faqIntro = { title: 'Before you write.', side: 'Anything else? Ask in the brief below.' };

export const contact = {
  title: 'Tell me about your project.',
  sub: 'A few lines are enough.',
  promises: [
    'I reply within one working day — questions or a quote.',
    'If it fits, a 20-minute call about goals, audience and formats.',
    'A fixed price and a schedule before any work starts.',
  ],
  budgets: ['Under $500', '$500–1,500', '$1,500–3,000', '$3,000+', 'Not sure yet'],
  note: 'Your email app opens with the brief filled in. Nothing is stored on this site.',
};
