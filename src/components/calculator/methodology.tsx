import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { interpolate } from "@/i18n/interpolate";
import { formatIsoDate } from "@/lib/format-date";
import { roundHalfUp, toFixedString, toPlainString } from "@/lib/calc/decimal";
import {
  METHODOLOGY_REVIEWED_ON,
  methodologySources,
} from "@/lib/calc/sources";
import {
  GRAMS_PER_TOLA,
  REFERENCE_GRAMS,
  REFERENCE_GRAMS_DISPLAY_DIGITS,
  REFERENCE_MASHA,
  REFERENCE_TOLA,
} from "@/lib/calc/units";

const values = {
  masha: toPlainString(REFERENCE_MASHA),
  tola: toPlainString(REFERENCE_TOLA),
  grams: toFixedString(
    roundHalfUp(REFERENCE_GRAMS, REFERENCE_GRAMS_DISPLAY_DIGITS),
  ),
  gramsExact: toPlainString(REFERENCE_GRAMS),
  gramsPerTola: toPlainString(GRAMS_PER_TOLA),
};

export function Methodology({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["methodology"];
}) {
  const reviewed = formatIsoDate(locale, METHODOLOGY_REVIEWED_ON);

  return (
    <section
      aria-labelledby="methodology-heading"
      className="rounded-box border border-line bg-base-100 p-5 sm:p-6"
    >
      <h2 id="methodology-heading" className="text-xl font-semibold">
        {dict.heading}
      </h2>

      <dl className="mt-4 grid gap-4">
        <div>
          <dt className="font-medium">{dict.referenceLabel}</dt>
          <dd className="mt-1 text-muted">
            {interpolate(dict.reference, values)}
          </dd>
        </div>
        <div>
          <dt className="font-medium">{dict.formulaLabel}</dt>
          <dd className="mt-1 grid gap-1">
            <span className="w-fit rounded-field bg-base-200 px-2 py-1 text-sm">
              {interpolate(dict.formulaTola, values)}
            </span>
            <span className="w-fit rounded-field bg-base-200 px-2 py-1 text-sm">
              {interpolate(dict.formulaGram, values)}
            </span>
            <span className="text-sm text-muted">
              {interpolate(dict.units, values)}
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-medium">{dict.roundingLabel}</dt>
          <dd className="mt-1 text-muted">{dict.rounding}</dd>
        </div>
        <div>
          <dt className="font-medium">{dict.differencesLabel}</dt>
          <dd className="mt-1 text-muted">{dict.differences}</dd>
        </div>
        <div>
          <dt className="font-medium">
            {interpolate(dict.sourcesLabel, { date: reviewed })}
          </dt>
          <dd className="mt-1">
            <ul className="grid gap-1 text-sm">
              {methodologySources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    lang="en"
                    className="link link-primary"
                  >
                    {source.title}
                  </a>
                  <span lang="en" className="text-muted">
                    {" "}
                    — {source.publisher}
                  </span>
                  <span className="sr-only"> ({dict.newTab})</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <p role="note" className="alert alert-info alert-soft mt-5 text-sm">
        {dict.disclaimer}
      </p>
    </section>
  );
}
