// Exact base-10 arithmetic on BigInt: value = units / 10^scale. Avoids binary floating-point drift.
export type Decimal = { readonly units: bigint; readonly scale: number };

const TEN = BigInt(10);
const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);

const pow10 = (n: number) => TEN ** BigInt(n);

export function decimal(value: string): Decimal {
  const match = /^(\d+)(?:\.(\d+))?$/.exec(value);
  if (!match) throw new Error(`Invalid decimal literal: ${value}`);
  const fraction = match[2] ?? "";
  return { units: BigInt(match[1] + fraction), scale: fraction.length };
}

export function multiply(a: Decimal, b: Decimal): Decimal {
  return { units: a.units * b.units, scale: a.scale + b.scale };
}

function rescale(value: Decimal, scale: number): bigint {
  return value.units * pow10(scale - value.scale);
}

export function compare(a: Decimal, b: Decimal): number {
  const scale = Math.max(a.scale, b.scale);
  const x = rescale(a, scale);
  const y = rescale(b, scale);
  return x === y ? 0 : x > y ? 1 : -1;
}

/** Round half away from zero to `digits` fractional digits. */
export function roundHalfUp(value: Decimal, digits: number): Decimal {
  if (value.scale <= digits) {
    return { units: rescale(value, digits), scale: digits };
  }
  const divisor = pow10(value.scale - digits);
  const negative = value.units < ZERO;
  const magnitude = negative ? -value.units : value.units;
  let quotient = magnitude / divisor;
  if ((magnitude % divisor) * TWO >= divisor) quotient += ONE;
  return { units: negative ? -quotient : quotient, scale: digits };
}

/** Round toward positive infinity (ceiling) to `digits` fractional digits. */
export function roundUp(value: Decimal, digits: number): Decimal {
  if (value.scale <= digits) {
    return { units: rescale(value, digits), scale: digits };
  }
  const divisor = pow10(value.scale - digits);
  // BigInt division truncates toward zero, which is already the ceiling for negatives.
  let quotient = value.units / divisor;
  if (value.units > ZERO && value.units % divisor !== ZERO) quotient += ONE;
  return { units: quotient, scale: digits };
}

/** Plain string with exactly `scale` fractional digits, e.g. "1234.50". */
export function toFixedString(value: Decimal): string {
  const negative = value.units < ZERO;
  const digits = (negative ? -value.units : value.units)
    .toString()
    .padStart(value.scale + 1, "0");
  const intPart = digits.slice(0, digits.length - value.scale);
  const fracPart = digits.slice(digits.length - value.scale);
  return `${negative ? "-" : ""}${intPart}${value.scale > 0 ? `.${fracPart}` : ""}`;
}

/** Plain string with trailing fractional zeros removed, e.g. "2.625". */
export function toPlainString(value: Decimal): string {
  const fixed = toFixedString(value);
  return fixed.includes(".") ? fixed.replace(/\.?0+$/, "") : fixed;
}
