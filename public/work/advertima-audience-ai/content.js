/* =====================================================================
   content.js: every word, label and file path on the page.
   Edit this file only. index.html, styles.css and script.js read from it.

   RULES
   - A text field that is empty or still starts with "TODO:" counts as missing.
     Missing things are never shown, and a section with nothing filled in is
     hidden, so the page never shows a placeholder, even half-filled.
   - Paths are relative ("assets/...", no leading slash).
   - A path that points to a missing file hides that item and prints a warning
     in the browser console (DevTools > Console).
   - Add ?debug to the URL to list every field that is still TODO and to log
     analytics events in the console.
   - Plain text only, no HTML. In hero.title, wrap words in *asterisks* to set
     them in the accent colour, the way the brand guide highlights headlines.
   ===================================================================== */

window.CONTENT = {
  // Browser tab title.
  pageTitle: "Creative test for Advertima · Toli",

  // true = same as adding ?debug to the URL. Keep false for the link you send.
  debug: false,

  // Small labels used across the page.
  labels: {
    duration: "Duration",            // first hero chip, shown as "Duration 0:42"
    reference: "Reference",          // badge on the client's reference still
    mine: "My version",              // badge on your still
    tool: "Tool",                    // tools table, column 1
    toolUse: "What I used it for",   // tools table, column 2
    specimen: "Aa",                  // letters in the typography sample
    openFull: "Open full size",      // screen-reader label on clickable stills
    close: "Close",                  // screen-reader label on the lightbox close button
    scrollDown: "Scroll down",       // screen-reader label on the arrow under the intro
  },

  /* 0. INTRO: logo animation ------------------------------------------ */
  intro: {
    video: "assets/video/logo-intro.mp4",
    poster: "assets/img/logo-intro-start.jpg",
    endStill: "assets/img/logo-intro-end.jpg",
    label: "Advertima logo animation",
  },

  /* 1. HERO ----------------------------------------------------------- */
  hero: {
    label: "Creative test for Advertima",
    title: "From physical shoppers to *anonymized audiences.*",
    summary: "A remake of chapters 01–03 of the Audience AI explainer: one store, one family, and a sensor view that shows what Advertima sees, never who.",
    video: "assets/video/hero.mp4",
    poster: "assets/img/hero-poster.jpg",
    duration: "0:42",
    tools: ["After Effects", "Kling 4.0", "Seedream", "Figma", "Python · OpenCV"],
  },

  /* 2. WHAT I CHANGED --------------------------------------------------- */
  changes: {
    title: "What I changed",
    intro: "Three changes against the reference cut, each shown at the same moment of the film.",
    cards: [
      {
        heading: "One world instead of four",
        text: "The reference moves between a photoreal intro, a 3D-animated family, an isometric store and flat dashboard panels. I kept one photoreal store and one family for all three chapters, generated from a single character sheet, and gave the sensor its own view of the same scene instead of a different world.",
        reference: "assets/img/change-1-reference.jpg",
        mine: "assets/img/change-1-mine.jpg",
      },
      {
        heading: "Privacy you can see",
        text: "In the reference, Capture turns people into grey statues with coloured skeletons, which reads as body tracking right when the script says identity cannot be revealed. In my sensor view, people become soft volumes in the Advertima Mash gradient with no faces, each carrying only an anonymous ID, and a privacy panel lists what the sensor keeps and what it never stores, using the figures Advertima publishes.",
        reference: "assets/img/change-2-reference.jpg",
        mine: "assets/img/change-2-mine.jpg",
      },
      {
        heading: "Data as a layer, not a slide",
        text: "The reference stops for chapter cards and keeps its data in a panel beside the scene. Here the labels are tracked to the people, the store turns into a floor plan, twenty stores feed one audience card and the number grows with every store that reports in. All of it is live type in Aspekta, so any value can be changed in minutes.",
        reference: "assets/img/change-3-reference.jpg",
        mine: "assets/img/change-3-mine.jpg",
      },
    ],
  },

  /* 3. WALKTHROUGH (hidden until a link or a file is set) ---------------- */
  walkthrough: {
    title: "Walkthrough",
    text: "",
    embedUrl: "",
    video: "",
    poster: "",
  },

  /* 4. CHARACTER & WORLD ------------------------------------------------ */
  world: {
    title: "Character & world",
    text: "Three cast sheets (father, mother, son) and one store plate were generated first and used as references for every keyframe, so outfits, faces and the store signage hold across all shots. The camera moves were then generated from those keyframes, and every sensor-view shot starts from the exact cut frame of its store-view shot, so the switch between the two never jumps.",
    sheet: "assets/img/character-sheet.jpg",
    locations: [
      { src: "assets/img/location-1.jpg", caption: "Entrance" },
      { src: "assets/img/location-2.jpg", caption: "Fresh produce" },
      { src: "assets/img/location-3.jpg", caption: "Aisle: bakery to breakfast" },
      { src: "assets/img/location-4.jpg", caption: "Aisles from above" },
    ],
  },

  /* 5. BRAND APPLICATION ------------------------------------------------ */
  brand: {
    title: "Brand application",
    intro: "Aspekta throughout, Dark as the ground of the sensor view and the Advertima Mash gradient as the light that stands for what the sensor sees. The UI follows the dark-glass chips and thin Light Blue lines of Advertima's own computer-vision demos, and every number on screen is one Advertima publishes: 120°, 15 m, 317 m², 25 people, 70 ms.",
    swatches: [
      { name: "Advertima Mash", cssVar: "--brand-mash" },
      { name: "Dark", cssVar: "--brand-dark" },
      { name: "Light Blue", cssVar: "--brand-light-blue" },
      { name: "Teal", cssVar: "--brand-teal" },
      { name: "Deep Teal", cssVar: "--brand-deep-teal" },
      { name: "Sky Blue", cssVar: "--brand-sky" },
      { name: "Mist", cssVar: "--brand-mist" },
    ],
    fontName: "Aspekta",
    weights: ["200", "400", "650"],
    typeSample: "Every Store. Smarter.",
    cards: [
      { src: "assets/img/ui-card-1.png", caption: "Sensor spec panel and field-of-view chip (01 Capture)" },
      { src: "assets/img/ui-card-2.png", caption: "Anonymous ID chip and the privacy panel (01 Capture)" },
      { src: "assets/img/ui-card-3.png", caption: "Profile cards and the group link (02 Profile)" },
      { src: "assets/img/ui-card-4.png", caption: "Audience card and Activate (03 Segment)" },
    ],
  },

  /* 6. FORMATS (hidden: no format clips) ------------------------------- */
  formats: {
    title: "Formats",
    intro: "",
    autoplay: true,
    items: [],
  },

  /* 7. PROCESS & TOOLS -------------------------------------------------- */
  process: {
    title: "Process & tools",
    intro: "Storyboard first, then a cast and a store built once and reused for every shot. Everything that has to be exact, the type, the data and the brand, lives in After Effects as live layers.",
    steps: ["Brief", "Storyboard", "Character sheet", "AI generation", "After Effects", "Review"],
    tools: [
      { tool: "Figma", use: "Beat sheet, storyboard, style frames and the UI design, in one file the client can comment on" },
      { tool: "Seedream", use: "Cast sheets, the store plates and the sensor-view keyframes, all from the same references" },
      { tool: "Kling 4.0", use: "Image-to-video for every shot: the one-take opening, produce, the aisle dolly and the crane" },
      { tool: "Python · OpenCV · Apple Vision", use: "Head and sensor tracking for the UI, the floor-plan geometry and the camera move into the plan" },
      { tool: "After Effects", use: "Compositing, the tracked UI, the sweeps between store and sensor view, the ending and the logo" },
      { tool: "ElevenLabs", use: "Voice-over, read from the original script" },
      { tool: "Sound effects", use: "Scan, identification and transition sounds" },
    ],
  },

  /* 8. ONGOING COLLABORATION ------------------------------------------- */
  collab: {
    title: "Ongoing collaboration",
    intro: "",
    blocks: [
      { heading: "How I'd work with you each week", text: "A short call to lock the brief, then a beat sheet and style frames for sign-off within two days, a first cut with a walkthrough by the end of the week, and feedback in one shared Figma file so every note sits on the frame it is about. Nothing is rendered final before the frames it is built on are approved." },
      { heading: "Tools I recommend", text: [
        "Figma for storyboards, style frames and UI, so your team comments on the exact frame",
        "A cast and a store built once as reference sheets and reused, so every new film stays consistent",
        "Kling or Seedance for camera moves on approved keyframes; After Effects for everything that must be exact: data, type, brand",
      ] },
      { heading: "What more time would add", text: "A music bed cut to the sweeps, 9:16 and 1:1 reframes for in-store screens and social, the remaining six chapters in the same world, and language versions: the UI is live type, so a translation is a text change, not a re-render." },
    ],
  },

  /* 9. FOOTER ----------------------------------------------------------- */
  footer: {
    name: "Toli",
    linkText: "tolimotion.com",
    linkUrl: "https://tolimotion.com",
    note: "Made for Advertima · November 2026",
  },

  /* ANALYTICS (off) ------------------------------------------------------ */
  analytics: {
    endpoint: "",
  },
};
