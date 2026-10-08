# Haq mahr Finder — Decision Log

**Status:** Baseline decisions for MVP  
**Purpose:** Record agreed product and technical decisions. Change this file when a decision is intentionally revised.

## Product decisions

| Area | Decision |
|---|---|
| Product | Haq mahr Finder |
| Product type | Responsive website, not a mobile app |
| Main purpose | Haq mahr calculation, receipt-style result image, sharing, educational guides, organic search growth |
| Languages | English, Urdu, Arabic |
| Direction | English LTR; Urdu and Arabic RTL |
| Themes | Light and dark, user-toggleable and preference persisted locally |
| Calculation basis | 10 Dirhams reference, expressed as 2 Tola 7.5 Masha; verify authoritative weight convention before release |
| Silver rate | Manual input; no live-rate API in MVP |
| Currency | Multiple currencies supported for input/display; no silent FX conversion |
| Receipt | One premium template with localized text |
| Sharing | PNG download, Web Share where supported, copy result, WhatsApp text/link share. Print/PDF button removed by the user on 2026-10-04; the print stylesheet stays, so Ctrl+P prints only the receipt. |
| Result before input | A preview receipt (known reference weight, method and disclaimer; "—" for rate-dependent values; actions disabled) instead of an empty box. User-approved 2026-10-04. |
| History | Local browser storage only; no account. Saved only by an explicit "Save to history" button (no auto-save). Max 50 entries, versioned schema, page `/[locale]/history` (noindex). Reopen uses URL params. Delete has undo; Clear all asks for confirmation. (2026-10-04) |
| Guides | Static, multilingual; no dynamic blog |
| Additional pages | About, Disclaimer, Privacy Policy, Terms, Contact, Silver Rate Sources. About shows no owner name ("independent project"), per the user on 2026-10-04. Contact shows an email and a WhatsApp number the user will provide (2026-10-08); until at least one is set in `src/content/site.ts` the page is not published (no placeholder). Online Qazi (`/online-qazi`, scope added by the user 2026-10-08): the owner's own team takes Qazi bookings. A short form builds a WhatsApp message to `QAZI_WHATSAPP`; nothing is sent to a server. The page, nav and footer links, and the home CTA are hidden until that number is set. The page names no Qazi, fee or availability, and gives no ruling on how a nikah may be done online; those questions go to the Qazi. Name chosen for SEO: "Online Qazi" (ur آن لائن قاضی, ar المأذون الشرعي), CTA "Book a Qazi". Country/city (revised 2026-10-08, user request): the form's city field is split into a complete ISO-3166-1 country dropdown (`lib/qazi/countries.ts`, names localized via `Intl.DisplayNames`) and a free-text city field with curated-city suggestions (an HTML datalist) for ~40 countries; the city list is not exhaustive by design, since a full worldwide city database is out of scope (no DB/API per CLAUDE.md). Fields (revised again same day, user request): Husband's name and Bride's name (both required), Country (required, searchable combobox, `country-picker.tsx`), Preferred date (required), Preferred time (optional), Email (required), the visitor's own WhatsApp number (optional: a country-code select defaulting to Pakistan +92, `callingCodes` in `lib/qazi/countries.ts`, plus a local-number field), and a note (optional). City and the language-of-the-nikah field were both removed; so was the city-suggestions dataset. |
| Guides (MVP set) | 4 guides chosen by the user on 2026-10-04: how to use the calculator; Tola, Masha and Gram; minimum Haq Mahr (10 Dirhams); checking a silver rate. The religious guide cites only verified sources and shows "not yet reviewed by a qualified scholar" until a review happens. |
| Backend | None in MVP |
| Monetization | AdSense-ready placements; integrate only after policy review/approval |
| Deployment | Vercel-compatible Next.js deployment |

## Technical decisions

- Next.js App Router + TypeScript.
- Tailwind CSS + DaisyUI.
- Separate calculation/conversion logic from UI components.
- Use decimal-safe arithmetic for money and weight conversions; avoid floating-point rounding drift.
- Store calculation inputs, calculation version, result, currency, and timestamp in local storage. Do not store names or personal details.
- Static guide pages should be indexable and have unique localized metadata.
- Use localized routes, e.g. `/en`, `/ur`, `/ar`, with reciprocal `hreflang` where translations exist.
- Silver-rate source directory is a curated outbound-link directory, not a rate scraper or endorsement list.
- Use skeleton loading only for genuinely asynchronous content. Do not show skeletons for instant client-side calculations or static content.
- Respect reduced-motion preferences and avoid layout shifts.

## Calculation integrity

Update 2026-10-04: the "How the calculation works" box was removed from the home page at the user's request. The methodology now appears on the receipt and in the guides and Disclaimer.

1. Confirm the exact gram equivalent and convention for 10 Dirhams / 2 Tola 7.5 Masha with a reliable scholarly or institutional source before publishing.
2. State the convention and formula visibly on the calculator and in the guide.
3. Keep calculation logic unit-tested.
4. Clearly label outputs as informational, not a fatwa or legal determination.
5. Do not imply that the selected silver rate is live or independently verified.

## Calculation reference (adopted 2026-10-04)

| Item | Value |
|---|---|
| Reference | 10 Dirhams, expressed as 2 Tola 7.5 Masha = 31.5 Masha = 2.625 Tola |
| Reference in grams | **30.618 g**, confirmed by the user on 2026-10-04 as the figure to use for everyone |
| Tola | 11.664 g (= 30.618 ÷ 2.625); 1 Tola = 12 Masha; 1 Masha = 0.972 g |
| Formula | per Tola: rate × 2.625; per Gram: rate × 30.618 (the two always agree: 1 Tola = 11.664 g) |
| Rounding | Rate used exactly (max 4 decimals, max 1,000,000,000). Only the final amount is rounded, **always up (ceiling)**, so the estimate never falls below the exact value (user decision, 2026-10-04; e.g. 7.6541 → 7.66). The receipt shows the exact equation and no rounding note. Rounding is to the currency's ISO 4217 minor units from a fixed table in `currencies.ts` (e.g. PKR 2, KWD/BHD/OMR 3). `Intl` is not used for this, because Chrome reports PKR as 0 while Node reports 2. |
| Arithmetic | BigInt fixed-point (`src/lib/calc/decimal.ts`); no floating point |
| Currencies | All 155 active ISO 4217 currencies (user request, 2026-10-04), generated from the official SIX Group List One (published 2026-09-17) into `src/lib/calc/iso4217.ts` with minor units. Fund codes, metals, SDR and test codes are excluded. Regenerate with `npm run gen:currencies`. The picker shows "Common" first (PKR, INR, BDT, SAR, AED, QAR, KWD, BHD, OMR, USD, GBP, EUR, CAD, AUD, MYR, TRY, EGP, ZAR), then all others sorted by localized name. Label and rounding only; never converted. The Silver Rate Sources countries are a separate, later decision. |
| Calculation version | `"1"` (`CALCULATION_VERSION`); bump if constants, formula or rounding change |

Note: the modern standard tola is 11.6638038 g (180 grains), which would give 30.6175 g. The project deliberately uses the 11.664 g tola behind the widely cited 30.618 g, per the user's decision. Do not switch back without the user's approval.

Sources (each opened and checked 2026-10-04):

- 1 tola = 12 masha; the standard tola is 180 grains = 11.6638038 g: [Wikipedia, "Tola (unit)"](https://en.wikipedia.org/wiki/Tola_(unit)).
- Minimum mahr = 30.618 g silver (Hanafi): Mufti Ebrahim Salejee, [MuftiOnline via IslamQA.org](https://islamqa.org/hanafi/muftionline/130564/minimum-mahar-in-pounds-explained/).
- Minimum mahr = 10 dirhams; 1 dirham ≈ 2.97–3.1 g, so ≈ 29.7–31 g: [Darul Ifta Birmingham, Fatwa 03336 (3 March 2020)](https://daruliftabirmingham.co.uk/what-is-the-minimum-quantity-of-mehar-in-gram-for-muslim-marriage/).
- Minimum mahr = 2 tola 7.5 masha silver or its value: Maulana Dr. Abdul Razzaq Iskander, [Daily Jang, Iqra, 18 May 2018](https://jang.com.pk/news/494011).

Known variance: published gram figures for 10 Dirhams differ (about 29.7–31 g in the sources above; other figures exist). The UI states this and recommends consulting a qualified scholar. Urdu and Arabic methodology text needs review by a qualified reviewer before release.

Numerals: all numbers, amounts and dates use Latin digits (`-u-nu-latn`) in every locale for unambiguous values. This is the default; the user has not yet confirmed it. Money shows the ISO currency code (e.g. "PKR 6,429.78"), not a symbol.

Default selected currency (a label only, never a conversion): **PKR in every locale** (user decision, 2026-10-04; previously `ar` → SAR).

Currency picker: a searchable WAI-ARIA combobox instead of a native `<select>` (user request, 2026-10-04). It searches the code, the localized name and the English name. Common currencies are listed first.

Receipt actions: a 2×2 grid with icons. Status messages appear as a floating DaisyUI toast, so no layout space is reserved (user request, 2026-10-04).

Receipt (revised 2026-10-08, user request): rows are Silver rate, Reference weight and Date only (Calculation and Method removed). Title is just "Haq Mahr" and the amount label is "Amount" (owner copy pass, 2026-10-08: no "estimate" wording in UI labels; the disclaimer still says the result is informational). Footer shows the domain haq-mahr-finder.app (`SITE_DOMAIN`). The displayed rate keeps every decimal the user entered. Download button reads "Download" (no "PNG"). Copy offers Formatted (multi-line) and Short (one line); both end with https://haq-mahr-finder.app. Share and WhatsApp use the formatted text.

Fonts (user choice, 2026-10-04): Latin = Geist, Arabic = Noto Sans Arabic, Urdu = Vazirmatn, all via next/font/google. Switching language fades the page out and in (not for reduced motion).

Urdu wording (user, 2026-10-04): common English terms are used in the Urdu text but written in Urdu script, not Latin (for example کیلکولیٹر, لنک, ویب سائٹ, لاسٹ اپ ڈیٹ, ہسٹری, ڈاؤن لوڈ, شیئر, کاپی). Ordinary Urdu words are kept. The Arabic locale is unchanged.

## Silver-rate directory decisions

- Adopted 2026-10-04 (user: at least 10 countries, including Pakistan, India, USA, UK, Canada, Saudi Arabia and UAE). 12 countries are listed in `src/content/silver-sources.ts`.
- Each listing is labelled by kind: local market, official benchmark, bullion dealer, or spot converter. Spot converters are marked "not a local market rate", because converted international spot prices can differ from local market rates such as the Pakistani Sarafa per-tola rate.
- Only links that were opened and showed a silver price are listed. Unverifiable sites (for example BAJUS behind a bot challenge) are left out rather than guessed.

- Add a page such as `/[locale]/silver-rate-sources`.
- Group links by country/region.
- Each listing should include provider/site name, country, short neutral description, outbound link, and “last reviewed” date maintained by the project.
- Prefer official bullion associations, recognized market sources, or established providers.
- Never fabricate URLs, prices, country coverage, or update frequency.
- Add a note that external sites may change rates, availability, and methodology; users should verify rates before entering them.
- Add `rel="noopener noreferrer"` to external links opened in a new tab.
- Review links periodically and remove broken or misleading entries.

## Explicitly out of scope for MVP

- User accounts or admin dashboard.
- Database or server-side calculation API.
- Automatic live silver prices or foreign-exchange conversion.
- Dynamic blog/CMS.
- Multiple receipt themes.
- Religious rulings generated by AI.
- Claims of guaranteed AdSense approval, traffic, rankings, or GEO visibility.
