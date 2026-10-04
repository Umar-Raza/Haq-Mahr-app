"use client";

import { useSyncExternalStore } from "react";
import {
  HISTORY_STORAGE_KEY,
  parseHistory,
  serializeHistory,
  type HistoryEntry,
} from "./schema";

export type HistorySnapshot =
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "ready"; entries: HistoryEntry[]; corrupted: boolean };

const CHANGE_EVENT = "hmf-history-change";
const LOADING: HistorySnapshot = { status: "loading" };
const UNAVAILABLE: HistorySnapshot = { status: "unavailable" };

// getSnapshot must return the same object while storage is unchanged.
let cachedRaw: string | null | undefined;
let cached: HistorySnapshot = LOADING;

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getSnapshot(): HistorySnapshot {
  const store = storage();
  if (!store) return UNAVAILABLE;
  let raw: string | null;
  try {
    raw = store.getItem(HISTORY_STORAGE_KEY);
  } catch {
    return UNAVAILABLE;
  }
  if (raw !== cachedRaw || cached.status !== "ready") {
    cachedRaw = raw;
    cached = { status: "ready", ...parseHistory(raw) };
  }
  return cached;
}

const getServerSnapshot = () => LOADING;

function subscribe(onChange: () => void): () => void {
  // `storage` fires for other tabs; the custom event covers this tab.
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === HISTORY_STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function useHistory(): HistorySnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Returns false when the browser refuses to store (private mode, quota, blocked storage). */
export function writeHistory(entries: HistoryEntry[]): boolean {
  const store = storage();
  if (!store) return false;
  try {
    if (entries.length === 0) store.removeItem(HISTORY_STORAGE_KEY);
    else store.setItem(HISTORY_STORAGE_KEY, serializeHistory(entries));
  } catch {
    return false;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return true;
}

/** Reads fresh from storage so a write never overwrites another tab's newer data. */
export function currentEntries(): HistoryEntry[] {
  const snapshot = getSnapshot();
  return snapshot.status === "ready" ? snapshot.entries : [];
}

export function newEntryId(): string {
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
