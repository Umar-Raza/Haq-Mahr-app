import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { isCurrency } from "@/lib/calc/currencies";
import { rateUnits, silverSources, sourceKinds } from "./silver-sources";

const all = silverSources.flatMap((country) => country.sources);

describe("silverSources", () => {
  it("covers at least 10 countries, each with a source", () => {
    expect(silverSources.length).toBeGreaterThanOrEqual(10);
    for (const country of silverSources) {
      expect(country.sources.length).toBeGreaterThan(0);
    }
  });

  it("uses valid, unique ISO region codes that Intl can name", () => {
    const regions = silverSources.map((c) => c.region);
    expect(new Set(regions).size).toBe(regions.length);
    const names = new Intl.DisplayNames(["en"], { type: "region" });
    for (const region of regions) {
      expect(region).toMatch(/^[A-Z]{2}$/);
      expect(names.of(region)).not.toBe(region);
    }
  });

  it("links only to unique https URLs", () => {
    const urls = all.map((s) => s.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) expect(new URL(url).protocol).toBe("https:");
  });

  it("has a known kind, currency, units and review date", () => {
    for (const source of all) {
      expect(sourceKinds).toContain(source.kind);
      expect(isCurrency(source.currency)).toBe(true);
      expect(source.units.length).toBeGreaterThan(0);
      for (const unit of source.units) expect(rateUnits).toContain(unit);
      expect(source.reviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("describes every source in every locale", () => {
    for (const source of all) {
      for (const locale of locales) {
        expect(source.description[locale].trim().length).toBeGreaterThan(20);
      }
    }
  });
});
