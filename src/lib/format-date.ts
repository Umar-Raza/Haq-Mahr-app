import type { Locale } from "@/i18n/config";

/** Formats an ISO date (YYYY-MM-DD) as a long date, independent of the server's time zone. */
export function formatIsoDate(locale: Locale, isoDate: string): string {
  return new Intl.DateTimeFormat(`${locale}-u-nu-latn`, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
