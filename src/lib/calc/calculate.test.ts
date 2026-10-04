import { describe, expect, it } from "vitest";
import { CALCULATION_VERSION, calculateMahr } from "./calculate";

function amount(rate: string, basis: string, currency = "PKR") {
  const outcome = calculateMahr({ rate, basis, currency });
  if (!outcome.ok) throw new Error(`expected ok, got ${outcome.error}`);
  return outcome.result;
}

describe("calculateMahr: per tola", () => {
  it("multiplies the rate by 2.625 tola", () => {
    const result = amount("2450", "tola");
    expect(result.weightInBasisUnit).toBe("2.625");
    expect(result.exactAmount).toBe("6431.25");
    expect(result.amount).toBe("6431.25");
  });

  it("always rounds up to currency minor units", () => {
    expect(amount("0.2", "tola").amount).toBe("0.53"); // 0.525
    expect(amount("0.6", "tola").amount).toBe("1.58"); // 1.575
    expect(amount("1.002", "tola").amount).toBe("2.64"); // 2.63025, below half
    expect(amount("55555", "tola").amount).toBe("145831.88"); // 145831.875
  });
});

describe("calculateMahr: per gram", () => {
  it("multiplies the rate by 30.618 g", () => {
    const result = amount("210", "gram");
    expect(result.weightInBasisUnit).toBe("30.618");
    expect(result.exactAmount).toBe("6429.78");
    expect(result.amount).toBe("6429.78");
  });

  it("rounds up even when the remainder is below half", () => {
    expect(amount("2.5", "gram").amount).toBe("76.55"); // 76.545
    expect(amount("0.25", "gram").amount).toBe("7.66"); // 7.6545
  });

  it("never rounds below the exact amount", () => {
    for (const rate of ["0.25", "1.002", "2.5", "55555", "123.4567"]) {
      const r = amount(rate, "gram");
      expect(Number(r.amount)).toBeGreaterThanOrEqual(Number(r.exactAmount));
    }
  });

  it("uses each currency's own minor units", () => {
    expect(amount("0.3", "gram", "KWD").amount).toBe("9.186"); // 9.1854
    expect(amount("0.3", "gram", "KWD").fractionDigits).toBe(3);
    expect(amount("210", "gram", "USD").amount).toBe("6429.78");
  });

  it("gives the same amount for equivalent tola and gram rates", () => {
    // 11.664 g per tola, so a per-gram rate of 200 equals 2332.8 per tola.
    expect(amount("200", "gram").amount).toBe(amount("2332.8", "tola").amount);
  });
});

describe("calculateMahr: result metadata", () => {
  it("identifies currency, basis, rate, version, and reference weight", () => {
    const result = amount("1,234.5", "gram", "SAR");
    expect(result.currency).toBe("SAR");
    expect(result.basis).toBe("gram");
    expect(result.rate).toBe("1234.5");
    expect(result.version).toBe(CALCULATION_VERSION);
    expect(result.reference).toEqual({
      tola: "2.625",
      masha: "31.5",
      grams: "30.618",
      gramsDisplay: "30.618",
    });
  });

  it("handles the maximum rate exactly", () => {
    expect(amount("1000000000", "tola").amount).toBe("2625000000.00");
  });
});

describe("calculateMahr: invalid input", () => {
  it("passes rate validation errors through", () => {
    expect(calculateMahr({ rate: "", basis: "tola", currency: "PKR" })).toEqual(
      {
        ok: false,
        error: "empty",
      },
    );
    expect(
      calculateMahr({ rate: "-1", basis: "gram", currency: "PKR" }),
    ).toEqual({ ok: false, error: "negative" });
  });

  it("rejects unsupported basis and currency without converting", () => {
    expect(
      calculateMahr({ rate: "10", basis: "masha", currency: "PKR" }),
    ).toEqual({ ok: false, error: "unsupportedBasis" });
    expect(
      calculateMahr({ rate: "10", basis: "tola", currency: "XYZ" }),
    ).toEqual({ ok: false, error: "unsupportedCurrency" });
    expect(
      calculateMahr({ rate: "10", basis: "tola", currency: "pkr" }),
    ).toEqual({ ok: false, error: "unsupportedCurrency" });
  });
});
