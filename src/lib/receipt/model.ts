import { localeDirection, type Direction, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { interpolate } from "@/i18n/interpolate";
import {
  CALCULATION_VERSION,
  type CalculationResult,
} from "@/lib/calc/calculate";
import { toPlainString } from "@/lib/calc/decimal";
import {
  REFERENCE_GRAMS,
  REFERENCE_MASHA,
  REFERENCE_TOLA,
} from "@/lib/calc/units";
import { formatDateTime, formatDecimal, formatMoney } from "@/lib/format";

export const weightUnits = ["tola", "masha", "gram"] as const;
export type WeightUnit = (typeof weightUnits)[number];

export type ReceiptRow = { label: string; value: string };

export type ReceiptModel = {
  lang: Locale;
  dir: Direction;
  brand: string;
  title: string;
  amountLabel: string;
  amount: string;
  rows: ReceiptRow[];
  disclaimer: string;
};

type Texts = {
  siteName: string;
  receipt: Dictionary["receipt"];
};

export function buildReceiptModel(
  locale: Locale,
  texts: Texts,
  result: CalculationResult,
  unit: WeightUnit,
  issuedAt: Date,
): ReceiptModel {
  const t = texts.receipt;
  const money = (value: string) =>
    formatMoney(locale, result.currency, value, result.fractionDigits);

  const weightValue = weightText(locale, t, unit, result.reference);

  // Show the rate exactly as entered, never rounded to the currency's minor units.
  const rateDecimals = result.rate.split(".")[1]?.length ?? 0;
  const rate = interpolate(
    result.basis === "tola" ? t.ratePerTola : t.ratePerGram,
    {
      rate: formatMoney(
        locale,
        result.currency,
        result.rate,
        Math.max(result.fractionDigits, rateDecimals),
      ),
    },
  );

  // LTR isolate keeps the equation in reading order inside RTL text (HTML and canvas).
  const calculation = `${LRI}${formatDecimal(locale, result.rate)} × ${formatDecimal(
    locale,
    result.weightInBasisUnit,
  )} = ${formatDecimal(locale, result.exactAmount)}${PDI}`;

  const rows: ReceiptRow[] = [
    { label: t.rateLabel, value: rate },
    { label: t.weightLabel, value: weightValue },
    { label: t.calculationLabel, value: calculation },
    {
      label: t.methodLabel,
      value: interpolate(t.method, { version: result.version }),
    },
    { label: t.issuedLabel, value: formatDateTime(locale, issuedAt) },
  ];

  return {
    lang: locale,
    dir: localeDirection[locale],
    brand: texts.siteName,
    title: t.title,
    amountLabel: t.amountLabel,
    amount: money(result.amount),
    rows,
    disclaimer: t.disclaimer,
  };
}

type Reference = { tola: string; masha: string; grams: string };

function weightText(
  locale: Locale,
  t: Dictionary["receipt"],
  unit: WeightUnit,
  reference: Reference,
): string {
  const template = {
    tola: t.weightTola,
    masha: t.weightMasha,
    gram: t.weightGram,
  }[unit];
  const value = {
    tola: reference.tola,
    masha: reference.masha,
    gram: reference.grams,
  }[unit];
  return interpolate(template, { value: formatDecimal(locale, value) });
}

export const PLACEHOLDER = "—";

/** Receipt shown before a valid rate exists: known facts filled in, rate-dependent values as placeholders. */
export function buildPreviewModel(
  locale: Locale,
  texts: Texts,
  unit: WeightUnit,
): ReceiptModel {
  const t = texts.receipt;
  return {
    lang: locale,
    dir: localeDirection[locale],
    brand: texts.siteName,
    title: t.title,
    amountLabel: t.amountLabel,
    amount: PLACEHOLDER,
    rows: [
      { label: t.rateLabel, value: PLACEHOLDER },
      {
        label: t.weightLabel,
        value: weightText(locale, t, unit, {
          tola: toPlainString(REFERENCE_TOLA),
          masha: toPlainString(REFERENCE_MASHA),
          grams: toPlainString(REFERENCE_GRAMS),
        }),
      },
      { label: t.calculationLabel, value: PLACEHOLDER },
      {
        label: t.methodLabel,
        value: interpolate(t.method, { version: CALCULATION_VERSION }),
      },
      { label: t.issuedLabel, value: PLACEHOLDER },
    ],
    disclaimer: t.disclaimer,
  };
}

const LRI = String.fromCodePoint(0x2066);
const PDI = String.fromCodePoint(0x2069);

export function buildShareText(model: ReceiptModel, url?: string): string {
  return [
    `${model.brand} — ${model.title}`,
    `${model.amountLabel}: ${model.amount}`,
    ...model.rows.map((row) => `${row.label}: ${row.value}`),
    model.disclaimer,
    ...(url ? [url] : []),
  ].join("\n");
}

export function whatsappHref(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
