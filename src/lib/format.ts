import type { Locale } from "@/i18n/config";

// Latin digits in every locale keep amounts unambiguous (see decision.md).
const tag = (locale: Locale) => `${locale}-u-nu-latn`;

/** Formats an already-rounded decimal string as money without re-rounding. */
export function formatMoney(
  locale: Locale,
  currency: string,
  amount: string,
  fractionDigits: number,
): string {
  return new Intl.NumberFormat(tag(locale), {
    style: "currency",
    currency,
    currencyDisplay: "code",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount as `${number}`);
}

/** Groups digits but keeps every fractional digit of an exact decimal string. */
export function formatDecimal(locale: Locale, value: string): string {
  return new Intl.NumberFormat(tag(locale), {
    maximumFractionDigits: 20,
  }).format(value as `${number}`);
}

export function formatDateTime(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(tag(locale), {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
