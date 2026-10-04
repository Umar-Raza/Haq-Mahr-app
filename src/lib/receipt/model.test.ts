import { describe, expect, it } from "vitest";
import { ar } from "@/i18n/dictionaries/ar";
import { en } from "@/i18n/dictionaries/en";
import { calculateMahr } from "@/lib/calc/calculate";
import {
  PLACEHOLDER,
  buildPreviewModel,
  buildReceiptModel,
  buildShareText,
  whatsappHref,
} from "./model";

// Normalize Intl no-break spaces and drop bidi isolates for readable comparisons.
const NBSP = String.fromCodePoint(0xa0);
const LRI = String.fromCodePoint(0x2066);
const PDI = String.fromCodePoint(0x2069);
const nbsp = (s: string) =>
  s.replaceAll(NBSP, " ").replaceAll(LRI, "").replaceAll(PDI, "");
const issuedAt = new Date("2026-10-04T10:30:00Z");

function result(rate: string, basis: "tola" | "gram", currency = "PKR") {
  const outcome = calculateMahr({ rate, basis, currency });
  if (!outcome.ok) throw new Error(outcome.error);
  return outcome.result;
}

const enTexts = { siteName: en.meta.siteName, receipt: en.receipt };

describe("buildReceiptModel", () => {
  it("labels amount, currency, rate basis, and reference weight", () => {
    const model = buildReceiptModel(
      "en",
      enTexts,
      result("210", "gram"),
      "gram",
      issuedAt,
    );
    expect(model.dir).toBe("ltr");
    expect(nbsp(model.amount)).toBe("PKR 6,429.78");
    const rows = Object.fromEntries(
      model.rows.map((r) => [r.label, nbsp(r.value)]),
    );
    expect(rows["Silver rate"]).toBe("PKR 210.00 per gram");
    expect(rows["Reference weight"]).toBe("30.618 g");
    expect(rows["Calculation"]).toBe("210 × 30.618 = 6,429.78");
    expect(rows["Method"]).toContain("30.618 g");
  });

  it("shows the exact equation without a rounding note, and the amount rounded up", () => {
    const model = buildReceiptModel(
      "en",
      enTexts,
      result("0.25", "gram"),
      "tola",
      issuedAt,
    );
    const calc = nbsp(
      model.rows.find((r) => r.label === "Calculation")?.value ?? "",
    );
    expect(calc).toBe("0.25 × 30.618 = 7.6545");
    expect(nbsp(model.amount)).toBe("PKR 7.66");
    expect(model.rows.find((r) => r.label === "Reference weight")?.value).toBe(
      "2.625 Tola",
    );
  });

  it("renders the selected display unit", () => {
    const model = buildReceiptModel(
      "en",
      enTexts,
      result("2450", "tola"),
      "masha",
      issuedAt,
    );
    expect(model.rows[1].value).toBe("31.5 Masha");
    expect(nbsp(model.rows[0].value)).toBe("PKR 2,450.00 per Tola");
  });

  it("wraps the equation in an LTR isolate", () => {
    const model = buildReceiptModel(
      "ur",
      { siteName: "x", receipt: en.receipt },
      result("210", "gram"),
      "gram",
      issuedAt,
    );
    expect(model.rows[2].value.startsWith(LRI)).toBe(true);
    expect(model.rows[2].value.endsWith(PDI)).toBe(true);
  });

  it("never rounds the displayed rate below what was entered", () => {
    const model = buildReceiptModel(
      "en",
      enTexts,
      result("210.1234", "gram"),
      "gram",
      issuedAt,
    );
    expect(nbsp(model.rows[0].value)).toBe("PKR 210.1234 per gram");
  });

  it("produces RTL Arabic text with Latin digits", () => {
    const model = buildReceiptModel(
      "ar",
      { siteName: ar.meta.siteName, receipt: ar.receipt },
      result("90", "gram", "SAR"),
      "gram",
      issuedAt,
    );
    expect(model.dir).toBe("rtl");
    expect(model.title).toBe(ar.receipt.title);
    expect(model.amount).toMatch(/2,755\.62/);
    expect(model.rows[1].value).toBe("30.618 غرام");
  });
});

describe("buildPreviewModel", () => {
  it("fills known facts and leaves rate-dependent values as placeholders", () => {
    const preview = buildPreviewModel("en", enTexts, "gram");
    expect(preview.amount).toBe(PLACEHOLDER);
    expect(preview.rows.map((r) => r.label)).toEqual(
      buildReceiptModel(
        "en",
        enTexts,
        result("1", "gram"),
        "gram",
        issuedAt,
      ).rows.map((r) => r.label),
    );
    expect(preview.rows[0].value).toBe(PLACEHOLDER);
    expect(preview.rows[1].value).toBe("30.618 g");
    expect(preview.rows[2].value).toBe(PLACEHOLDER);
    expect(preview.rows[3].value).toContain("30.618 g");
    expect(preview.disclaimer).toBe(en.receipt.disclaimer);
  });

  it("follows the selected unit", () => {
    expect(buildPreviewModel("en", enTexts, "masha").rows[1].value).toBe(
      "31.5 Masha",
    );
  });
});

describe("share helpers", () => {
  it("builds plain text with every receipt line and the page URL", () => {
    const model = buildReceiptModel(
      "en",
      enTexts,
      result("210", "gram"),
      "gram",
      issuedAt,
    );
    const text = nbsp(buildShareText(model, "https://example.test/en"));
    expect(text.split("\n")[0]).toBe("Haq Mahr Finder — Haq Mahr estimate");
    expect(text).toContain("Estimated value: PKR 6,429.78");
    expect(text).toContain(en.receipt.disclaimer);
    expect(text.endsWith("https://example.test/en")).toBe(true);
  });

  it("encodes text for the WhatsApp click-to-chat link", () => {
    expect(whatsappHref("a b&c\nd")).toBe("https://wa.me/?text=a%20b%26c%0Ad");
  });
});
