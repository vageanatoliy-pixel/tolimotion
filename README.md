# tolimotion.com

Портфоліо Toli. Astro, статика, деплой на Cloudflare Workers (Workers Builds з гілки `main`). Подробиці — у `CLAUDE.md`.

## Швидкий старт
```bash
npm install
npm run dev        # http://localhost:4321
```

## Деплой
Кожен `git push` у `main` → Cloudflare Workers Builds: `npm run build`, потім `npx wrangler deploy` (налаштування — `wrangler.jsonc`: статика з `dist/` + маленький Worker, що віддає відео частинами для Safari та iPhone).

Локальна перевірка разом із Worker: `npm run build && npx wrangler dev`.

## Що далі (фази)
- Фаза 3: граматика руху (GSAP) — правила вже описані в `CLAUDE.md`.
- Фаза 4: Rive «The Timeline» у `#rive-band`, Lottie-віньєтки в рядках, реальний шоуріл.
- Працюй через Claude Code у цій папці — він читає `CLAUDE.md` автоматично.
