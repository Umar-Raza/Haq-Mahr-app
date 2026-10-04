import { describe, expect, it } from "vitest";
import { formatDecimal, formatMoney as rawFormatMoney } from "./format";

// Intl separates the code and amount with a no-break space.
const formatMoney = (...args: Parameters<typeof rawFormatMoney>) =>
  rawFormatMoney(...args).replaceAll(String.fromCodePoint(0xa0), " ");

describe("formatMoney", () => {
  it("shows the currency code and exact minor units", () => {
    expect(formatMoney("en", "PKR", "6429.78", 2)).toBe("PKR 6,429.78");
    expect(formatMoney("en", "KWD", "9.185", 3)).toBe("KWD 9.185");
    expect(formatMoney("en", "PKR", "6431.20", 2)).toBe("PKR 6,431.20");
  });

  it("does not lose precision on large amounts", () => {
    expect(formatMoney("en", "PKR", "2625000000.00", 2)).toBe(
      "PKR 2,625,000,000.00",
    );
  });

  it("uses Latin digits in Urdu and Arabic", () => {
    expect(formatMoney("ur", "PKR", "6429.78", 2)).toMatch(/6,429\.78/);
    expect(formatMoney("ar", "SAR", "6429.78", 2)).toMatch(/6,429\.78/);
  });
});

describe("formatDecimal", () => {
  it("groups digits and keeps all fractional digits", () => {
    expect(formatDecimal("en", "30.618")).toBe("30.618");
    expect(formatDecimal("en", "6429.78")).toBe("6,429.78");
    expect(formatDecimal("en", "9.1854")).toBe("9.1854");
    expect(formatDecimal("ar", "1234.5")).toMatch(/1,234\.5/);
  });
});
