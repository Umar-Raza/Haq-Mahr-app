import type { Currency } from "@/lib/calc/currencies";

export type CurrencyOption = {
  code: Currency;
  /** Localized display name (falls back to English, then the code). */
  name: string;
  /** Normalized haystack: code + localized name + English name. */
  search: string;
};

export type CurrencyGroup = { label: string; options: CurrencyOption[] };

/** Case-, accent- and width-insensitive form used for both haystack and query. */
export function normalizeSearch(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("en")
    .replace(/\s+/g, " ")
    .trim();
}

/** Keeps groups whose options contain every query word; an exact code match is listed first. */
export function filterCurrencyGroups(
  groups: CurrencyGroup[],
  query: string,
): CurrencyGroup[] {
  const q = normalizeSearch(query);
  if (!q) return groups;
  const words = q.split(" ");
  return groups
    .map((group) => {
      const matches = group.options.filter((o) =>
        words.every((w) => o.search.includes(w)),
      );
      const exact = matches.filter((o) => o.code.toLowerCase() === q);
      const rest = matches.filter((o) => o.code.toLowerCase() !== q);
      return { ...group, options: [...exact, ...rest] };
    })
    .filter((group) => group.options.length > 0);
}
