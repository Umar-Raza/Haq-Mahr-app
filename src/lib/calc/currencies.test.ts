import { describe, expect, it } from "vitest";
import { calculateMahr } from "./calculate";
import {
  commonCurrencies,
  currencies,
  currencyFractionDigits,
  isCurrency,
} from "./currencies";

describe("currencies", () => {
  it("covers all active ISO 4217 currencies", () => {
    expect(currencies.length).toBe(155);
    expect(currencies).toContain("PKR");
    expect(currencies).toContain("JPY");
    expect(currencies).toContain("XOF");
  });

  it("excludes fund codes, metals, and test codes", () => {
    for (const code of ["XAU", "XAG", "XDR", "XTS", "XXX", "CLF", "USN"]) {
      expect(isCurrency(code)).toBe(false);
    }
  });

  it("keeps every common currency inside the full list", () => {
    for (const code of commonCurrencies) expect(currencies).toContain(code);
  });

  it("uses ISO 4217 minor units independent of the JS engine", () => {
    expect(currencyFractionDigits("PKR")).toBe(2);
    expect(currencyFractionDigits("KWD")).toBe(3);
    expect(currencyFractionDigits("TND")).toBe(3);
    expect(currencyFractionDigits("JPY")).toBe(0);
    expect(currencyFractionDigits("VND")).toBe(0);
  });

  it("rejects unknown or inherited keys", () => {
    expect(isCurrency("pkr")).toBe(false);
    expect(isCurrency("toString")).toBe(false);
  });
});

describe("zero-decimal currencies", () => {
  it("round the amount up to a whole unit", () => {
    const outcome = calculateMahr({
      rate: "100",
      basis: "gram",
      currency: "JPY",
    });
    expect(outcome.ok && outcome.result.amount).toBe("3062"); // 3061.8
  });
});
