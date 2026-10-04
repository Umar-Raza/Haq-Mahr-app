import { describe, expect, it } from "vitest";
import {
  filterCurrencyGroups,
  normalizeSearch,
  type CurrencyGroup,
  type CurrencyOption,
} from "./currency-search";
import type { Currency } from "./calc/currencies";

const opt = (
  code: Currency,
  name: string,
  english: string,
): CurrencyOption => ({
  code,
  name,
  search: normalizeSearch(`${code} ${name} ${english}`),
});

const groups: CurrencyGroup[] = [
  {
    label: "Common",
    options: [
      opt("PKR", "پاکستانی روپیہ", "Pakistani Rupee"),
      opt("SAR", "سعودی ریال", "Saudi Riyal"),
      opt("INR", "بھارتی روپیہ", "Indian Rupee"),
    ],
  },
  {
    label: "All",
    options: [
      opt("NPR", "نیپالی روپیہ", "Nepalese Rupee"),
      opt("ISK", "آئس لینڈک کرونا", "Icelandic Króna"),
    ],
  },
];

const codes = (gs: CurrencyGroup[]) =>
  gs.flatMap((g) => g.options.map((o) => o.code));

describe("filterCurrencyGroups", () => {
  it("returns everything for an empty query", () => {
    expect(filterCurrencyGroups(groups, "  ")).toBe(groups);
  });

  it("matches the code case-insensitively", () => {
    expect(codes(filterCurrencyGroups(groups, "sar"))).toEqual(["SAR"]);
  });

  it("matches the English name even when the label is Urdu", () => {
    expect(codes(filterCurrencyGroups(groups, "pak"))).toEqual(["PKR"]);
  });

  it("matches the localized name", () => {
    expect(codes(filterCurrencyGroups(groups, "سعودی"))).toEqual(["SAR"]);
  });

  it("requires every word and drops empty groups", () => {
    const result = filterCurrencyGroups(groups, "rupee indian");
    expect(codes(result)).toEqual(["INR"]);
    expect(result.map((g) => g.label)).toEqual(["Common"]);
  });

  it("ignores accents", () => {
    expect(codes(filterCurrencyGroups(groups, "krona"))).toEqual(["ISK"]);
  });

  it("lists an exact code match first", () => {
    const g: CurrencyGroup[] = [
      {
        label: "x",
        options: [opt("NPR", "", "Nepalese Rupee npr"), opt("PKR", "", "npr")],
      },
    ];
    expect(codes(filterCurrencyGroups(g, "pkr"))).toEqual(["PKR"]);
    expect(codes(filterCurrencyGroups(g, "npr"))).toEqual(["NPR", "PKR"]);
  });

  it("returns no groups when nothing matches", () => {
    expect(filterCurrencyGroups(groups, "zzz")).toEqual([]);
  });
});
