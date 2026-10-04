import { compare, decimal, type Decimal } from "./decimal";

export const MAX_RATE = decimal("1000000000");
export const MAX_RATE_DECIMALS = 4;

export type RateError =
  | "empty"
  | "invalidFormat"
  | "negative"
  | "zero"
  | "tooManyDecimals"
  | "tooLarge";

export type ParsedRate =
  { ok: true; value: Decimal } | { ok: false; error: RateError };

const EASTERN_ARABIC_ZERO = 0x0660;
const PERSIAN_ZERO = 0x06f0;

function toAsciiDigits(input: string): string {
  return input.replace(/[٠-٩۰-۹]/g, (ch) => {
    const code = ch.charCodeAt(0);
    const base = code >= PERSIAN_ZERO ? PERSIAN_ZERO : EASTERN_ARABIC_ZERO;
    return String(code - base);
  });
}

// Western (1,234,567) or South Asian lakh (12,34,567) grouping. Anything else, e.g. "1,5", is rejected, never guessed.
const WESTERN_GROUPS = /^\d{1,3}(,\d{3})+$/;
const LAKH_GROUPS = /^\d{1,2}(,\d{2})*,\d{3}$/;

export function parseRate(raw: string): ParsedRate {
  const text = toAsciiDigits(raw)
    .replace(/[\s  ]/g, "")
    .replace(/٫/g, ".")
    .replace(/٬/g, ",");

  if (text === "") return { ok: false, error: "empty" };
  if (/^[-−]/.test(text)) return { ok: false, error: "negative" };

  const unsigned = text
    .replace(/^\+/, "")
    .replace(/^\./, "0.")
    .replace(/(\d)\.$/, "$1");
  const match = /^([\d,]+)(?:\.(\d+))?$/.exec(unsigned);
  if (!match) return { ok: false, error: "invalidFormat" };

  const [, intRaw, fraction = ""] = match;
  if (
    intRaw.includes(",") &&
    !WESTERN_GROUPS.test(intRaw) &&
    !LAKH_GROUPS.test(intRaw)
  ) {
    return { ok: false, error: "invalidFormat" };
  }
  if (fraction.length > MAX_RATE_DECIMALS) {
    return { ok: false, error: "tooManyDecimals" };
  }

  const value = decimal(
    `${intRaw.replace(/,/g, "")}${fraction ? `.${fraction}` : ""}`,
  );
  if (value.units === BigInt(0)) return { ok: false, error: "zero" };
  if (compare(value, MAX_RATE) > 0) return { ok: false, error: "tooLarge" };
  return { ok: true, value };
}
