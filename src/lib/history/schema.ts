import type { CalculationResult } from "@/lib/calc/calculate";
import { isCurrency, type Currency } from "@/lib/calc/currencies";
import { isRateBasis, type RateBasis } from "@/lib/calc/units";
import { weightUnits, type WeightUnit } from "@/lib/receipt/model";

export const HISTORY_STORAGE_KEY = "hmf-history";
/** Bump when the stored shape changes; older payloads must be migrated or rejected. */
export const HISTORY_SCHEMA_VERSION = 1;
export const HISTORY_LIMIT = 50;

/** Only calculation data is stored: no names, notes, or any personal details. */
export type HistoryEntry = {
  id: string;
  savedAt: string;
  calculationVersion: string;
  rate: string;
  basis: RateBasis;
  currency: Currency;
  unit: WeightUnit;
  /** Amount as calculated when saved (already rounded). */
  amount: string;
  fractionDigits: number;
};

export type StoredHistory = {
  version: typeof HISTORY_SCHEMA_VERSION;
  entries: HistoryEntry[];
};

export type ParsedHistory = {
  entries: HistoryEntry[];
  /** True when stored data existed but could not be fully read. */
  corrupted: boolean;
};

const DECIMAL = /^\d{1,12}(\.\d{1,20})?$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isWeightUnit(value: unknown): value is WeightUnit {
  return weightUnits.some((unit) => unit === value);
}

function toEntry(value: unknown): HistoryEntry | null {
  if (!isRecord(value)) return null;
  const {
    id,
    savedAt,
    calculationVersion,
    rate,
    basis,
    currency,
    unit,
    amount,
    fractionDigits,
  } = value;
  if (typeof id !== "string" || id.length === 0 || id.length > 64) return null;
  if (typeof savedAt !== "string" || Number.isNaN(Date.parse(savedAt))) {
    return null;
  }
  if (
    typeof calculationVersion !== "string" ||
    calculationVersion.length > 16
  ) {
    return null;
  }
  if (typeof rate !== "string" || !DECIMAL.test(rate)) return null;
  if (typeof amount !== "string" || !DECIMAL.test(amount)) return null;
  if (typeof basis !== "string" || !isRateBasis(basis)) return null;
  if (typeof currency !== "string" || !isCurrency(currency)) return null;
  if (!isWeightUnit(unit)) return null;
  if (
    typeof fractionDigits !== "number" ||
    !Number.isInteger(fractionDigits) ||
    fractionDigits < 0 ||
    fractionDigits > 4
  ) {
    return null;
  }
  return {
    id,
    savedAt,
    calculationVersion,
    rate,
    basis,
    currency,
    unit,
    amount,
    fractionDigits,
  };
}

/** Never throws: unreadable data yields an empty list flagged as corrupted. */
export function parseHistory(raw: string | null): ParsedHistory {
  if (raw === null) return { entries: [], corrupted: false };
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { entries: [], corrupted: true };
  }
  if (
    !isRecord(data) ||
    data.version !== HISTORY_SCHEMA_VERSION ||
    !Array.isArray(data.entries)
  ) {
    return { entries: [], corrupted: true };
  }
  const entries: HistoryEntry[] = [];
  const seen = new Set<string>();
  for (const item of data.entries) {
    const entry = toEntry(item);
    if (entry && !seen.has(entry.id)) {
      seen.add(entry.id);
      entries.push(entry);
    }
  }
  return {
    entries: entries.slice(0, HISTORY_LIMIT),
    corrupted: entries.length !== data.entries.length,
  };
}

export function serializeHistory(entries: HistoryEntry[]): string {
  const stored: StoredHistory = { version: HISTORY_SCHEMA_VERSION, entries };
  return JSON.stringify(stored);
}

export function entryFromResult(
  result: CalculationResult,
  unit: WeightUnit,
  id: string,
  savedAt: Date,
): HistoryEntry {
  return {
    id,
    savedAt: savedAt.toISOString(),
    calculationVersion: result.version,
    rate: result.rate,
    basis: result.basis,
    currency: result.currency,
    unit,
    amount: result.amount,
    fractionDigits: result.fractionDigits,
  };
}

/** Same inputs under the same method count as one calculation. */
export function sameCalculation(
  a: Pick<HistoryEntry, "rate" | "basis" | "currency" | "calculationVersion">,
  b: Pick<HistoryEntry, "rate" | "basis" | "currency" | "calculationVersion">,
): boolean {
  return (
    a.rate === b.rate &&
    a.basis === b.basis &&
    a.currency === b.currency &&
    a.calculationVersion === b.calculationVersion
  );
}

/** Newest first; re-saving the same calculation moves it to the top instead of duplicating it. */
export function addEntry(
  entries: HistoryEntry[],
  entry: HistoryEntry,
): HistoryEntry[] {
  return [entry, ...entries.filter((e) => !sameCalculation(e, entry))].slice(
    0,
    HISTORY_LIMIT,
  );
}

export function removeEntry(
  entries: HistoryEntry[],
  id: string,
): HistoryEntry[] {
  return entries.filter((e) => e.id !== id);
}

/** Puts a deleted entry back at its old position (for undo). */
export function restoreEntry(
  entries: HistoryEntry[],
  entry: HistoryEntry,
  index: number,
): HistoryEntry[] {
  const rest = entries.filter((e) => e.id !== entry.id);
  const at = Math.min(Math.max(index, 0), rest.length);
  return [...rest.slice(0, at), entry, ...rest.slice(at)].slice(
    0,
    HISTORY_LIMIT,
  );
}

/** Query string that reopens an entry in the calculator. */
export function reopenQuery(entry: HistoryEntry): string {
  const params = new URLSearchParams({
    rate: entry.rate,
    basis: entry.basis,
    currency: entry.currency,
    unit: entry.unit,
  });
  return `?${params.toString()}`;
}

export type ReopenInput = {
  rate: string;
  basis: RateBasis;
  currency: Currency;
  unit: WeightUnit;
};

/** Validates calculator URL params; anything unexpected is ignored. */
export function parseReopenQuery(search: string): ReopenInput | null {
  const params = new URLSearchParams(search);
  const rate = params.get("rate");
  const basis = params.get("basis");
  const currency = params.get("currency");
  const unit = params.get("unit");
  if (rate === null || rate.length > 40) return null;
  if (basis === null || !isRateBasis(basis)) return null;
  if (currency === null || !isCurrency(currency)) return null;
  const fallbackUnit: WeightUnit = basis === "gram" ? "gram" : "tola";
  return {
    rate,
    basis,
    currency,
    unit: isWeightUnit(unit) ? unit : fallbackUnit,
  };
}
