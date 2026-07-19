# tolimotion.com

Портфоліо Toli. Astro, статика, деплой на Vercel.

## Швидкий старт
```bash
npm install
npm run dev        # http://localhost:4321
```

## Задеплоїти вперше
1. Створи порожній репозиторій на GitHub (наприклад `tolimotion`).
2. У цій папці:
   ```bash
   git init
   git add -A
   git commit -m "v0.1 — static skeleton"
   git branch -M main
   git remote add origin git@github.com:ТВІЙ_ЛОГІН/tolimotion.git
   git push -u origin main
   ```
3. vercel.com → Add New → Project → імпортуй репозиторій → Deploy (нічого не міняй, Astro визначиться сам).
4. Project → Settings → Domains → додай `tolimotion.com` → Vercel покаже DNS-записи → внеси їх у Porkbun (DNS → додати записи A / CNAME, які покаже Vercel).

Далі кожен `git push` — автодеплой.

## Що далі (фази)
- Фаза 3: граматика руху (GSAP) — правила вже описані в `CLAUDE.md`.
- Фаза 4: Rive «The Timeline» у `#rive-band`, Lottie-віньєтки в рядках, реальний шоуріл.
- Працюй через Claude Code у цій папці — він читає `CLAUDE.md` автоматично.
