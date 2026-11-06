/* Storyboards for the CISSP MasterClass case page.
   Every board is a lo-fi 320 × 180 SVG drawn from a few grey blocks: what is on screen,
   plus dashed marks for motion (camera pushes, rises, re-sorts). Colours come from CSS
   classes styled on the page (site tokens only). Timings and lines are from the final cuts. */

export type Board = { t: string; title: string; action: string; vo?: string; svg: string };

type C = 'ui' | 'card' | 'mid' | 'dark' | 'ghost';
const n = (v: number) => Math.round(v * 100) / 100;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const box = (x: number, y: number, w: number, h: number, c: C = 'ui', r = 3) =>
  `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
const bar = (x: number, y: number, w: number, h = 3, c: C = 'mid') => box(x, y, w, h, c, h / 2);
const dot = (cx: number, cy: number, r: number, c: C = 'mid') => `<circle class="${c}" cx="${cx}" cy="${cy}" r="${r}"/>`;
const txt = (x: number, y: number, s: string, size = 11, o: { w?: number; a?: 'start' | 'middle' | 'end'; c?: 'ink' | 'mute'; ls?: number } = {}) =>
  `<text class="t ${o.c ?? 'ink'}" x="${x}" y="${y}" font-size="${size}" font-weight="${o.w ?? 650}" text-anchor="${o.a ?? 'middle'}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${esc(s)}</text>`;
const note = (x: number, y: number, s: string, a: 'start' | 'middle' | 'end' = 'middle') =>
  `<text class="t note" x="${x}" y="${y}" font-size="8" text-anchor="${a}">${esc(s)}</text>`;

/* motion marks: dashed shaft + solid head */
const head = (x1: number, y1: number, x2: number, y2: number, s = 5) => {
  const a = Math.atan2(y2 - y1, x2 - x1), b = 0.5;
  const p = (ang: number) => `${n(x2 - s * Math.cos(ang))},${n(y2 - s * Math.sin(ang))}`;
  return `<polygon class="mvh" points="${n(x2)},${n(y2)} ${p(a - b)} ${p(a + b)}"/>`;
};
const arrow = (x1: number, y1: number, x2: number, y2: number) =>
  `<path class="mv" d="M${x1} ${y1}L${x2} ${y2}"/>${head(x1, y1, x2, y2)}`;
const curve = (x1: number, y1: number, cx: number, cy: number, x2: number, y2: number) =>
  `<path class="mv" d="M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}"/>${head(cx, cy, x2, y2)}`;
/* camera push: dashed target frame + arrows from the board corners toward it */
const push = (x: number, y: number, w: number, h: number) => {
  const corners: [number, number, number, number][] = [[0, 0, x, y], [320, 0, x + w, y], [0, 180, x, y + h], [320, 180, x + w, y + h]];
  /* short arrows on the line from each board corner, stopping just outside the frame corner */
  const arrows = corners.map(([bx, by, fx, fy]) => {
    const dx = fx - bx, dy = fy - by, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
    const ex = fx - ux * 5, ey = fy - uy * 5, sx = ex - ux * Math.min(22, len * 0.5), sy = ey - uy * Math.min(22, len * 0.5);
    return arrow(n(sx), n(sy), n(ex), n(ey));
  }).join('');
  return `<rect class="frame" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>${arrows}`;
};
const cursor = (x: number, y: number) =>
  `<polygon class="cur" points="${[[0, 0], [0, 13], [3.4, 9.9], [5.9, 15.4], [8, 14.5], [5.6, 9.2], [10, 9.2]].map(([a, b]) => `${x + a},${y + b}`).join(' ')}"/>`;
const ring = (cx: number, cy: number, r = 8) => `<circle class="ring" cx="${cx}" cy="${cy}" r="${r}"/>`;
const focus = (x: number, y: number, w: number, h: number, k = 6) =>
  `<path class="brk" d="M${x} ${y + k}V${y}H${x + k}M${x + w - k} ${y}H${x + w}V${y + k}M${x + w} ${y + h - k}V${y + h}H${x + w - k}M${x + k} ${y + h}H${x}V${y + h - k}"/>`;
const faint = (s: string, o = 0.4) => `<g opacity="${o}">${s}</g>`;
const numbered = (pts: [number, number][]) =>
  pts.map(([x, y], i) => `<circle class="ring" cx="${x}" cy="${y}" r="6"/>${txt(x, y + 3, String(i + 1), 7.5, { c: 'mute' })}`).join('');

const svg = (label: string, body: string, tint = false) =>
  `<svg viewBox="0 0 320 180" role="img" aria-label="${esc(label)}"><rect class="${tint ? 'bg-tint' : 'bg'}" width="320" height="180"/>${body}</svg>`;

/* ---------- shared pieces ---------- */
const lessonWindow = () =>
  box(36, 20, 248, 140, 'card', 7) + bar(46, 28, 40, 3) + box(48, 36, 224, 86, 'ui', 4) +
  dot(160, 79, 13, 'card') + `<polygon class="dark" points="155,72 155,86 167,79"/>` +
  bar(48, 130, 224, 3, 'dark') + dot(272, 131.5, 3, 'dark') + bar(48, 141, 70, 4) + bar(48, 149, 46, 3) +
  box(212, 139, 60, 11, 'dark', 5.5);

const guideRows = (fills: number[], style: (i: number) => 'card' | 'ghost' = () => 'card', y0 = 58) =>
  fills.map((f, i) => {
    const y = y0 + i * 23, s = style(i);
    return s === 'ghost'
      ? box(64, y, 192, 17, 'ghost', 4)
      : box(64, y, 192, 17, 'card', 4) + box(70, y + 4, 12, 9, 'ui', 2) + bar(88, y + 7, 70) + bar(176, y + 7, 56, 3, 'ui') + bar(176, y + 7, f, 3, 'dark');
  }).join('');

const passRate = (first: string, note1: string) =>
  txt(160, 33, 'INCLUDED IN THE', 6.5, { c: 'mute', w: 600, ls: 1.4 }) + txt(160, 50, 'CISSP MasterClass', 12, { w: 700 }) +
  txt(150, 106, '93.6%', 46, { w: 750 }) + txt(150, 127, first, 10, { w: 500, c: 'mute' }) +
  arrow(62, 112, 62, 66) + note(62, 124, note1) + arrow(230, 90, 258, 90) + txt(290, 95, '100%', 14, { c: 'mute', w: 700 });

const logo = () =>
  `<polygon class="ui" points="160,52 122,104 198,104"/><polyline class="ridge" points="136,85 149,74 160,87 172,70 186,89"/>` +
  txt(160, 125, 'DESTINATION', 14, { w: 800, ls: 0.6 }) + txt(160, 137, 'CERTIFICATION', 6, { c: 'mute', w: 600, ls: 1.2 });

const dashboard = () =>
  box(44, 44, 232, 118, 'card', 6) + box(54, 54, 212, 20, 'ui', 4) + box(60, 58, 12, 12, 'mid', 2) + bar(78, 61, 60) +
  box(206, 58, 54, 11, 'dark', 5.5) + txt(58, 99, '671', 16, { a: 'start', w: 750 }) + bar(92, 94, 40) +
  box(150, 84, 52, 22, 'ui', 3) + box(208, 84, 52, 22, 'ui', 3) +
  bar(56, 120, 204, 3, 'ui') + bar(56, 120, 122, 3, 'dark') + bar(56, 132, 204, 3, 'ui') + bar(56, 144, 204, 3, 'ui');

const question = (x: number, y: number, w: number, sel = 1) =>
  box(x, y, w, 104, 'card', 6) + bar(x + 10, y + 10, 40) + box(x + w - 62, y + 7, 26, 8, 'ui', 4) + box(x + w - 32, y + 7, 26, 8, 'ui', 4) +
  bar(x + 10, y + 22, w - 26, 4) + bar(x + 10, y + 30, w - 66, 4) +
  [120, 110, 130, 100, 64].map((bw, i) => dot(x + 14, y + 46 + i * 11, 3, i === sel ? 'dark' : 'ui') + bar(x + 22, y + 44.5 + i * 11, Math.min(bw, w - 40))).join('') +
  box(x + w - 54, y + 88, 46, 9, 'dark', 4.5);

/* ---------- Ad 1 · A mile wide (37 s) ---------- */
export const ad1: Board[] = [
  { t: '0:00', title: 'The badge opens',
    action: 'The CISSP badge scales up and its ring opens to let the line in.',
    vo: 'CISSP is a mile wide…',
    svg: svg('CISSP badge opening',
      `<path class="badge" d="M188 70V64A12 12 0 0 0 176 52H144A12 12 0 0 0 132 64V96A12 12 0 0 0 144 108H176A12 12 0 0 0 188 96V90"/>` +
      txt(160, 84, 'CISSP', 12, { c: 'mute', w: 700 }) + `<rect class="frame" x="106" y="26" width="108" height="108" rx="20"/>` +
      arrow(128, 48, 112, 32) + arrow(192, 48, 208, 32) + arrow(128, 112, 112, 128) + arrow(192, 112, 208, 128) + curve(204, 64, 224, 80, 204, 96)) },
  { t: '0:01', title: 'A mile wide',
    action: 'The first half of the line pops in word by word.',
    vo: '…a mile wide…',
    svg: svg('Headline: A mile wide', txt(160, 100, 'A mile wide', 28, { w: 750 }) + numbered([[93, 62], [138, 62], [205, 62]])) },
  { t: '0:03', title: 'An inch deep',
    action: 'The camera drops under the surface. Topic pills float on top, the second half lands below.',
    vo: '…and an inch deep. It’s easy to over-study some topics and still miss others.',
    svg: svg('Camera drops under a row of floating topic pills; headline An inch deep',
      [[20, 30, 58], [90, 22, 70], [172, 30, 64], [246, 22, 46], [38, 52, 48], [104, 48, 40], [158, 56, 52], [226, 50, 50]].map(([x, y, w]) => box(x, y, w, 10, 'ui', 5)).join('') +
      `<path class="wave" d="M0 74Q20 68 40 74T80 74T120 74T160 74T200 74T240 74T280 74T320 74"/>` +
      txt(150, 128, 'An inch deep', 22, { w: 750 }) + arrow(300, 16, 300, 112)) },
  { t: '0:07', title: 'A lesson ends',
    action: 'Cut to the course player: the lesson video plays out to the end.',
    vo: 'In our MasterClass, after each section…',
    svg: svg('Lesson player with a finished progress bar', lessonWindow() + arrow(52, 124, 258, 124)) },
  { t: '0:09', title: 'Quick check',
    action: 'Push in on the “Quick check” button. The cursor clicks it.',
    svg: svg('Camera pushes in on the Quick check button; cursor clicks',
      faint(lessonWindow()) + box(212, 139, 60, 11, 'dark', 5.5) + push(198, 128, 90, 34) + ring(240, 144, 9) + cursor(242, 146)) },
  { t: '0:10', title: 'A few quick questions',
    action: 'Question cards rise in a stack; an answer is picked on each. The caption builds above.',
    vo: '…you answer a few quick questions.',
    svg: svg('Stack of question cards, an answer is clicked; caption Quick check after each section',
      txt(160, 28, 'Quick check after each section', 13, { w: 700 }) +
      box(106, 44, 108, 92, 'ui', 5) + box(96, 50, 128, 92, 'ui', 5) + box(86, 56, 148, 98, 'card', 5) +
      bar(96, 66, 40) + bar(96, 78, 122, 4) + bar(96, 86, 104, 4) + bar(96, 94, 80, 4) +
      box(96, 134, 28, 9, 'ui', 4.5) + box(128, 134, 28, 9, 'dark', 4.5) + box(160, 134, 28, 9, 'ui', 4.5) + box(192, 134, 32, 9, 'ui', 4.5) +
      ring(142, 138.5, 8) + cursor(144, 140) + arrow(254, 146, 254, 92)) },
  { t: '0:12', title: 'The review guide',
    action: 'The answers become a review guide: one domain, its sub-topics, mastery bars filling.',
    vo: 'Those answers shape your review guide.',
    svg: svg('Review guide: domain header and five sub-topic rows with mastery bars',
      box(56, 18, 208, 32, 'card', 5) + dot(72, 34, 8) + bar(86, 27, 60) + bar(86, 34, 90, 4) + bar(86, 42, 150, 3, 'ui') + bar(86, 42, 96, 3, 'dark') +
      guideRows([44, 36, 30, 22, 16]) + arrow(222, 68.5, 234, 68.5) + arrow(214, 91.5, 226, 91.5) + arrow(286, 162, 286, 80)) },
  { t: '0:16', title: 'Nailed',
    action: 'The strongest topic grows and lights up; the background turns violet.',
    vo: 'Topics you’ve nailed get less review time.',
    svg: svg('Strongest row scales up, others fade',
      faint(guideRows([36, 30, 22, 16], () => 'card', 87), 0.45) +
      box(52, 52, 216, 22, 'card', 5) + box(59, 57, 14, 12, 'ui', 2) + bar(80, 61, 80) + bar(178, 61, 62, 4, 'ui') + bar(178, 61, 58, 4, 'dark') +
      arrow(48, 63, 34, 63) + arrow(272, 63, 286, 63), true) },
  { t: '0:19', title: 'Shaky',
    action: 'Focus jumps to a weak topic. The rest go soft, the background turns coral.',
    vo: 'Topics you’re shaky on get more.',
    svg: svg('Weak row in focus, the rest blurred',
      guideRows([44, 12, 30, 22, 16], (i) => (i === 1 ? 'card' : 'ghost')) + focus(58, 75, 204, 23), true) },
  { t: '0:21', title: 'Weak spots first',
    action: 'All eight domains rise in. “Sort by” opens, Mastery is clicked, the weakest domains jump to the top.',
    vo: 'Your study time goes to your weak spots, not to what you already know.',
    svg: svg('Domain list; Sort by menu set to Mastery; cards re-sort weakest first',
      txt(24, 26, 'More time on your weak spots', 12, { a: 'start', w: 700 }) +
      [0, 1, 2, 3, 4].map((i) => { const y = 38 + i * 27; return box(34, y, 162, 21, 'card', 4) + dot(46, y + 10.5, 6) + bar(58, y + 6, 46) + bar(58, y + 12, 30, 3, 'ui') + bar(132, y + 9, 54, 3, 'ui') + bar(132, y + 9, [50, 44, 22, 14, 36][i], 3, 'dark'); }).join('') +
      curve(30, 116, 8, 84, 28, 52) + arrow(206, 50, 206, 96) +
      box(224, 34, 74, 13, 'card', 3) + bar(230, 39, 32) + box(224, 49, 74, 38, 'card', 3) + bar(230, 55, 36) + box(226, 61, 70, 11, 'ui', 2) + bar(230, 65, 40, 3, 'dark') + bar(230, 78, 44) +
      ring(266, 67, 7) + cursor(268, 68)) },
  { t: '0:26', title: 'The pass rate',
    action: 'The number counts up to 93.6 %, holds on the line, then runs on to “nearly 100 %”.',
    vo: '93.6 % of our students pass on their first attempt. Nearly all the rest pass on their second.',
    svg: svg('Pass rate counting up to 93.6 percent, then to nearly 100 percent', passRate('pass on their first attempt', '36.1')) },
  { t: '0:33', title: 'Logo',
    action: 'The Destination Certification mark rises and settles; fade to black.',
    vo: 'Take a look inside the CISSP MasterClass.',
    svg: svg('Destination Certification logo', logo() + push(104, 40, 112, 106)) },
];

/* ---------- Ad 2 · The exam adapts (21 s) ---------- */
export const ad2: Board[] = [
  { t: '0:00', title: 'The CISSP exam',
    action: 'The line opens big and centred, word by word.',
    vo: 'The CISSP exam…',
    svg: svg('Headline: The CISSP exam', txt(160, 100, 'The CISSP exam', 26, { w: 750 }) + numbered([[84, 62], [152, 62], [228, 62]])) },
  { t: '0:02', title: 'Adapts to you',
    action: 'The line shrinks to the top and finishes; the CAT simulator dashboard rises under it.',
    vo: '…adapts to your answers as you go.',
    svg: svg('Caption at the top; simulator dashboard rising', txt(160, 28, 'The CISSP exam adapts to you', 12, { w: 700 }) + dashboard() + arrow(294, 166, 294, 96)) },
  { t: '0:04', title: 'Start the exam',
    action: 'Push in on “Prepare to Start Exam”. The cursor clicks.',
    svg: svg('Camera pushes in on the start button; cursor clicks', faint(dashboard()) + box(206, 58, 54, 11, 'dark', 5.5) + push(196, 50, 74, 28) + ring(230, 64, 8) + cursor(232, 66)) },
  { t: '0:05', title: 'On the clock',
    action: 'A question card with the exam timer. An answer is picked.',
    vo: 'Our CAT exam simulator…',
    svg: svg('Question card with timer; cursor picks an answer',
      question(52, 42, 216) + box(208, 22, 64, 16, 'card', 4) + txt(240, 33.5, '01:57:30', 8, { c: 'mute', w: 600 }) + ring(66, 99, 7) + cursor(68, 100), true) },
  { t: '0:07', title: 'The real exam',
    action: 'The caption lands; each new question drops onto the stack.',
    vo: '…works the same way,',
    svg: svg('Caption Works just like the real exam; question cards stacking',
      txt(160, 28, 'Works just like the real exam', 12, { w: 700 }) + box(72, 52, 176, 104, 'ui', 6) + box(64, 46, 192, 104, 'ui', 6) + question(56, 40, 208, 2) +
      arrow(288, 22, 288, 70), true) },
  { t: '0:10', title: 'Next',
    action: 'Push in on “Next”, click — the card slides out of frame.',
    vo: 'so when exam day comes,',
    svg: svg('Camera pushes in on Next; the card slides out',
      faint(question(40, 30, 200, 3)) + box(186, 118, 46, 9, 'dark', 4.5) + push(172, 108, 74, 29) + ring(208, 122, 8) + cursor(210, 124) + arrow(150, 162, 40, 162), true) },
  { t: '0:11', title: 'Exam day feels familiar',
    action: 'The score report fills in: the score counts up to a pass.',
    vo: '…it already feels familiar.',
    svg: svg('Score report counting to 750 with a Pass chip',
      txt(160, 28, 'Exam day feels familiar', 12, { w: 700 }) + box(36, 40, 248, 100, 'card', 6) +
      txt(50, 72, '750', 20, { a: 'start', w: 750 }) + txt(91, 72, '/1000', 7, { a: 'start', c: 'mute', w: 500 }) + note(124, 72, 'counts up from 451', 'start') +
      box(236, 50, 36, 11, 'dark', 5.5) + bar(50, 86, 222, 3, 'ui') + bar(50, 86, 150, 3, 'dark') +
      [0, 1, 2, 3].map((i) => box(50 + i * 56, 100, 50, 22, 'ui', 3)).join('') + bar(50, 130, 30, 3, 'dark') + bar(86, 130, 30) + bar(122, 130, 30)) },
  { t: '0:14', title: 'The pass rate',
    action: 'Same count-through as Ad 1: 93.6 % on the first attempt, then “nearly 100 %”.',
    vo: 'It’s included in the CISSP MasterClass.',
    svg: svg('Pass rate counting up to 93.6 percent, then to nearly 100 percent', passRate('pass on their first attempt', '54.6')) },
  { t: '0:18', title: 'Logo',
    action: 'The mark rises and settles, then the frame fades to black under the music tail.',
    svg: svg('Destination Certification logo', logo() + push(104, 40, 112, 106)) },
];
