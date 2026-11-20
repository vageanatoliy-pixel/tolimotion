// tolimotion.com — behaviour for every page (loaded once by src/layouts/Pearl.astro). No dependencies.
// Loops and films, the brief form, small conveniences. Everything degrades to plain HTML without JS.
// The motion switch preference and the `js` class are set before the first paint by the inline script in the layout.
const root = document.documentElement;

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionOff = () => reduced.matches || root.dataset.motion === 'off';
const saveData = !!(navigator.connection && navigator.connection.saveData);

/* ---------- silent loops: a still first, the video only near the screen, paused off-screen ---------- */
const loops = [...document.querySelectorAll('.loop')];
const visible = new Set();
const loadLoop = (fig) => {
  const v = fig.querySelector('video');
  if (v && !v.src && v.dataset.src) v.src = v.dataset.src;
  return v;
};
const playLoop = (fig) => {
  const v = loadLoop(fig);
  if (!v) return;
  v.addEventListener('playing', () => fig.classList.add('is-playing'), { once: true });
  const p = v.play();
  if (p && p.catch) p.catch(() => { /* autoplay refused: the still stays */ });
};
const pauseLoop = (fig) => {
  const v = fig.querySelector('video');
  if (v && !v.paused) v.pause();
};
if ('IntersectionObserver' in window) {
  const timers = new WeakMap();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const fig = e.target;
      clearTimeout(timers.get(fig));
      if (e.isIntersecting) {
        visible.add(fig);
        timers.set(fig, setTimeout(() => { if (visible.has(fig) && !motionOff() && !saveData) playLoop(fig); }, 250));
      } else { visible.delete(fig); pauseLoop(fig); }
    }
  }, { rootMargin: '120px 0px', threshold: 0.15 });
  /* a loop three screens away gives its video back (memory on long pages); it reloads from cache when it returns */
  const far = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) continue;
      const v = e.target.querySelector('video');
      if (v && v.getAttribute('src')) { v.pause(); v.removeAttribute('src'); v.load(); e.target.classList.remove('is-playing'); }
    }
  }, { rootMargin: '300% 0px' });
  loops.forEach((fig) => { io.observe(fig); far.observe(fig); });
}
/* hover or focus plays one loop even when autoplay is off — but never under reduced motion */
loops.forEach((fig) => {
  const host = fig.closest('[data-loop-host]') || fig;
  host.addEventListener('pointerenter', () => { if (!reduced.matches) playLoop(fig); });
  host.addEventListener('focusin', () => { if (!reduced.matches) playLoop(fig); });
  host.addEventListener('pointerleave', () => { if (motionOff() || saveData) pauseLoop(fig); });
  host.addEventListener('focusout', (e) => { if (!host.contains(e.relatedTarget) && (motionOff() || saveData)) pauseLoop(fig); });
});
const syncLoops = () => visible.forEach((fig) => (document.hidden || motionOff() || saveData ? pauseLoop(fig) : playLoop(fig)));
document.addEventListener('visibilitychange', syncLoops);

/* ---------- films with sound: nothing downloads until the click; one plays at a time ---------- */
const films = [...document.querySelectorAll('.film')];
const startFilm = (film) => {
  const v = film.querySelector('video');
  if (!v) return;
  films.forEach((f) => { if (f !== film) f.querySelector('video')?.pause(); });
  v.controls = true;
  film.classList.add('is-started');
  v.focus({ preventScroll: true });
  const p = v.play();
  if (p && p.catch) p.catch(() => { /* the native controls are there to start it by hand */ });
};
films.forEach((film) => {
  const v = film.querySelector('video');
  const btn = film.querySelector('.film__btn');
  if (!v) return;
  v.controls = false;
  btn?.addEventListener('click', () => startFilm(film));
  v.addEventListener('play', () => { if (!film.classList.contains('is-started')) startFilm(film); });
  v.addEventListener('ended', () => {
    const had = film.contains(document.activeElement);
    film.classList.remove('is-started');
    v.controls = false;
    if (had) btn?.focus({ preventScroll: true });
  });
  v.addEventListener('error', () => film.classList.remove('is-started'));
});
/* a button with data-play="<film id>" (e.g. "Watch the reel") brings that film to the middle of the screen and starts it */
document.querySelectorAll('[data-play]').forEach((b) => b.addEventListener('click', () => {
  const film = document.getElementById(b.dataset.play || '');
  if (!film) return;
  const r = film.getBoundingClientRect();
  window.scrollTo({ top: Math.max(0, r.top + window.scrollY - (window.innerHeight - r.height) / 2), behavior: motionOff() ? 'auto' : 'smooth' });
  startFilm(film);
}));

/* ---------- a polite live region for short confirmations ---------- */
const status = document.querySelector('[data-status]');
const announce = (msg) => { if (!status) return; status.textContent = ''; setTimeout(() => { status.textContent = msg; }, 50); };

/* ---------- copy the address ---------- */
document.querySelectorAll('[data-copy]').forEach((b) => {
  const label = b.textContent;
  b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy || ''); b.textContent = 'Copied'; announce('Address copied'); }
    catch (e) { b.textContent = 'Select & copy'; }
    setTimeout(() => { b.textContent = label; }, 1800);
  });
});

/* ---------- "Ask about this" fills the brief's service field ---------- */
document.querySelectorAll('[data-service]').forEach((a) => {
  a.addEventListener('click', () => {
    const sel = document.getElementById('brief-service');
    if (sel) sel.value = a.dataset.service || '';
  });
});

/* ---------- brief → a ready email in the visitor's own mail app ---------- */
const form = document.querySelector('[data-brief]');
if (form) {
  const err = form.querySelector('#brief-err');
  const mail = form.dataset.mail;
  form.noValidate = true;   /* without JS the browser still checks the required field and posts to mailto: */
  form.querySelector('textarea[name="message"]')?.addEventListener('input', (e) => {
    const t = e.currentTarget;
    if (t.value.trim() && t.getAttribute('aria-invalid') === 'true') { t.setAttribute('aria-invalid', 'false'); if (err) err.textContent = ''; }
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let ok = true;
    form.querySelectorAll('[required]').forEach((el) => {
      const bad = !el.value.trim();
      el.setAttribute('aria-invalid', String(bad));
      if (bad && ok) { el.focus(); ok = false; }
    });
    if (err) err.textContent = ok ? '' : 'Add a few lines about the project: what it is and what you need.';
    if (!ok) return;
    const get = (k) => String(data.get(k) ?? '').trim();
    const subject = `Project brief — ${get('service') || 'new project'}${get('company') ? ` · ${get('company')}` : ''}`;
    const head = [
      get('name') ? `Name: ${get('name')}` : '',
      get('company') ? `Company: ${get('company')}` : '',
      get('service') ? `Need: ${get('service')}` : '',
      get('budget') ? `Budget: ${get('budget')}` : '',
      get('deadline') ? `Deadline: ${get('deadline')}` : '',
    ].filter(Boolean).join('\n');
    const body = `${head}\n\n${get('message')}`;
    window.location.href = `mailto:${mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    /* webmail users often get no mail app: keep the typed brief on screen, ready to copy */
    const done = form.querySelector('[data-brief-done]');
    const text = form.querySelector('[data-brief-text]');
    if (done && text) { text.value = `Subject: ${subject}\n\n${body}`; done.hidden = false; done.focus(); }
  });
  form.querySelector('[data-brief-copy]')?.addEventListener('click', async (e) => {
    const b = e.currentTarget;
    const text = form.querySelector('[data-brief-text]');
    if (!text) return;
    try { await navigator.clipboard.writeText(text.value); b.textContent = 'Copied — paste it into an email'; }
    catch (x) { text.select(); b.textContent = 'Selected — press Cmd/Ctrl + C'; }
  });
}

/* ---------- live local time, so a client sees whether a reply can come today ---------- */
document.querySelectorAll('[data-localtime]').forEach((el) => {
  const tz = el.dataset.tz || 'Europe/Kyiv';
  const fmt = () => {
    try { el.textContent = `${new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date())} local time`; }
    catch (e) { /* keep the static text */ }
  };
  fmt();
  setInterval(fmt, 30000);
});

/* ---------- motion switch: pauses every loop and all CSS animation; remembered per visitor ---------- */
const switches = [...document.querySelectorAll('[data-motion-switch]')];
const syncSwitch = () => {
  const off = motionOff();
  switches.forEach((b) => {
    b.disabled = reduced.matches;
    b.setAttribute('aria-pressed', String(!off));
    const label = b.querySelector('[data-motion-label]');
    if (label) label.textContent = off ? 'Motion off' : 'Motion on';
  });
};
syncSwitch();
switches.forEach((b) => b.addEventListener('click', () => {
  const off = root.dataset.motion !== 'off';
  if (off) root.dataset.motion = 'off'; else delete root.dataset.motion;
  try { localStorage.setItem('motion', off ? 'off' : 'on'); } catch (e) { /* not stored */ }
  syncSwitch();
  syncLoops();
  if (off) showAll();
}));
reduced.addEventListener('change', () => { syncSwitch(); syncLoops(); if (reduced.matches) showAll(); });

/* ---------- scroll reveal: what is on screen shows at once, the rest as it arrives ----------
   Content is hidden only after this runs (html[data-reveal]), and never with reduced motion or motion off. */
const revealables = [...document.querySelectorAll('.reveal')];
let ro = null;
function showAll() {
  revealables.forEach((el) => el.classList.add('is-in'));
  if (ro) ro.disconnect();
  delete root.dataset.reveal;
}
if ('IntersectionObserver' in window && !motionOff()) {
  ro = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); ro.unobserve(e.target); }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });
  revealables.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in'); else ro.observe(el);
  });
  root.dataset.reveal = '';
  /* a link to an anchor lower down must never land on hidden blocks */
  window.addEventListener('hashchange', showAll);
  if (location.hash) showAll();
}

/* ---------- header: hides on the way down, returns on the way up or when focused ---------- */
const header = document.querySelector('[data-top]');
if (header) {
  let last = window.scrollY, ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle('is-hidden', y > last && y > 240 && !header.contains(document.activeElement));
      last = y;
      ticking = false;
    });
  }, { passive: true });
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
}
