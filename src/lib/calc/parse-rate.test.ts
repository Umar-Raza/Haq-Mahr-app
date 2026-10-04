import { describe, expect, it } from "vitest";
import { toPlainString } from "./decimal";
import { parseRate } from "./parse-rate";

function value(raw: string): string {
  const parsed = parseRate(raw);
  if (!parsed.ok) throw new Error(`expected ok, got ${parsed.error}`);
  return toPlainString(parsed.value);
}

function error(raw: string): string {
  const parsed = parseRate(raw);
  return parsed.ok ? "ok" : parsed.error;
}

describe("parseRate: valid input", () => {
  it("accepts plain numbers and trims whitespace", () => {
    expect(value("2450")).toBe("2450");
    expect(value(" 2450.5 ")).toBe("2450.5");
    expect(value("+5")).toBe("5");
    expect(value(".5")).toBe("0.5");
    expect(value("250.")).toBe("250");
  });

  it("accepts Western and lakh digit grouping", () => {
    expect(value("1,234.5")).toBe("1234.5");
    expect(value("1,234,567")).toBe("1234567");
    expect(value("12,34,567")).toBe("1234567");
    expect(value("1,00,000")).toBe("100000");
  });

  it("accepts Arabic-Indic and Persian digits and separators", () => {
    expect(value("٢٤٥٠")).toBe("2450");
    expect(value("۲۴۵۰٫۵")).toBe("2450.5");
    expect(value("٢٬٤٥٠")).toBe("2450");
  });

  it("accepts the boundaries", () => {
    expect(value("0.0001")).toBe("0.0001");
    expect(value("1000000000")).toBe("1000000000");
  });
});

describe("parseRate: invalid input", () => {
  it("rejects empty input", () => {
    expect(error("")).toBe("empty");
    expect(error("   ")).toBe("empty");
  });

  it("rejects negative values", () => {
    expect(error("-5")).toBe("negative");
    expect(error("−5")).toBe("negative");
  });

  it("rejects zero", () => {
    expect(error("0")).toBe("zero");
    expect(error("0.0000")).toBe("zero");
  });

  it("rejects non-finite and non-decimal forms", () => {
    expect(error("Infinity")).toBe("invalidFormat");
    expect(error("NaN")).toBe("invalidFormat");
    expect(error("1e5")).toBe("invalidFormat");
    expect(error("abc")).toBe("invalidFormat");
    expect(error("1.2.3")).toBe("invalidFormat");
    expect(error("0x10")).toBe("invalidFormat");
  });

  it("rejects ambiguous grouping instead of guessing", () => {
    expect(error("1,5")).toBe("invalidFormat");
    expect(error("1,2345")).toBe("invalidFormat");
    expect(error(",123")).toBe("invalidFormat");
    expect(error("1.234,5")).toBe("invalidFormat");
  });

  it("rejects too many decimals and too-large values", () => {
    expect(error("1.23456")).toBe("tooManyDecimals");
    expect(error("1000000000.0001")).toBe("tooLarge");
    expect(error("99999999999999999999")).toBe("tooLarge");
  });
});
