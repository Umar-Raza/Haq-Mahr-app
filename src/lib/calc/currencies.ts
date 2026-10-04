// Display/rounding only. The app never converts between currencies.
export const currencies = [
  "PKR",
  "INR",
  "BDT",
  "SAR",
  "AED",
  "QAR",
  "KWD",
  "BHD",
  "OMR",
  "USD",
  "GBP",
  "EUR",
  "CAD",
  "AUD",
  "MYR",
  "TRY",
  "EGP",
  "ZAR",
] as const;

export type Currency = (typeof currencies)[number];

export function isCurrency(value: string): value is Currency {
  return (currencies as readonly string[]).includes(value);
}

/** ISO 4217 minor units as reported by Intl (e.g. PKR 2, KWD 3). */
export function currencyFractionDigits(currency: Currency): number {
  return (
    new Intl.NumberFormat("en", {
      style: "currency",
      currency,
    }).resolvedOptions().maximumFractionDigits ?? 2
  );
}
