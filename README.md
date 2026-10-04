# Haq Mahr Finder

A multilingual (English, Urdu, Arabic) website for informational Haq Mahr calculations based on a manually entered silver rate.

Planning documents: [decision.md](decision.md), [project plain.md](project%20plain.md), [design.md](design.md), [operation.md](operation.md).

## Requirements

- Node.js 20.9 or newer (developed on Node 22)
- npm

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. You will be redirected to `/en`, `/ur`, or `/ar` based on your browser's language.

## Scripts

| Script                 | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Start the development server                     |
| `npm run build`        | Production build                                 |
| `npm run start`        | Serve the production build                       |
| `npm run lint`         | ESLint                                           |
| `npm run typecheck`    | Generate route types, then `tsc --noEmit`        |
| `npm run test`         | Unit tests (Vitest)                              |
| `npm run format`       | Format with Prettier                             |
| `npm run format:check` | Check formatting                                 |
| `npm run check`        | lint + typecheck + test + build (run before PRs) |

## Configuration

The MVP needs **no environment variables**. There is no database, authentication, live silver-rate API, or FX API. The silver rate is entered manually by the user.

If environment variables are added later, document them here and add a `.env.example`. Never commit `.env*` files.

## Project structure

```text
src/
  app/
    [locale]/        Localized routes; the root layout lives here and sets lang/dir
    globals.css      Tailwind + DaisyUI
  i18n/
    config.ts        Supported locales, default locale, text direction
    negotiate.ts     Accept-Language and pathname locale detection (pure, tested)
    dictionaries/    User-facing strings per locale (en is the source type)
    get-dictionary.ts Server-only dictionary lookup
  proxy.ts           Redirects unprefixed URLs to a locale (Next.js 16 "proxy", formerly middleware)
```

## Localization

- Locales: `en` (LTR), `ur` (RTL), `ar` (RTL). Unknown locale segments return 404.
- All user-facing strings live in `src/i18n/dictionaries/`. `ur` and `ar` are type-checked against `en`, so a missing key fails `typecheck`.
- Urdu and Arabic text should be reviewed by a native speaker before release, especially religious content.

## Deployment

Standard Next.js deployment; compatible with Vercel with no extra configuration.
