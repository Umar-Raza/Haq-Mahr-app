"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { calculateMahr } from "@/lib/calc/calculate";
import type { Currency } from "@/lib/calc/currencies";
import { rateBases, type RateBasis } from "@/lib/calc/units";
import {
  buildPreviewModel,
  buildReceiptModel,
  weightUnits,
  type WeightUnit,
} from "@/lib/receipt/model";
import type { CurrencyGroup } from "@/lib/currency-search";
import {
  addEntry,
  entryFromResult,
  sameCalculation,
  type ReopenInput,
} from "@/lib/history/schema";
import {
  currentEntries,
  newEntryId,
  useHistory,
  writeHistory,
} from "@/lib/history/store";
import { localizedHref } from "@/lib/routes";
import { CurrencyPicker } from "./currency-picker";
import { Receipt } from "./receipt";
import { ReceiptActions } from "./receipt-actions";

type Props = {
  locale: Locale;
  currencyGroups: CurrencyGroup[];
  defaultCurrency: Currency;
  /** Values reopened from history (URL params); only read on mount. */
  initial?: ReopenInput | null;
  texts: {
    siteName: string;
    calculator: Dictionary["calculator"];
    receipt: Dictionary["receipt"];
    actions: Dictionary["actions"];
  };
};

const basisLabelKey = {
  tola: "basisTola",
  gram: "basisGram",
} as const satisfies Record<RateBasis, keyof Dictionary["calculator"]>;

const unitLabelKey = {
  tola: "unitTola",
  masha: "unitMasha",
  gram: "unitGram",
} as const satisfies Record<WeightUnit, keyof Dictionary["calculator"]>;

export function Calculator({
  locale,
  currencyGroups,
  defaultCurrency,
  initial = null,
  texts,
}: Props) {
  const t = texts.calculator;
  const ids = useId();
  const rateRef = useRef<HTMLInputElement>(null);

  const [rate, setRate] = useState(initial?.rate ?? "");
  const [basis, setBasis] = useState<RateBasis>(initial?.basis ?? "tola");
  const [currency, setCurrency] = useState<Currency>(
    initial?.currency ?? defaultCurrency,
  );
  const [unit, setUnit] = useState<WeightUnit>(initial?.unit ?? "tola");
  const [touched, setTouched] = useState(false);
  // Set from event handlers so the receipt timestamp reflects the last input change.
  const [issuedAt, setIssuedAt] = useState<Date | null>(() =>
    initial ? new Date() : null,
  );

  // The reopen params have been applied; drop them so later edits are not undone by a reload.
  const reopened = initial !== null;
  useEffect(() => {
    if (reopened) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [reopened]);

  const outcome = calculateMahr({ rate, basis, currency });
  const history = useHistory();
  const showError = !outcome.ok && (touched || rate.trim() !== "");
  const model =
    outcome.ok && issuedAt
      ? buildReceiptModel(
          locale,
          { siteName: texts.siteName, receipt: texts.receipt },
          outcome.result,
          unit,
          issuedAt,
        )
      : null;
  const preview = buildPreviewModel(
    locale,
    { siteName: texts.siteName, receipt: texts.receipt },
    unit,
  );

  const touch = () => setIssuedAt(new Date());

  const result = model && outcome.ok ? outcome.result : null;
  const saved =
    result !== null &&
    history.status === "ready" &&
    history.entries.some((entry) =>
      sameCalculation(entry, {
        ...result,
        calculationVersion: result.version,
      }),
    );

  function save(): boolean {
    if (!result) return false;
    const entry = entryFromResult(result, unit, newEntryId(), new Date());
    return writeHistory(addEntry(currentEntries(), entry));
  }

  function reset() {
    setRate("");
    setTouched(false);
    setIssuedAt(null);
    rateRef.current?.focus();
  }

  const rateHelpId = `${ids}-rate-help`;
  const rateErrorId = `${ids}-rate-error`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          setTouched(true);
        }}
        className="flex h-full flex-col rounded-box border border-line bg-base-100 p-5 sm:p-6 print:hidden"
        aria-labelledby={`${ids}-form-heading`}
      >
        <h2 id={`${ids}-form-heading`} className="text-xl font-semibold">
          {t.formHeading}
        </h2>

        <div className="mt-5 flex flex-1 flex-col gap-5">
          <fieldset>
            <legend className="mb-2 text-sm font-medium">{t.basisLabel}</legend>
            <div className="join w-full">
              {rateBases.map((value) => (
                <input
                  key={value}
                  type="radio"
                  name={`${ids}-basis`}
                  value={value}
                  aria-label={t[basisLabelKey[value]]}
                  checked={basis === value}
                  onChange={() => {
                    setBasis(value);
                    setUnit(value === "gram" ? "gram" : "tola");
                    touch();
                  }}
                  className="btn join-item flex-1"
                />
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor={`${ids}-rate`}
              className="mb-2 block text-sm font-medium"
            >
              {t.rateLabel}
            </label>
            <input
              ref={rateRef}
              id={`${ids}-rate`}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              dir="ltr"
              value={rate}
              onChange={(event) => {
                setRate(event.target.value);
                touch();
              }}
              onBlur={() => setTouched(true)}
              aria-invalid={showError}
              aria-describedby={`${rateHelpId}${showError ? ` ${rateErrorId}` : ""}`}
              className={`input input-lg w-full rtl:text-right ${showError ? "input-error" : ""}`}
            />
            <p id={rateHelpId} className="mt-1.5 text-sm text-muted">
              {basis === "tola" ? t.rateHelpTola : t.rateHelpGram}
            </p>
            {showError && !outcome.ok ? (
              <p id={rateErrorId} className="mt-1 text-sm text-error">
                {t.errors[outcome.error]}
              </p>
            ) : null}
          </div>

          <div>
            <label
              id={`${ids}-currency-label`}
              htmlFor={`${ids}-currency`}
              className="mb-2 block text-sm font-medium"
            >
              {t.currencyLabel}
            </label>
            <CurrencyPicker
              id={`${ids}-currency`}
              labelId={`${ids}-currency-label`}
              describedBy={`${ids}-currency-help`}
              groups={currencyGroups}
              value={currency}
              onChange={(code) => {
                setCurrency(code);
                touch();
              }}
              texts={{
                search: t.currencySearch,
                noResults: t.currencyNoResults,
              }}
            />
            <p
              id={`${ids}-currency-help`}
              className="mt-1.5 text-sm text-muted"
            >
              {t.currencyHelp}
            </p>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium">{t.unitLabel}</legend>
            <div className="join w-full">
              {weightUnits.map((value) => (
                <input
                  key={value}
                  type="radio"
                  name={`${ids}-unit`}
                  value={value}
                  aria-label={t[unitLabelKey[value]]}
                  checked={unit === value}
                  onChange={() => setUnit(value)}
                  className="btn btn-sm join-item flex-1"
                />
              ))}
            </div>
          </fieldset>
          <div>
            <button
              type="button"
              className="btn btn-outline btn-block"
              onClick={reset}
            >
              {t.reset}
            </button>
          </div>
          <section
            aria-labelledby={`${ids}-howto-heading`}
            className="mt-auto rounded-box bg-base-200 p-4"
          >
            <h3 id={`${ids}-howto-heading`} className="text-sm font-semibold">
              {t.howToHeading}
            </h3>
            <ol className="mt-3 grid gap-2.5">
              {t.howToSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span
                    aria-hidden="true"
                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-content"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </form>

      <section
        aria-labelledby={`${ids}-result-heading`}
        className="flex h-full flex-col rounded-box border border-line bg-base-100 p-5 sm:p-6"
      >
        <h2
          id={`${ids}-result-heading`}
          className="mb-5 text-xl font-semibold print:hidden"
        >
          {t.resultHeading}
        </h2>
        <p role="status" className="sr-only">
          {model ? `${model.amountLabel}: ${model.amount}` : ""}
        </p>
        <Receipt
          model={model ?? preview}
          hint={model ? undefined : t.emptyResult}
          className="flex-1"
        />
        <ReceiptActions
          model={model}
          texts={texts.actions}
          save={{
            saved,
            onSave: save,
            historyHref: localizedHref(locale, "/history"),
          }}
          fileName={`haq-mahr-${(issuedAt ?? new Date(0)).toISOString().slice(0, 10)}.png`}
        />
      </section>
    </div>
  );
}
