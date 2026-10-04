import { decimal, multiply } from "./decimal";

// Sources and review date are recorded in decision.md ("Calculation reference").

/** Project convention (user-confirmed): 11.664 g, so 2 Tola 7.5 Masha = 30.618 g exactly. */
export const GRAMS_PER_TOLA = decimal("11.664");
export const MASHA_PER_TOLA = 12;
/** 11.664 / 12, exact. */
export const GRAMS_PER_MASHA = decimal("0.972");

/** Reference: 10 Dirhams, expressed as 2 Tola 7.5 Masha = 31.5 Masha. */
export const REFERENCE_MASHA = decimal("31.5");
/** 31.5 / 12, exact. */
export const REFERENCE_TOLA = decimal("2.625");
/** 2.625 × 11.664 = 30.618 g. */
export const REFERENCE_GRAMS = multiply(REFERENCE_TOLA, GRAMS_PER_TOLA);
export const REFERENCE_GRAMS_DISPLAY_DIGITS = 3;

export const rateBases = ["tola", "gram"] as const;
export type RateBasis = (typeof rateBases)[number];

export function isRateBasis(value: string): value is RateBasis {
  return (rateBases as readonly string[]).includes(value);
}

export const referenceWeightIn = {
  tola: REFERENCE_TOLA,
  gram: REFERENCE_GRAMS,
} as const satisfies Record<RateBasis, unknown>;
