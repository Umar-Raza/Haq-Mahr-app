import { describe, expect, it } from "vitest";
import { negotiateLocale, pathnameLocale } from "./negotiate";

describe("negotiateLocale", () => {
  it("falls back to English when the header is missing or empty", () => {
    expect(negotiateLocale(null)).toBe("en");
    expect(negotiateLocale("")).toBe("en");
  });

  it("matches region-tagged languages by base language", () => {
    expect(negotiateLocale("ur-PK,ur;q=0.9")).toBe("ur");
    expect(negotiateLocale("ar-SA")).toBe("ar");
  });

  it("respects q-values over header order", () => {
    expect(negotiateLocale("en;q=0.5,ar;q=0.9")).toBe("ar");
  });

  it("skips unsupported languages and q=0 entries", () => {
    expect(negotiateLocale("fr-FR,de;q=0.9,ur;q=0.8")).toBe("ur");
    expect(negotiateLocale("ar;q=0,fr")).toBe("en");
  });

  it("treats malformed q-values as unacceptable", () => {
    expect(negotiateLocale("ar;q=abc,ur;q=0.3")).toBe("ur");
  });
});

describe("pathnameLocale", () => {
  it("detects a supported locale prefix", () => {
    expect(pathnameLocale("/ur")).toBe("ur");
    expect(pathnameLocale("/ar/guides/intro")).toBe("ar");
  });

  it("returns null for missing or unsupported prefixes", () => {
    expect(pathnameLocale("/")).toBeNull();
    expect(pathnameLocale("/guides")).toBeNull();
    expect(pathnameLocale("/english")).toBeNull();
  });
});
