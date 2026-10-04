import { iso4217MinorUnits } from "./iso4217";

// Display/rounding only. The app never converts between currencies.
// Minor units come from the ISO table, not Intl: engines disagree (Chrome reports PKR as 0, Node as 2).
export type Currency = keyof typeof iso4217MinorUnits;

export const currencies = Object.keys(iso4217MinorUnits) as Currency[];

/** Shown first in the currency picker. */
export const commonCurrencies = [
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
] as const satisfies readonly Currency[];

export function isCurrency(value: string): value is Currency {
  return Object.hasOwn(iso4217MinorUnits, value);
}

export function currencyFractionDigits(currency: Currency): number {
  return iso4217MinorUnits[currency];
}
