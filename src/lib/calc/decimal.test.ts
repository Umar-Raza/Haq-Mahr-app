import { describe, expect, it } from "vitest";
import {
  compare,
  decimal,
  multiply,
  roundHalfUp,
  roundUp,
  toFixedString,
  toPlainString,
} from "./decimal";

describe("decimal", () => {
  it("parses and prints exactly", () => {
    expect(toPlainString(decimal("11.6638038"))).toBe("11.6638038");
    expect(toFixedString(decimal("0.05"))).toBe("0.05");
    expect(toFixedString({ units: BigInt(5), scale: 3 })).toBe("0.005");
    expect(toPlainString(decimal("2.6250"))).toBe("2.625");
    expect(toPlainString(decimal("100"))).toBe("100");
  });

  it("rejects non-decimal literals", () => {
    expect(() => decimal("1e5")).toThrow();
    expect(() => decimal("-1")).toThrow();
    expect(() => decimal("NaN")).toThrow();
  });

  it("multiplies without floating-point drift", () => {
    // 0.1 * 3 is 0.30000000000000004 in binary floating point.
    expect(toPlainString(multiply(decimal("0.1"), decimal("3")))).toBe("0.3");
    expect(toPlainString(multiply(decimal("1.1"), decimal("1.1")))).toBe(
      "1.21",
    );
  });

  it("rounds half away from zero", () => {
    expect(toFixedString(roundHalfUp(decimal("0.525"), 2))).toBe("0.53");
    expect(toFixedString(roundHalfUp(decimal("1.575"), 2))).toBe("1.58");
    expect(toFixedString(roundHalfUp(decimal("0.524999"), 2))).toBe("0.52");
    expect(toFixedString(roundHalfUp(decimal("2.5"), 0))).toBe("3");
    expect(
      toFixedString(roundHalfUp({ units: BigInt(-15), scale: 1 }, 0)),
    ).toBe("-2");
  });

  it("rounds up (ceiling) for any non-zero remainder", () => {
    expect(toFixedString(roundUp(decimal("7.6541"), 2))).toBe("7.66");
    expect(toFixedString(roundUp(decimal("7.6501"), 2))).toBe("7.66");
    expect(toFixedString(roundUp(decimal("7.6599"), 2))).toBe("7.66");
    expect(toFixedString(roundUp(decimal("145831.875"), 2))).toBe("145831.88");
    expect(toFixedString(roundUp(decimal("6429.78"), 2))).toBe("6429.78");
    expect(toFixedString(roundUp(decimal("6429.7800"), 2))).toBe("6429.78");
    expect(toFixedString(roundUp(decimal("9.1854"), 3))).toBe("9.186");
    expect(toFixedString(roundUp({ units: BigInt(-15), scale: 1 }, 0))).toBe(
      "-1",
    );
  });

  it("pads when rounding to more digits than present", () => {
    expect(toFixedString(roundHalfUp(decimal("6431.25"), 3))).toBe("6431.250");
    expect(toFixedString(roundHalfUp(decimal("7"), 2))).toBe("7.00");
  });

  it("compares across scales", () => {
    expect(compare(decimal("1.50"), decimal("1.5"))).toBe(0);
    expect(compare(decimal("1.51"), decimal("1.5"))).toBe(1);
    expect(compare(decimal("2"), decimal("10"))).toBe(-1);
  });
});
