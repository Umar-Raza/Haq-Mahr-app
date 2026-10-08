import { normalizeSearch } from "@/lib/currency-search";
import type { CountryCode } from "./countries";

export type CountryOption = {
  code: CountryCode;
  /** Localized display name. */
  name: string;
  /** Normalized haystack: code + localized name. */
  search: string;
};

export type CountryGroup = { label: string; options: CountryOption[] };

export { normalizeSearch };

/** Keeps groups whose options contain every query word; an exact code match is listed first. */
export function filterCountryGroups(
  groups: CountryGroup[],
  query: string,
): CountryGroup[] {
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
