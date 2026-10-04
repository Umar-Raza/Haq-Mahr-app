# CLAUDE.md — Haq Mahr Finder

@AGENTS.md

## Project mission

Build Haq Mahr Finder as a polished, responsive, multilingual website for informational Haq Mahr calculations, receipt-style result generation, sharing, static guides, and a curated silver-rate sources directory.

Read these files before implementation:
1. `decision.md`
2. `project plain.md`
3. `design.md`
4. `operation.md`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- DaisyUI
- Static content for guides
- Local storage for calculation history
- Vercel-compatible deployment

Do not add a database, authentication, CMS, live silver API, or FX API unless the user explicitly changes scope.

## Product constraints

- This is a website, not a native mobile app.
- Supported locales: English (`en`), Urdu (`ur`), Arabic (`ar`).
- Urdu and Arabic are RTL; English is LTR.
- Support light and dark themes.
- One premium receipt template only in MVP.
- Silver rate is manually entered.
- Never silently convert between currencies.
- Local history must not require an account.
- Guides are static, not a dynamic blog.
- Include About, Disclaimer, Privacy Policy, Terms, Contact, and Silver Rate Sources pages.
- Use skeleton loading only for asynchronous content, not instant calculations or static content.

## Coding rules

- Use strict TypeScript; avoid `any`.
- Keep calculation and conversion functions pure and separate from React components.
- Use decimal-safe arithmetic for currency/weight operations; document rounding.
- Validate all user inputs, including empty, negative, zero, non-finite, and extreme values.
- Keep components small and reusable.
- Prefer server components; use client components only for interactive behavior.
- Use semantic HTML, accessible labels, keyboard support, and visible focus states.
- Avoid unnecessary dependencies.
- Do not use placeholder links, fake provider names, fabricated citations, or made-up source update frequencies.
- External links opened in a new tab must use `rel="noopener noreferrer"`.
- Keep ad slots reserved but do not claim AdSense approval or earnings.
- Do not expose secrets or require environment variables for MVP features that can run client-side.

## Calculation integrity

The stated basis is 10 Dirhams / 2 Tola 7.5 Masha. Before implementing final production constants:
1. Verify the exact weight conversion and convention against reliable references.
2. Record source and date in project documentation.
3. Explain methodology in UI.
4. Add tests for conversion and rounding.
5. Present results as informational, not a fatwa or legal ruling.

Do not invent religious interpretations or claim universal agreement where differences may exist.

## Localization rules

- Do not hardcode user-facing strings in components.
- Use locale dictionaries/content.
- Add correct `lang` and `dir`.
- Use locale-aware number/currency formatting.
- Test punctuation, mixed-script values, receipt layout, and form alignment in RTL.
- Do not machine-translate religious content without review.

## SEO rules

- Unique title and description per localized page.
- Correct canonical and reciprocal hreflang for available translations.
- Sitemap and robots.
- Use structured data only when it accurately describes visible content.
- Keep static guides crawlable.
- Do not promise ranking, GEO visibility, or AdSense approval.
- Avoid keyword stuffing and thin duplicate translations.

## Skeleton rules

- Skeleton only while genuinely waiting for async data.
- Match final layout dimensions to prevent CLS.
- Respect reduced motion.
- Provide accessible loading status when needed.
- Never show a fake loading state for local calculation.

## Required checks

Before declaring a phase complete, run:
- lint
- typecheck
- relevant unit tests
- production build

Also manually check:
- English LTR, Urdu RTL, Arabic RTL
- light and dark themes
- mobile and desktop layouts
- receipt PNG, native-share fallback, WhatsApp, copy, print
- local history persistence and clearing
- Silver Rate Sources links
- metadata, canonical, hreflang, sitemap, robots

## Work style

- Implement only the current requested phase.
- Summarize changed files and decisions.
- Report tests actually run and their outcomes.
- Do not claim completion for checks that were not executed.
- If requirements conflict, follow `decision.md` and ask before changing scope.
