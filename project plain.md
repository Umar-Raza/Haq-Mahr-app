 # Haq mahr Finder — Product Plan

## 1. Product overview

Haq mahr Finder is a responsive, multilingual website that helps visitors estimate the value of a specified Haq mahr silver-weight reference using a manually entered silver rate. It can present the calculation as a polished receipt-style image and let visitors download, share, or copy it.

The website also provides static educational guides and a curated directory of silver-rate websites by country. The business objective is to build useful organic-search traffic and, subject to policy compliance and approval, monetize through Google AdSense.

## 2. Goals

- Make the calculation easy to understand and use.
- Provide clear input units, currency labels, formula, and rounding behavior.
- Produce a professional receipt output in English, Urdu, and Arabic.
- Work well on mobile, tablet, and desktop browsers.
- Support light and dark themes.
- Publish helpful static guides with sound sources.
- Make country-specific silver-rate resources easy to find.
- Build a technically sound foundation for SEO and discoverability.
- Keep MVP hosting and maintenance costs low.

## 3. Target users

- People researching Haq mahr calculations.
- Visitors who need to convert silver weight units.
- Urdu-, Arabic-, and English-speaking users.
- Visitors looking for silver-rate provider websites in their country.
- Users who want to save or share a calculation result.

## 4. Main user journey

1. Visitor opens the calculator.
2. Selects rate currency and rate basis (per Tola or Gram).
3. Enters the manually observed silver rate.
4. Reviews the reference weight and calculation explanation.
5. Sees the estimated result and detailed breakdown.
6. Generates/downloads a receipt image or uses available share actions.
7. Optionally saves the result in local browser history.
8. Reads a related guide or opens the silver-rate sources directory.

## 5. Sitemap

- `/{locale}` — Home / calculator
- `/{locale}/guides` — Guide index
- `/{locale}/guides/{slug}` — Static guide
- `/{locale}/silver-rate-sources` — Country-grouped silver-rate links
- `/{locale}/about`
- `/{locale}/disclaimer`
- `/{locale}/privacy-policy`
- `/{locale}/terms`
- `/{locale}/contact`

Supported locales: `en`, `ur`, `ar`.

## 6. Silver-rate sources page

Purpose: provide a useful directory of external websites where visitors can check silver rates for selected countries.

Each country section may contain:
- Country name.
- Provider/site name.
- Short neutral description.
- Verified external URL.
- Last-reviewed date.

Requirements:
- Curate links manually; do not fabricate providers.
- Do not scrape or display external prices in MVP.
- Do not imply endorsement or guarantee of accuracy.
- Tell users to verify rate unit, purity, market, and timestamp.
- Keep external links maintained and remove broken links.
- Use accessible link text and safe external-link attributes.

## 7. Calculation and trust

The initial calculation reference is 10 Dirhams, described in the project brief as 2 Tola 7.5 Masha. Before release, verify the conversion convention and gram equivalent with reliable references. Explain that local conventions or scholarly interpretations may differ. The tool is informational and is not a religious ruling, legal advice, or a substitute for consulting a qualified scholar.

## 8. Functional requirements

### Calculator
- Manual silver rate input.
- Rate basis: per Tola or per Gram.
- Weight units: Tola, Masha, Gram.
- Multiple currency codes and locale-aware formatting.
- Input validation and helpful error messages.
- Formula and calculation breakdown.
- Clear/reset action.

### Receipt and sharing
- One premium receipt template.
- Localized text and correct RTL rendering.
- Download PNG.
- Web Share API when available.
- Copy formatted result.
- WhatsApp text/link sharing.
- No Print/PDF button (removed by user decision, 2026-10-04). The print stylesheet still limits browser printing to the receipt.

### History
- Local browser storage only.
- Reopen, delete one, clear all.
- No login, account, or server database.
- Explain storage limitations.

### Theme and language
- Light/dark toggle.
- English, Urdu, Arabic.
- LTR/RTL direction.
- Persistent theme preference.
- Language-specific metadata and routes.

### Loading experience
- Use skeleton loading for asynchronous content only.
- Static pages and instant calculations should render directly.
- Avoid layout shift and respect reduced-motion settings.

## 9. Nonfunctional requirements

- Responsive and accessible.
- Fast initial rendering.
- Semantic HTML and keyboard usability.
- Secure external links.
- No silent currency conversion.
- No unnecessary personal data collection.
- Clear privacy and disclaimer pages.
- Testable calculation engine.
- Search-engine crawlable static content.

## 10. Monetization

Prepare ad-slot components and reserved layout space, but activate AdSense only after the site is ready and approved. Ads must not obstruct the calculator, mimic controls, or encourage accidental clicks. Ad approval, traffic, ranking, and revenue are not guaranteed.

## 11. Success measures

- Calculation completion rate.
- Receipt download/share action rate.
- Guide engagement and internal navigation.
- Search impressions and clicks by locale.
- Core Web Vitals and accessibility quality.
- Broken-link rate on the silver-rate directory.
- Ad policy compliance after monetization.
