import { describe, expect, it } from "vitest";
import { filterCountryGroups, normalizeSearch, type CountryGroup } from "./country-search";
import type { CountryCode } from "./countries";

const opt = (code: CountryCode, name: string) => ({
  code,
  name,
  search: normalizeSearch(`${code} ${name}`),
});

const groups: CountryGroup[] = [
  {
    label: "Common",
    options: [opt("PK", "Pakistan"), opt("SA", "Saudi Arabia"), opt("IN", "India")],
  },
  { label: "All", options: [opt("NP", "Nepal"), opt("IS", "Iceland")] },
];

const codes = (gs: CountryGroup[]) => gs.flatMap((g) => g.options.map((o) => o.code));

describe("filterCountryGroups", () => {
  it("returns everything for an empty query", () => {
    expect(filterCountryGroups(groups, "  ")).toBe(groups);
  });

  it("matches the code case-insensitively", () => {
    expect(codes(filterCountryGroups(groups, "sa"))).toEqual(["SA"]);
  });

  it("matches the name", () => {
    expect(codes(filterCountryGroups(groups, "pak"))).toEqual(["PK"]);
  });

  it("requires every word and drops empty groups", () => {
    const result = filterCountryGroups(groups, "saudi arabia");
    expect(codes(result)).toEqual(["SA"]);
    expect(result.map((g) => g.label)).toEqual(["Common"]);
  });

  it("lists an exact code match first", () => {
    const g: CountryGroup[] = [
      { label: "x", options: [opt("NP", "Nepal np"), opt("PK", "np")] },
    ];
    expect(codes(filterCountryGroups(g, "np"))).toEqual(["NP", "PK"]);
  });

  it("returns no groups when nothing matches", () => {
    expect(filterCountryGroups(groups, "zzz")).toEqual([]);
  });
});
