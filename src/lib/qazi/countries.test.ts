import { describe, expect, it } from "vitest";
import { callingCodes, commonCountryCodes, countryCodes } from "./countries";

describe("countryCodes", () => {
  it("has no duplicates", () => {
    expect(new Set(countryCodes).size).toBe(countryCodes.length);
  });

  it("every code resolves to a real name via Intl.DisplayNames", () => {
    const names = new Intl.DisplayNames(["en"], { type: "region" });
    for (const code of countryCodes) {
      const name = names.of(code);
      expect(name, code).toBeTruthy();
      expect(name, code).not.toBe(code);
    }
  });

  it("includes every common country", () => {
    const set = new Set(countryCodes);
    for (const code of commonCountryCodes) expect(set).toContain(code);
  });
});

describe("callingCodes", () => {
  it("has exactly one entry per country code, each a + followed by digits", () => {
    const keys = Object.keys(callingCodes);
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys.sort()).toEqual([...countryCodes].sort());
    for (const [code, dial] of Object.entries(callingCodes)) {
      expect(dial, code).toMatch(/^\+\d{1,4}$/);
    }
  });
});
