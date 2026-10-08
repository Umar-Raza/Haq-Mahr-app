import { describe, expect, it } from "vitest";
import { ar } from "@/i18n/dictionaries/ar";
import { en } from "@/i18n/dictionaries/en";
import { calculateMahr } from "@/lib/calc/calculate";
import {
  PLACEHOLDER,
  buildFormattedText,
  buildPreviewModel,
  buildReceiptModel,
  buildShortText,
  whatsappHref,
} from "./model";

// Normalize Intl no-break spaces for readable comparisons.
const NBSP = String.fromCodePoint(0xa0);
const nbsp = (s: string) => s.replaceAll(NBSP, " ");
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
  });

  it("shows only rate, reference weight and date, plus the site domain", () => {
    const model = buildReceiptModel(
      "en",
      enTexts,
      result("210", "gram"),
      "gram",
      issuedAt,
    );
    expect(model.rows.map((r) => r.label)).toEqual([
      en.receipt.rateLabel,
      en.receipt.weightLabel,
      en.receipt.issuedLabel,
    ]);
    expect(model.domain).toBe("haq-mahr-finder.app");
  });

  it("rounds the amount up", () => {
    const model = buildReceiptModel(
      "en",
      enTexts,
      result("0.25", "gram"),
      "tola",
      issuedAt,
    );
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
    expect(preview.disclaimer).toBe(en.receipt.disclaimer);
    expect(preview.domain).toBe("haq-mahr-finder.app");
  });

  it("follows the selected unit", () => {
    expect(buildPreviewModel("en", enTexts, "masha").rows[1].value).toBe(
      "31.5 Masha",
    );
  });
});

describe("share helpers", () => {
  const model = buildReceiptModel(
    "en",
    enTexts,
    result("210", "gram"),
    "gram",
    issuedAt,
  );

  it("builds formatted text: one line per detail, rules, disclaimer and site URL", () => {
    const lines = nbsp(buildFormattedText(model)).split("\n");
    expect(lines[0]).toBe("Haq Mahr estimate");
    expect(lines[1]).toBe("Haq Mahr Finder");
    expect(lines[2]).toMatch(/^─+$/);
    expect(lines).toContain("Estimated value: PKR 6,429.78");
    expect(lines).toContain("Silver rate: PKR 210.00 per gram");
    expect(lines).toContain("Reference weight: 30.618 g");
    expect(lines).toContain(en.receipt.disclaimer);
    expect(lines.at(-1)).toBe("https://haq-mahr-finder.app");
  });

  it("builds a single short line with amount, rate and site URL", () => {
    const text = nbsp(buildShortText(model));
    expect(text).not.toContain("\n");
    expect(text).toBe(
      "Haq Mahr estimate: PKR 6,429.78 (PKR 210.00 per gram) · https://haq-mahr-finder.app",
    );
  });

  it("encodes text for the WhatsApp click-to-chat link", () => {
    expect(whatsappHref("a b&c\nd")).toBe("https://wa.me/?text=a%20b%26c%0Ad");
  });
});
