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

| Script                   | Purpose                                                         |
| ------------------------ | --------------------------------------------------------------- |
| `npm run dev`            | Start the development server                                    |
| `npm run build`          | Production build                                                |
| `npm run start`          | Serve the production build                                      |
| `npm run lint`           | ESLint                                                          |
| `npm run typecheck`      | Generate route types, then `tsc --noEmit`                       |
| `npm run test`           | Unit tests (Vitest)                                             |
| `npm run format`         | Format with Prettier                                            |
| `npm run format:check`   | Check formatting                                                |
| `npm run check`          | lint + typecheck + test + build (run before PRs)                |
| `npm run gen:currencies` | Regenerate the ISO 4217 currency table from SIX Group (network) |
| `npm run check:links`    | Check that every Silver Rate Sources link still responds (network) |

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
  components/
    layout/          Header, footer, container, nav, language switcher, mobile menu, theme toggle
    ui/              Shared UI primitives (skeleton)
  components/calculator/
    calculator.tsx   Calculator form and live result (client)
    currency-picker.tsx  Searchable currency combobox (client)
    receipt.tsx      Receipt template (always light "paper")
    receipt-actions.tsx  Download (PNG), share, WhatsApp, copy, save to history (client)
    copy-menu.tsx    Copy dropdown: formatted or short text (client)
    reopenable-calculator.tsx  Applies "Open in calculator" URL params (inside Suspense)
  components/history/
    history-list.tsx Saved calculations: reopen, delete with undo, clear all (client)
  components/qazi/
    booking-form.tsx   Online Qazi booking form: builds a WhatsApp message (client)
    country-picker.tsx Searchable country combobox, modelled on currency-picker (client)
    qazi-cta.tsx       Home-page banner linking to /online-qazi
  lib/qazi/
    countries.ts       ISO 3166-1 codes, common-country shortlist, ITU-T calling codes (tested)
    country-search.ts  Search/filter for the country combobox (tested)
    booking.ts         Validation + WhatsApp message builder, pure (tested)
  content/
    guides/          Static multilingual guides + registry (sources, related, religious flag)
    pages/           About, Disclaimer, Privacy Policy, Terms, Contact content
    silver-sources.ts  Curated silver-rate links by country (kind, currency, units, reviewed date)
    site.ts          CONTACT_EMAIL / CONTACT_WHATSAPP / QAZI_WHATSAPP (null hides Contact and Online Qazi) and info-page revision date
  components/content/
    content-blocks.tsx  Renders typed content blocks; breadcrumbs.tsx; info-page.tsx (shared route)
  lib/
    calc/            Pure calculation engine (decimal math, units, input parsing, currencies, sources; tested)
    receipt/         Receipt model, share text, and canvas PNG renderer
    history/         Versioned local-storage schema (pure, tested) and browser store hook
    format.ts        Locale-aware money/number/date formatting (Latin digits)
    routes.ts        Nav items and locale-aware path helpers (tested)
    theme.ts         Theme names, storage key, pre-paint init script (tested)
  proxy.ts           Redirects unprefixed URLs to a locale (Next.js 16 "proxy", formerly middleware)
```

## Localization

- Locales: `en` (LTR), `ur` (RTL), `ar` (RTL). Unknown locale segments return 404.
- All user-facing strings live in `src/i18n/dictionaries/`. `ur` and `ar` are type-checked against `en`, so a missing key fails `typecheck`.
- Urdu and Arabic text should be reviewed by a native speaker before release, especially religious content.

## Deployment

Standard Next.js deployment; compatible with Vercel with no extra configuration.
