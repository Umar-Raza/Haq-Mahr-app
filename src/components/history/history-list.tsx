"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LoadingRegion, Skeleton } from "@/components/ui/skeleton";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { interpolate } from "@/i18n/interpolate";
import { CALCULATION_VERSION } from "@/lib/calc/calculate";
import { formatDateTime, formatMoney } from "@/lib/format";
import {
  removeEntry,
  reopenQuery,
  restoreEntry,
  type HistoryEntry,
} from "@/lib/history/schema";
import { currentEntries, useHistory, writeHistory } from "@/lib/history/store";
import { localizedHref } from "@/lib/routes";

type Texts = {
  history: Dictionary["history"];
  receipt: Pick<Dictionary["receipt"], "ratePerTola" | "ratePerGram">;
  loading: string;
};

type Status =
  | { tone: "success" | "error"; text: string }
  | { tone: "undo"; text: string; entry: HistoryEntry; index: number };

export function HistoryList({
  locale,
  texts,
}: {
  locale: Locale;
  texts: Texts;
}) {
  const t = texts.history;
  const history = useHistory();
  const [status, setStatus] = useState<Status | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 6000);
    return () => clearTimeout(timer);
  }, [status]);

  if (history.status === "loading") {
    return (
      <LoadingRegion label={texts.loading}>
        <div className="grid gap-3">
          {[0, 1, 2].map((key) => (
            <Skeleton key={key} className="h-32 w-full" />
          ))}
        </div>
      </LoadingRegion>
    );
  }

  if (history.status === "unavailable") {
    return (
      <div role="alert" className="alert alert-warning">
        {t.unavailable}
      </div>
    );
  }

  const { entries, corrupted } = history;

  function remove(entry: HistoryEntry) {
    const latest = currentEntries();
    const index = latest.findIndex((e) => e.id === entry.id);
    if (!writeHistory(removeEntry(latest, entry.id))) {
      setStatus({ tone: "error", text: t.writeFailed });
      return;
    }
    setStatus({ tone: "undo", text: t.deleted, entry, index });
    listHeadingRef.current?.focus();
  }

  function undo(entry: HistoryEntry, index: number) {
    const ok = writeHistory(restoreEntry(currentEntries(), entry, index));
    setStatus(ok ? null : { tone: "error", text: t.writeFailed });
  }

  function clearAll() {
    dialogRef.current?.close();
    setStatus(
      writeHistory([])
        ? { tone: "success", text: t.cleared }
        : { tone: "error", text: t.writeFailed },
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {corrupted ? (
        <div role="alert" className="alert alert-warning">
          {t.corrupted}
        </div>
      ) : null}

      {entries.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-box border border-dashed border-line px-6 py-12 text-center">
          <svg
            className="size-10 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 7v5l3 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z" />
          </svg>
          <h2 className="text-lg font-semibold">{t.emptyTitle}</h2>
          <p className="max-w-md text-sm text-muted">{t.emptyBody}</p>
          <Link href={localizedHref(locale, "")} className="btn btn-primary">
            {t.goToCalculator}
          </Link>
        </div>
      ) : (
        <section aria-labelledby="history-list-heading">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2
              id="history-list-heading"
              ref={listHeadingRef}
              tabIndex={-1}
              className="font-semibold outline-none"
            >
              {interpolate(t.count, { count: String(entries.length) })}
            </h2>
            <button
              type="button"
              className="btn btn-outline btn-error btn-sm"
              onClick={() => dialogRef.current?.showModal()}
            >
              {t.clearAll}
            </button>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {entries.map((entry) => (
              <HistoryCard
                key={entry.id}
                entry={entry}
                locale={locale}
                texts={texts}
                onDelete={() => remove(entry)}
              />
            ))}
          </ul>
        </section>
      )}

      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="clear-history-title"
      >
        <div className="modal-box">
          <h2 id="clear-history-title" className="text-lg font-semibold">
            {t.clearTitle}
          </h2>
          <p className="mt-2 text-sm text-muted">{t.clearBody}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">{t.cancel}</button>
            </form>
            <button type="button" className="btn btn-error" onClick={clearAll}>
              {t.clearConfirm}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button tabIndex={-1}>{t.cancel}</button>
        </form>
      </dialog>

      {/* Always mounted so screen readers announce updates. */}
      <div role="status" className="toast toast-center toast-bottom z-50">
        {status ? (
          <div
            className={`alert ${
              status.tone === "error" ? "alert-error" : "alert-success"
            } text-sm shadow-lg`}
          >
            <span>{status.text}</span>
            {status.tone === "undo" ? (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => undo(status.entry, status.index)}
              >
                {t.undo}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function HistoryCard({
  entry,
  locale,
  texts,
  onDelete,
}: {
  entry: HistoryEntry;
  locale: Locale;
  texts: Texts;
  onDelete: () => void;
}) {
  const t = texts.history;
  const date = formatDateTime(locale, new Date(entry.savedAt));
  const rateDecimals = entry.rate.split(".")[1]?.length ?? 0;
  const rate = interpolate(
    entry.basis === "tola"
      ? texts.receipt.ratePerTola
      : texts.receipt.ratePerGram,
    {
      rate: formatMoney(
        locale,
        entry.currency,
        entry.rate,
        Math.max(entry.fractionDigits, rateDecimals),
      ),
    },
  );
  const outdated = entry.calculationVersion !== CALCULATION_VERSION;

  return (
    <li className="flex flex-col gap-3 rounded-box border border-line bg-base-100 p-4">
      <div>
        <p className="text-2xl font-semibold tabular-nums">
          {formatMoney(
            locale,
            entry.currency,
            entry.amount,
            entry.fractionDigits,
          )}
        </p>
        <p className="mt-1 text-sm">{rate}</p>
        <p className="mt-1 text-xs text-muted">
          {interpolate(t.savedOn, { date })}
        </p>
        {outdated ? (
          <p className="mt-2 text-xs text-warning">
            {interpolate(t.olderMethod, {
              version: entry.calculationVersion,
            })}
          </p>
        ) : null}
      </div>
      <div className="mt-auto flex gap-2">
        <Link
          href={`${localizedHref(locale, "")}${reopenQuery(entry)}`}
          className="btn btn-primary btn-sm flex-1"
        >
          {t.open}
        </Link>
        <button
          type="button"
          className="btn btn-ghost btn-sm text-error"
          aria-label={interpolate(t.deleteLabel, { date })}
          onClick={onDelete}
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
          </svg>
          <span aria-hidden="true">{t.deleteOne}</span>
        </button>
      </div>
    </li>
  );
}
