export const locales = ["en", "ur", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export type Direction = "ltr" | "rtl";

export const localeDirection: Record<Locale, Direction> = {
  en: "ltr",
  ur: "rtl",
  ar: "rtl",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
