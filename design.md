# Haq mahr Finder — Design System and UI/UX Specification

## 1. Design direction

Create a premium, calm, trustworthy Islamic financial utility website. It should look like a modern web product—not a mobile-app mockup, not a banking app clone, and not a promotional poster.

**Visual reference status:** No reference image was attached in this request. Use the palette below as the initial direction; if the user supplies a reference image later, extract and reconcile its colors rather than guessing.

## 2. Color system

Use a deep emerald + warm ivory + muted gold palette. Keep the experience restrained and readable.

### Light theme
- Primary: `#176B55` (emerald)
- Primary hover: `#115542`
- Accent: `#C6A15B` (muted gold)
- Background: `#F7F8F5` (soft ivory)
- Surface: `#FFFFFF`
- Surface subtle: `#EEF2EE`
- Text: `#17231F`
- Muted text: `#65736C`
- Border: `#DCE4DE`
- Success: `#237A55`
- Warning: `#A66B16`
- Error: `#B54747`

### Dark theme
- Background: `#101A17`
- Surface: `#17231F`
- Surface elevated: `#20302A`
- Primary: `#65B99A`
- Accent: `#D7B875`
- Text: `#F1F5F2`
- Muted text: `#A9B8AF`
- Border: `#304239`
- Error: `#F18A82`

Use DaisyUI theme variables/custom themes rather than scattering raw hex values throughout components. Check contrast for all text and controls.

## 3. Typography

- English: Geist or a similar highly legible sans-serif.
- Urdu/Arabic: a web-safe Arabic-script font such as Noto Sans Arabic or Noto Naskh Arabic, with a suitable fallback.
- Use `lang` and `dir` correctly at the document/page level.
- Avoid mixing Latin punctuation awkwardly inside RTL strings.
- Numerals should be consistent and readable; use locale-aware formatting while keeping units unambiguous.

## 4. Layout

- Website layout with header, content area, and footer.
- Centered max-width content container.
- Desktop: calculator form and result can sit in a balanced two-column layout.
- Tablet: reduce gaps and stack when needed.
- Mobile: single-column, full-width controls, comfortable tap targets.
- Keep the primary calculator visible early on the page.
- Use generous whitespace, subtle borders, and restrained shadows.
- Avoid excessive gradients, glassmorphism, decorative clutter, or oversized hero art.

## 5. Header and navigation

- Brand wordmark: Haq mahr Finder.
- Main links: Calculator, Guides, Silver Rate Sources, About.
- Language selector: a single dropdown toggle in the header on every screen size (globe icon; the current language name is shown from `sm` up), listing English / اردو / العربية.
- Use DaisyUI components for interactive controls (`btn`, `menu`, `dropdown`, `swap`) so they keep DaisyUI's hover and press feedback; theme `--depth` is 1.
- Theme toggle with accessible label.
- Mobile menu must be keyboard-operable and close after navigation.
- Header should not consume excessive vertical space on mobile.

## 6. Calculator UI

Fields:
- Silver rate amount.
- Rate basis selector (per Tola / per Gram).
- Currency selector.
- Optional display unit selector for result.
- Clear/reset action.

Behavior:
- Labels remain visible; do not rely only on placeholders.
- Show validation inline and accessibly.
- Explain rate basis beside the field.
- Result panel clearly labels the selected currency.
- Show formula, reference weight, and rounding note.
- No fake loading animation for local calculations.

## 7. Receipt output

One premium template:
- White or theme-independent paper surface.
- Emerald header/detail accents and subtle muted-gold divider.
- Clear hierarchy for final amount.
- Rate, weight, currency, method, timestamp, and informational disclaimer.
- Brand mark/text without implying a bank or official certificate.
- Localized layout with RTL support.
- Ensure PNG output has adequate padding and crisp text.
- Receipt should not include user-entered personal data because none is required.

## 8. Silver Rate Sources page

- Page title and concise explanation.
- Country sections with clear headings.
- Provider cards or a simple accessible list; avoid clutter.
- Each item: provider name, country, neutral description, external-link action, last-reviewed date.
- Add a note to confirm rate unit, purity, location, and update time on the destination site.
- Do not display unverified live prices.
- Do not use logos unless permitted and available from a legitimate source.

## 9. Guides and informational pages

- Readable article width.
- Table of contents for longer guides.
- Clear H1, H2, H3 hierarchy.
- “Related guides” section.
- Source references for religious or calculation claims.
- Avoid fake author credentials or unsupported claims.
- Provide language equivalents where translations are reviewed.

## 10. Skeleton loading

Use skeletons only for asynchronous content:
- Deferred source-directory data, if fetched.
- Lazy-loaded noncritical cards.
- Future remote modules.

Do not skeletonize static headings, static guide content, local calculations, theme changes, or language changes.

Skeleton rules:
- Match final component dimensions to prevent layout shift.
- Use subtle shimmer/pulse; disable or reduce motion under `prefers-reduced-motion`.
- Provide accessible loading status where meaningful.
- Keep skeleton contrast subtle in both themes.
- Prefer DaisyUI-compatible utility classes or a reusable `Skeleton` component.

## 11. Accessibility

- Semantic landmarks and heading order.
- Visible focus indicators.
- Keyboard-accessible controls and menus.
- Associated form labels and error descriptions.
- Adequate contrast in both themes.
- Do not communicate status by color alone.
- Respect reduced motion.
- Test RTL focus order and icon placement.

## 12. Ad placement design

Reserve stable dimensions for ad containers to reduce layout shift. Ads must be visually distinct from controls and never placed so close to calculator buttons that users may misclick. Do not add intrusive sticky ads or interstitials in MVP.

## 13. Responsive QA

Check at minimum:
- 360px mobile
- 390px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Test all three locales and both themes at representative widths.
