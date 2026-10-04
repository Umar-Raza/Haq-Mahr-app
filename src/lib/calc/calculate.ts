import {
  currencyFractionDigits,
  isCurrency,
  type Currency,
} from "./currencies";
import { multiply, roundHalfUp, toFixedString, toPlainString } from "./decimal";
import { parseRate, type RateError } from "./parse-rate";
import {
  REFERENCE_GRAMS,
  REFERENCE_GRAMS_DISPLAY_DIGITS,
  REFERENCE_MASHA,
  REFERENCE_TOLA,
  isRateBasis,
  referenceWeightIn,
  type RateBasis,
} from "./units";

/** Bump when constants, rounding, or formula change; stored with saved history entries. */
export const CALCULATION_VERSION = "1";

export type CalculationInput = {
  rate: string;
  basis: string;
  currency: string;
};

export type CalculationError =
  RateError | "unsupportedBasis" | "unsupportedCurrency";

export type CalculationResult = {
  version: string;
  currency: Currency;
  basis: RateBasis;
  /** Normalized rate as entered, e.g. "2450.5". */
  rate: string;
  /** Reference weight expressed in the rate's unit ("2.625" tola or "30.618" g). */
  weightInBasisUnit: string;
  /** rate × weight, unrounded. */
  exactAmount: string;
  /** Rounded half away from zero to the currency's minor units. */
  amount: string;
  fractionDigits: number;
  reference: {
    tola: string;
    masha: string;
    grams: string;
    gramsDisplay: string;
  };
};

export type CalculationOutcome =
  | { ok: true; result: CalculationResult }
  | { ok: false; error: CalculationError };

export function calculateMahr(input: CalculationInput): CalculationOutcome {
  if (!isRateBasis(input.basis))
    return { ok: false, error: "unsupportedBasis" };
  if (!isCurrency(input.currency)) {
    return { ok: false, error: "unsupportedCurrency" };
  }
  const parsed = parseRate(input.rate);
  if (!parsed.ok) return parsed;

  const weight = referenceWeightIn[input.basis];
  const exact = multiply(parsed.value, weight);
  const fractionDigits = currencyFractionDigits(input.currency);

  return {
    ok: true,
    result: {
      version: CALCULATION_VERSION,
      currency: input.currency,
      basis: input.basis,
      rate: toPlainString(parsed.value),
      weightInBasisUnit: toPlainString(weight),
      exactAmount: toPlainString(exact),
      amount: toFixedString(roundHalfUp(exact, fractionDigits)),
      fractionDigits,
      reference: {
        tola: toPlainString(REFERENCE_TOLA),
        masha: toPlainString(REFERENCE_MASHA),
        grams: toPlainString(REFERENCE_GRAMS),
        gramsDisplay: toFixedString(
          roundHalfUp(REFERENCE_GRAMS, REFERENCE_GRAMS_DISPLAY_DIGITS),
        ),
      },
    },
  };
}
