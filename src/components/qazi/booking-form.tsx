"use client";

import { useId, useMemo, useRef, useState, type ReactNode } from "react";
import { CountryPicker } from "@/components/qazi/country-picker";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { interpolate } from "@/i18n/interpolate";
import { formatIsoDate } from "@/lib/format-date";
import {
  BOOKING_LIMITS,
  buildBookingMessage,
  validateBooking,
  whatsappChatHref,
  type BookingErrors,
  type BookingField,
  type BookingInput,
} from "@/lib/qazi/booking";
import { callingCodes, type CountryCode } from "@/lib/qazi/countries";
import type { CountryGroup } from "@/lib/qazi/country-search";

export type { CountryGroup, CountryOption } from "@/lib/qazi/country-search";

const fieldOrder: BookingField[] = [
  "husbandName",
  "brideName",
  "country",
  "date",
  "email",
  "whatsapp",
  "note",
];
// Fields whose only error is "tooLong", so the error text needs a character limit.
const lengthLimited = ["husbandName", "brideName", "email", "whatsapp", "note"] as const;

/** Visitor's local calendar date as YYYY-MM-DD. */
function localToday(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Collects booking details and opens WhatsApp with them written out. Nothing is sent to a server. */
export function BookingForm({
  locale,
  number,
  domain,
  countryGroups,
  texts,
}: {
  locale: Locale;
  number: string;
  domain: string;
  countryGroups: CountryGroup[];
  texts: Dictionary["qazi"];
}) {
  const ids = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [input, setInput] = useState<BookingInput>({
    husbandName: "",
    brideName: "",
    country: "",
    date: "",
    time: "",
    email: "",
    whatsappCountry: "PK",
    whatsapp: "",
    note: "",
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const countryName = useMemo(() => {
    const found = countryGroups
      .flatMap((group) => group.options)
      .find((option) => option.code === input.country);
    return found?.name ?? "";
  }, [countryGroups, input.country]);

  const fieldId = (field: BookingField | "time" | "whatsappCountry") =>
    `${ids}-${field}`;
  const errorId = (field: BookingField) => `${ids}-${field}-error`;

  function update<K extends keyof BookingInput>(key: K, value: BookingInput[K]) {
    const next = { ...input, [key]: value };
    setInput(next);
    // Once the visitor has tried to send, keep errors in sync as they fix them.
    if (submitted) setErrors(validateBooking(next, localToday()));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const found = validateBooking(input, localToday());
    setErrors(found);
    const first = fieldOrder.find((field) => found[field]);
    if (first) {
      formRef.current
        ?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(first))}`)
        ?.focus();
      return;
    }
    const message = buildBookingMessage(
      input,
      {
        ...texts.message,
        footer: interpolate(texts.message.footer, { site: domain }),
      },
      {
        date: input.date ? formatIsoDate(locale, input.date) : null,
        countryName,
        whatsappDial: callingCodes[input.whatsappCountry],
      },
    );
    const href = whatsappChatHref(number, message);
    const opened = window.open(href, "_blank");
    if (opened) opened.opener = null;
    else window.location.assign(href);
  }

  const errorText = (field: BookingField) => {
    const error = errors[field];
    if (!error) return null;
    const max = (lengthLimited as readonly string[]).includes(field)
      ? BOOKING_LIMITS[field as (typeof lengthLimited)[number]]
      : 0;
    return (
      <p id={errorId(field)} className="mt-1 text-sm text-error">
        {interpolate(texts.errors[error], { max: String(max) })}
      </p>
    );
  };

  const describedBy = (field: BookingField, help?: string) =>
    [help, errors[field] ? errorId(field) : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={`${ids}-heading`}
      className="flex flex-col gap-5 rounded-box border border-line bg-base-100 p-5 sm:p-6"
    >
      <h2 id={`${ids}-heading`} className="text-xl font-semibold">
        {texts.formTitle}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fieldId("husbandName")} label={texts.husbandNameLabel}>
          <input
            id={fieldId("husbandName")}
            type="text"
            placeholder={texts.husbandNamePlaceholder}
            maxLength={BOOKING_LIMITS.husbandName + 20}
            value={input.husbandName}
            onChange={(event) => update("husbandName", event.target.value)}
            aria-invalid={Boolean(errors.husbandName)}
            aria-describedby={describedBy("husbandName")}
            className={`input w-full ${errors.husbandName ? "input-error" : ""}`}
          />
          {errorText("husbandName")}
        </Field>

        <Field id={fieldId("brideName")} label={texts.brideNameLabel}>
          <input
            id={fieldId("brideName")}
            type="text"
            placeholder={texts.brideNamePlaceholder}
            maxLength={BOOKING_LIMITS.brideName + 20}
            value={input.brideName}
            onChange={(event) => update("brideName", event.target.value)}
            aria-invalid={Boolean(errors.brideName)}
            aria-describedby={describedBy("brideName")}
            className={`input w-full ${errors.brideName ? "input-error" : ""}`}
          />
          {errorText("brideName")}
        </Field>
      </div>

      <Field id={fieldId("country")} label={texts.countryLabel}>
        <CountryPicker
          id={fieldId("country")}
          invalid={Boolean(errors.country)}
          describedBy={describedBy("country")}
          groups={countryGroups}
          value={input.country}
          onChange={(code) => update("country", code)}
          texts={{
            placeholder: texts.countryPlaceholder,
            search: texts.countrySearch,
            noResults: texts.countryNoResults,
          }}
        />
        {errorText("country")}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fieldId("date")} label={texts.dateLabel}>
          <input
            id={fieldId("date")}
            type="date"
            min={submitted ? localToday() : undefined}
            value={input.date}
            onChange={(event) => update("date", event.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={describedBy("date")}
            className={`input w-full ${errors.date ? "input-error" : ""}`}
          />
          {errorText("date")}
        </Field>

        <Field id={fieldId("time")} label={texts.timeLabel} optional={texts.optional}>
          <input
            id={fieldId("time")}
            type="time"
            value={input.time}
            onChange={(event) => update("time", event.target.value)}
            className="input w-full"
          />
        </Field>
      </div>

      <Field id={fieldId("email")} label={texts.emailLabel}>
        <input
          id={fieldId("email")}
          type="email"
          autoComplete="email"
          placeholder={texts.emailPlaceholder}
          maxLength={BOOKING_LIMITS.email + 20}
          value={input.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email")}
          className={`input w-full rtl:text-right ${errors.email ? "input-error" : ""}`}
          dir="ltr"
        />
        {errorText("email")}
      </Field>

      <Field
        id={fieldId("whatsapp")}
        label={texts.whatsappLabel}
        optional={texts.optional}
      >
        <div className="flex gap-2">
          <select
            id={fieldId("whatsappCountry")}
            aria-label={texts.whatsappCountryLabel}
            value={input.whatsappCountry}
            onChange={(event) =>
              update("whatsappCountry", event.target.value as CountryCode)
            }
            className="select w-32 shrink-0 sm:w-40"
          >
            {countryGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.name} {callingCodes[option.code]}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <input
            id={fieldId("whatsapp")}
            type="tel"
            autoComplete="tel-national"
            placeholder={texts.whatsappPlaceholder}
            maxLength={BOOKING_LIMITS.whatsapp + 5}
            value={input.whatsapp}
            onChange={(event) => update("whatsapp", event.target.value)}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={describedBy("whatsapp")}
            className={`input w-full flex-1 rtl:text-right ${errors.whatsapp ? "input-error" : ""}`}
            dir="ltr"
          />
        </div>
        {errorText("whatsapp")}
      </Field>

      <Field id={fieldId("note")} label={texts.noteLabel} optional={texts.optional}>
        <textarea
          id={fieldId("note")}
          rows={3}
          placeholder={texts.notePlaceholder}
          maxLength={BOOKING_LIMITS.note + 50}
          value={input.note}
          onChange={(event) => update("note", event.target.value)}
          aria-invalid={Boolean(errors.note)}
          aria-describedby={describedBy("note")}
          className={`textarea w-full ${errors.note ? "textarea-error" : ""}`}
        />
        {errorText("note")}
      </Field>

      <div className="grid gap-3">
        <button type="submit" className="btn btn-primary btn-lg w-full">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" />
          </svg>
          {texts.submit}
        </button>
        <p className="flex items-start gap-2 text-sm leading-6 text-muted">
          <svg
            className="mt-1 size-4 shrink-0 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {texts.privacyNote}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-2 text-sm font-medium">
        {label}
        {optional ? (
          <span className="text-xs font-normal text-muted">({optional})</span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
