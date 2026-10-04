import { describe, expect, it } from "vitest";
import { calculateMahr } from "@/lib/calc/calculate";
import {
  HISTORY_LIMIT,
  HISTORY_SCHEMA_VERSION,
  addEntry,
  entryFromResult,
  parseHistory,
  parseReopenQuery,
  removeEntry,
  reopenQuery,
  restoreEntry,
  serializeHistory,
  type HistoryEntry,
} from "./schema";

function entry(id: string, rate = "100", currency = "PKR"): HistoryEntry {
  const outcome = calculateMahr({ rate, basis: "tola", currency });
  if (!outcome.ok) throw new Error("bad fixture");
  return entryFromResult(
    outcome.result,
    "tola",
    id,
    new Date("2026-10-04T10:00:00Z"),
  );
}

describe("parseHistory", () => {
  it("treats missing data as empty, not corrupted", () => {
    expect(parseHistory(null)).toEqual({ entries: [], corrupted: false });
  });

  it("round-trips serialized entries", () => {
    const entries = [entry("a"), entry("b", "250.5")];
    expect(parseHistory(serializeHistory(entries))).toEqual({
      entries,
      corrupted: false,
    });
  });

  it("stores only calculation fields", () => {
    expect(Object.keys(entry("a")).sort()).toEqual([
      "amount",
      "basis",
      "calculationVersion",
      "currency",
      "fractionDigits",
      "id",
      "rate",
      "savedAt",
      "unit",
    ]);
  });

  it.each([
    "not json",
    "null",
    "[]",
    "{}",
    JSON.stringify({ version: HISTORY_SCHEMA_VERSION + 1, entries: [] }),
    JSON.stringify({ version: HISTORY_SCHEMA_VERSION, entries: "x" }),
  ])("flags unreadable data %s as corrupted without throwing", (raw) => {
    expect(parseHistory(raw)).toEqual({ entries: [], corrupted: true });
  });

  it("keeps valid entries and skips invalid or duplicate ones", () => {
    const good = entry("a");
    const raw = JSON.stringify({
      version: HISTORY_SCHEMA_VERSION,
      entries: [
        good,
        { ...good, id: "b", currency: "XYZ" },
        { ...good, id: "c", rate: "-5" },
        { ...good, id: "d", savedAt: "yesterday" },
        { ...good, id: "e", unit: "kg" },
        { ...good, id: "f", fractionDigits: 1.5 },
        good,
        42,
      ],
    });
    expect(parseHistory(raw)).toEqual({ entries: [good], corrupted: true });
  });
});

describe("history operations", () => {
  it("adds newest first and moves a repeated calculation to the top", () => {
    const a = entry("a", "100");
    const b = entry("b", "200");
    const again = entry("c", "100");
    expect(addEntry([b, a], again).map((e) => e.id)).toEqual(["c", "b"]);
  });

  it("treats a different currency as a different calculation", () => {
    const list = addEntry([entry("a", "100", "PKR")], entry("b", "100", "INR"));
    expect(list).toHaveLength(2);
  });

  it(`keeps at most ${HISTORY_LIMIT} entries`, () => {
    let list: HistoryEntry[] = [];
    for (let i = 1; i <= HISTORY_LIMIT + 5; i++) {
      list = addEntry(list, entry(`id${i}`, String(i)));
    }
    expect(list).toHaveLength(HISTORY_LIMIT);
    expect(list[0].id).toBe(`id${HISTORY_LIMIT + 5}`);
  });

  it("removes one entry and restores it at its old position", () => {
    const list = [entry("a", "1"), entry("b", "2"), entry("c", "3")];
    const removed = removeEntry(list, "b");
    expect(removed.map((e) => e.id)).toEqual(["a", "c"]);
    expect(restoreEntry(removed, list[1], 1)).toEqual(list);
    expect(restoreEntry(removed, list[1], 99).map((e) => e.id)).toEqual([
      "a",
      "c",
      "b",
    ]);
  });
});

describe("reopen query", () => {
  it("round-trips an entry", () => {
    const e = { ...entry("a", "2450.5"), unit: "masha" as const };
    expect(parseReopenQuery(reopenQuery(e))).toEqual({
      rate: "2450.5",
      basis: "tola",
      currency: "PKR",
      unit: "masha",
    });
  });

  it("rejects unknown basis or currency", () => {
    expect(parseReopenQuery("?rate=1&basis=kg&currency=PKR")).toBeNull();
    expect(parseReopenQuery("?rate=1&basis=tola&currency=XYZ")).toBeNull();
    expect(parseReopenQuery("")).toBeNull();
  });

  it("falls back to the basis unit when the unit is invalid", () => {
    expect(
      parseReopenQuery("?rate=1&basis=gram&currency=PKR&unit=kg")?.unit,
    ).toBe("gram");
  });
});
