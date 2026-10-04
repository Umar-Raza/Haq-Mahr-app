# Haq mahr Finder — Operating Guide

## How to use this project plan

1. Read `decision.md` before changing scope.
2. Read `project plain.md` for product goals and user journeys.
3. Read `design.md` before building or modifying UI.
4. Follow the phases and acceptance checks in this file.
5. Update the status/checklists as work is completed.
6. Do not mark a phase complete until its acceptance criteria pass.

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
- [ ] Implement color tokens from `design.md`.
- [ ] Header, navigation, footer, mobile menu.
- [ ] Theme toggle with local preference.
- [ ] Language switcher and `dir` handling.
- [ ] Shared page container and responsive spacing.
- [ ] Accessible skeleton component.
**Done when:** all three locales render correctly in both themes at mobile and desktop widths.

### Phase 2 — Calculator engine
- [ ] Define weight and rate units.
- [ ] Verify the reference weight with sources.
- [ ] Implement conversions and decimal-safe amount calculation.
- [ ] Validate blank, zero, negative, non-finite, and excessively large inputs.
- [ ] Add unit tests and visible methodology.
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
