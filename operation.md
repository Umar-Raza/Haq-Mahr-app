# Haq mahr Finder — Operating Guide

## How to use this project plan

1. Read `decision.md` before changing scope.
2. Read `project plain.md` for product goals and user journeys.
3. Read `design.md` before building or modifying UI.
4. Follow the phases and acceptance checks in this file.
5. Update the status/checklists as work is completed.
6. Do not mark a phase complete until its acceptance criteria pass.

## Status log

Newest first. Keep each entry short.

### 2026-10-04 — Reference changed to 30.618 g (user decision)

- `units.ts`: `GRAMS_PER_TOLA` 11.664, `GRAMS_PER_MASHA` 0.972, `REFERENCE_GRAMS` = 30.618 exact, display digits 3. `CALCULATION_VERSION` stays `"1"` (pre-release; nothing stored yet).
- Methodology strings (en/ur/ar): reference uses `=` instead of `≈`; the tola line explains 11.664 g; the differences paragraph states the calculator uses 30.618 g.
- Tests updated: per gram 210 → 6429.78, half-up 76.545 → 76.55, KWD 9.1854 → 9.185, tola/gram equivalence (200/g = 2332.8/tola).
- **Checks run:** lint, typecheck, 44/44 tests, production build. Dev page shows "2.625 Tola = 30.618 g" and "Rate per Gram × 30.618".
- `decision.md` → "Calculation reference" updated.

### 2026-10-04 — Phase 2 complete

- **Current phase:** Phase 2 done; Phase 3 (calculator UI and receipt) not started.
- **Engine:** `src/lib/calc/`:
  - `decimal.ts`: BigInt fixed-point, `roundHalfUp`.
  - `units.ts`: tola, masha and reference constants, `RateBasis` tola|gram.
  - `parse-rate.ts`: input normalization and validation.
  - `currencies.ts`: 18 ISO codes, minor units via `Intl`.
  - `calculate.ts`: `calculateMahr()` returns `{ok, result|error}`; `CALCULATION_VERSION = "1"`.
  - `sources.ts`: methodology links and review date.
- **Reference and sources:** recorded in `decision.md` → "Calculation reference". 2.625 tola = 30.617484975 g, shown as 30.62 g.
- **Input rules:**
  - Accepted: Arabic-Indic and Persian digits, `٫` decimal, `٬`/`,` grouping (Western or lakh only), leading `.`, trailing `.`, leading `+`.
  - Rejected with a specific error code: empty, negative, zero, exponent/NaN/Infinity/hex, ambiguous grouping (`1,5`), more than 4 decimals, more than 1e9. Error codes: `empty | invalidFormat | negative | zero | tooManyDecimals | tooLarge | unsupportedBasis | unsupportedCurrency`.
  - Phase 3 needs localized messages for these codes.
- **Methodology UI:** `src/components/calculator/methodology.tsx` on the home page (reference, formula, units, rounding, source differences, 4 external sources with `rel="noopener noreferrer"`, disclaimer). Strings are in `dictionary.methodology`; `src/i18n/interpolate.ts` fills `{placeholders}`.
- **Checks run:** lint, typecheck, 43/43 tests (decimal, units consistency, parse-rate valid/invalid, calculate known values/rounding/currency digits/errors), production build. Screenshots of the methodology section in en and ur at 390 and 1100 px. Confirmed 4 external links with `rel="noopener noreferrer"` in `/ar` HTML.
- **Open items:** Urdu/Arabic methodology text needs scholarly/native review. User should confirm the currency list and the Latin-digit choice.

### 2026-10-04 — Phase 1 revision (user request)

- **Language switcher** is now one DaisyUI `dropdown` (`<details>`) in the header on all sizes (`language-switcher.tsx`). It closes on select, Escape (focus returns to summary) and outside click. Removed from the mobile menu.
- **DaisyUI feel:** `--depth` changed 0 → 1 in both themes (it had disabled the button shadow and press effect). Nav uses DaisyUI `menu` / `menu-horizontal`, with the active item from `aria-current` and the menu active colour overridden to primary. Theme toggle is a `<label class="btn">` + `sr-only` checkbox + `swap swap-rotate` icon. It is not a button with `aria-pressed`, because DaisyUI suppresses the press effect on `[aria-pressed=true]`.
- **Checks run:** lint, typecheck, 14/14 tests, production build. CDP browser script 34/34 passing (adds dropdown open/Escape/outside-click/switch, RTL dropdown inside viewport, menu closes on link click). Screenshots of the dropdown (ur mobile light, en desktop dark) and the mobile menu (ar dark).
- `design.md` §5 updated to match.

### 2026-10-04 — Phase 1 complete

- **Current phase:** Phase 1 done; Phase 2 (calculator engine) not started. Blocker for Phase 2: user must confirm the gram value / source for 2 Tola 7.5 Masha.
- **Theme:** DaisyUI custom themes `hmf-light` / `hmf-dark` in `src/app/globals.css` (built-in themes disabled). Extra tokens: `border-line`, `text-muted`. `dark:` variant keys off `data-theme`. Accent gold is decoration only (fails text contrast on light). Dark success/warning (`#6cc59a`, `#e0a64b`) are my picks; `design.md` does not specify them.
- **Theme persistence:** `src/lib/theme.ts` (`hmf-theme` in localStorage; falls back to OS preference). Inline `<head>` script sets `data-theme` before paint; `ThemeToggle` uses `useSyncExternalStore` and re-applies after the dev Strict Mode remount.
- **Shell:** `src/components/layout/` has `site-header`, `site-footer`, `container`, `nav-links`, `language-switcher`, `mobile-menu` (Escape closes and returns focus; closes on link click), `theme-toggle`. Skip link + `<main id="main">` live in the layout.
- **Nav:** `src/lib/routes.ts` `allNavItems[].ready`. Only ready pages render, so there are no 404 links. Flip `ready` when Guides / Silver Rate Sources / About ship.
- **Fonts:** Geist (Latin) and Noto Naskh Arabic (ur/ar). Root font-size is 106.25% for ur/ar.
- **Skeleton:** `src/components/ui/skeleton.tsx` (`Skeleton` + `LoadingRegion` with role=status). Animation is disabled under reduced motion.
- **Dev-only page:** `/[locale]/design-system` (404 in production, noindex). English-only by design.
- **Checks run:** lint, typecheck, 14/14 tests, production build. Screenshots at 360/390/768/1280 in light and dark for en/ur/ar. CDP browser script: 25/25 passing (theme toggle and persistence, OS fallback, mobile menu open/Escape/focus return, language switch from the menu, skip link, aria-current, no horizontal overflow at 360px, no console errors).
- **Not checked:** real screen reader; Safari/Firefox.

### 2026-10-04 — Phase 0 complete

- **Current phase:** Phase 0 done; Phase 1 (design system and shell) not started.
- **Stack:** Next.js 16.3.8 (Turbopack), React 19.2, Tailwind 4, DaisyUI 5, Vitest 5, Prettier 3, Node 22.
- **Next 16 notes:** `middleware` is now `src/proxy.ts`. Read `node_modules/next/dist/docs/` before using Next APIs (see `AGENTS.md`).
- **Routing:** root layout is `src/app/[locale]/layout.tsx` (sets `lang`/`dir`, `dynamicParams = false`). `proxy.ts` redirects unprefixed URLs using Accept-Language.
- **i18n:** `src/i18n/` has `config.ts` (locales, direction), `negotiate.ts` (tested), `dictionaries/{en,ur,ar}.ts` (`en` is the type source), `get-dictionary.ts` (server-only).
- **Scripts:** `lint`, `typecheck` (`next typegen && tsc`), `test`, `format`, `check` (all + build).
- **Decisions:** `@types/node` pinned to ^22 (Vitest 5 peer requirement). `<body suppressHydrationWarning>` because the ColorZilla extension injects `cz-shortcut-listen`.
- **Checks run:** lint, typecheck, 7/7 tests, production build, and curl checks of redirects, 404s, `lang`/`dir` and titles. Not yet checked in a browser at different widths or themes.
- **Open items:** Urdu/Arabic strings need native review. `npm audit` reports 5 high vulnerabilities (not addressed). Reference weight (2 Tola 7.5 Masha in grams) needs a source before Phase 2. Silver-rate source countries still to be chosen by the user.

## Development workflow

### Before coding
- Confirm Node.js and package manager versions.
- Create the Next.js App Router project with TypeScript.
- Install Tailwind CSS and DaisyUI using versions compatible with the selected Next.js/Tailwind setup.
- Add linting, formatting, and type-check scripts.
- Establish the locale route strategy and theme tokens.
- Create a small design-system page to validate colors, typography, buttons, form controls, alerts, cards, and skeletons.

### During coding
- Work one phase at a time.
- Keep calculation functions pure and independently testable.
- Prefer server components for static content; use client components only for interactions.
- Use accessible labels, keyboard navigation, visible focus states, and semantic landmarks.
- Use skeletons only while waiting for asynchronous data or deferred components.
- Keep ad slots from causing content layout shift; reserve dimensions.
- Never place ads beside controls in a way that could cause accidental clicks.
- Keep external silver-rate links curated and verified.
- Do not invent religious references, exchange rates, rate-provider URLs, or source update claims.

### Quality gates
Run the relevant checks before merging/deploying:
- TypeScript type check.
- ESLint.
- Unit tests for conversions and calculation boundaries.
- Production build.
- Manual keyboard and screen-reader-oriented review.
- English LTR, Urdu RTL, Arabic RTL checks.
- Mobile, tablet, desktop responsive checks.
- Light and dark theme checks.
- PNG generation and share fallback checks.
- Local history persistence, deletion, and corrupted-storage handling.
- Metadata, canonical, hreflang, sitemap, robots, and structured-data validation.
- External-link review for Silver Rate Sources page.

## Phased implementation

### Phase 0 — Project setup
- [x] Initialize Next.js + TypeScript + Tailwind + DaisyUI.
- [x] Add scripts for dev, build, lint, typecheck, and test.
- [x] Create `src` architecture and locale routing.
- [x] Add environment/config documentation.
**Done when:** clean install, lint/typecheck, and production build succeed.

### Phase 1 — Design system and shell
- [x] Implement color tokens from `design.md`.
- [x] Header, navigation, footer, mobile menu.
- [x] Theme toggle with local preference.
- [x] Language switcher and `dir` handling.
- [x] Shared page container and responsive spacing.
- [x] Accessible skeleton component.
**Done when:** all three locales render correctly in both themes at mobile and desktop widths.

### Phase 2 — Calculator engine
- [x] Define weight and rate units.
- [x] Verify the reference weight with sources.
- [x] Implement conversions and decimal-safe amount calculation.
- [x] Validate blank, zero, negative, non-finite, and excessively large inputs.
- [x] Add unit tests and visible methodology.
**Done when:** tests cover known values, rounding, and invalid inputs; output clearly identifies currency and rate basis.

### Phase 3 — Calculator UI and receipt
- [ ] Build localized calculator form.
- [ ] Build one premium receipt template.
- [ ] PNG download.
- [ ] Native share when supported, with graceful fallback.
- [ ] Copy result.
- [ ] WhatsApp share text/link.
- [ ] Print stylesheet and browser Save as PDF guidance.
**Done when:** receipt is legible in all languages, including RTL, and all unsupported share actions have a useful fallback.

### Phase 4 — Local history
- [ ] Versioned local-storage schema.
- [ ] Save recent calculations.
- [ ] Reopen, delete one, clear all.
- [ ] Handle unavailable/corrupted storage.
- [ ] Explain that browser clearing may remove history.
**Done when:** history works without authentication and never stores personal identity data.

### Phase 5 — Guides and informational pages
- [ ] Static guide content in English, Urdu, Arabic.
- [ ] About, Disclaimer, Privacy, Terms, Contact.
- [ ] Internal links and breadcrumbs.
- [ ] Content source/reviewer notes for religious claims.
**Done when:** pages are useful, localized, non-placeholder, and reviewed for factual accuracy.

### Phase 6 — Silver Rate Sources directory
- [ ] Create country-grouped source data.
- [ ] Verify every provider name and URL.
- [ ] Add neutral descriptions and last-reviewed dates.
- [ ] Add external-link safety attributes.
- [ ] Add user note to confirm rate unit, purity, location, and timestamp on provider site.
- [ ] Add skeleton only if source directory data is fetched asynchronously; static source lists need no skeleton.
**Done when:** all links work and no listing claims a live price or endorsement without evidence.

### Phase 7 — SEO, analytics, AdSense readiness
- [ ] Localized metadata, canonical, hreflang.
- [ ] Sitemap and robots.
- [ ] Appropriate structured data only.
- [ ] Open Graph metadata.
- [ ] Analytics events with privacy-aware configuration.
- [ ] Reserve ad-slot dimensions; do not add ads before approval.
- [ ] Review consent/privacy obligations for target regions.
**Done when:** technical SEO checks pass and no ad placement obstructs the core tool.

### Phase 8 — QA and launch
- [ ] Cross-browser and responsive checks.
- [ ] Accessibility review.
- [ ] Performance and Core Web Vitals review.
- [ ] Build and deploy to Vercel.
- [ ] Search Console and sitemap submission.
- [ ] Recheck external links and policy pages.
**Done when:** production site passes critical flows and has no known launch-blocking defects.

## Skeleton loading policy

Use skeletons for:
- Deferred guide cards or directory results loaded asynchronously.
- Lazy-loaded noncritical panels.
- Future remote content, if introduced.

Do not use skeletons for:
- Static page headings or guide text.
- Instant local calculations.
- Theme or language switching.
- Buttons while no network operation is running.

Skeletons must resemble the final component dimensions, use subtle motion, support reduced motion, and expose an accessible loading status where appropriate.
