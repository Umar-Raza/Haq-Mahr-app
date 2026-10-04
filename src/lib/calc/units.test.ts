import { describe, expect, it } from "vitest";
import {
  decimal,
  multiply,
  roundHalfUp,
  toFixedString,
  toPlainString,
} from "./decimal";
import {
  GRAMS_PER_MASHA,
  GRAMS_PER_TOLA,
  REFERENCE_GRAMS,
  REFERENCE_GRAMS_DISPLAY_DIGITS,
  REFERENCE_MASHA,
  REFERENCE_TOLA,
} from "./units";

describe("units", () => {
  it("keeps masha = tola / 12 exact", () => {
    expect(toPlainString(multiply(GRAMS_PER_MASHA, decimal("12")))).toBe(
      toPlainString(GRAMS_PER_TOLA),
    );
  });

  it("expresses 2 Tola 7.5 Masha as exactly 30.618 g in every unit", () => {
    expect(toPlainString(REFERENCE_MASHA)).toBe("31.5");
    expect(toPlainString(multiply(REFERENCE_TOLA, decimal("12")))).toBe("31.5");
    expect(toPlainString(REFERENCE_GRAMS)).toBe("30.618");
    expect(toPlainString(multiply(REFERENCE_MASHA, GRAMS_PER_MASHA))).toBe(
      "30.618",
    );
  });

  it("displays the reference without hiding precision", () => {
    expect(
      toFixedString(
        roundHalfUp(REFERENCE_GRAMS, REFERENCE_GRAMS_DISPLAY_DIGITS),
      ),
    ).toBe("30.618");
  });
});
