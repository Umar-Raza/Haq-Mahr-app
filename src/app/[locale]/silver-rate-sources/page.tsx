import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { Container } from "@/components/layout/container";
import {
  silverSources,
  sourceKinds,
  type SilverSource,
} from "@/content/silver-sources";
import { isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/interpolate";
import { formatIsoDate } from "@/lib/format-date";
import { localizedHref } from "@/lib/routes";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/silver-rate-sources">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.sourcesTitle,
    description: dict.meta.sourcesDescription,
  };
}

const kindBadge = {
  localMarket: "badge-soft badge-primary",
  benchmark: "badge-soft badge-accent",
  dealer: "badge-soft badge-info",
  // Outline keeps it readable in both themes; soft neutral is nearly invisible in dark.
  spotConverter: "badge-outline border-line text-base-content/80",
} as const;

export default async function SilverRateSourcesPage({
  params,
}: PageProps<"/[locale]/silver-rate-sources">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.silverSources;
  const regionNames = new Intl.DisplayNames([locale], { type: "region" });
  const countries = silverSources.map((country) => ({
    ...country,
    id: `country-${country.region.toLowerCase()}`,
    name: regionNames.of(country.region) ?? country.region,
  }));

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        label={dict.content.breadcrumbLabel}
        items={[
          { label: dict.content.home, href: localizedHref(locale, "") },
          { label: t.heading },
        ]}
      />
      <h1 className="mt-4 text-3xl font-semibold">{t.heading}</h1>
      <p className="mt-3 max-w-3xl leading-8 text-muted">{t.intro}</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section
          aria-labelledby="notes-heading"
          className="rounded-box border border-warning/40 bg-warning/10 p-5"
        >
          <h2 id="notes-heading" className="font-semibold">
            {t.notesTitle}
          </h2>
          <ul className="mt-3 grid list-disc gap-2 ps-5 text-sm leading-6">
            {t.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <Link
            href={localizedHref(locale, "/guides/checking-silver-rates")}
            className="link link-primary mt-3 inline-block text-sm font-medium"
          >
            {t.guideLink}
          </Link>
        </section>
        <section
          aria-labelledby="kinds-heading"
          className="rounded-box border border-line bg-base-100 p-5"
        >
          <h2 id="kinds-heading" className="font-semibold">
            {t.kindsTitle}
          </h2>
          <dl className="mt-3 grid gap-3 text-sm">
            {sourceKinds.map((kind) => (
              <div key={kind} className="flex flex-col items-start gap-1">
                <dt>
                  <span className={`badge badge-sm ${kindBadge[kind]}`}>
                    {t.kinds[kind].label}
                  </span>
                </dt>
                <dd className="leading-6 text-muted">{t.kinds[kind].help}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <nav aria-labelledby="jump-heading" className="mt-8">
        <h2 id="jump-heading" className="text-sm font-semibold">
          {t.jumpTo}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {countries.map((country) => (
            <li key={country.region}>
              <a
                href={`#${country.id}`}
                className="btn btn-sm btn-outline border-line font-normal"
              >
                {country.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 grid gap-10">
        {countries.map((country) => (
          <section
            key={country.region}
            id={country.id}
            aria-labelledby={`${country.id}-heading`}
            className="scroll-mt-20"
          >
            <h2
              id={`${country.id}-heading`}
              className="border-b border-line pb-2 text-xl font-semibold"
            >
              {country.name}
            </h2>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {country.sources.map((source) => (
                <SourceCard
                  key={source.url}
                  source={source}
                  locale={locale}
                  t={t}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start gap-4 rounded-box bg-base-200 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{t.suggest}</p>
        <Link href={localizedHref(locale, "")} className="btn btn-primary">
          {t.calculatorLink}
        </Link>
      </div>
    </Container>
  );
}

function SourceCard({
  source,
  locale,
  t,
}: {
  source: SilverSource;
  locale: Locale;
  t: Dictionary["silverSources"];
}) {
  const host = new URL(source.url).hostname.replace(/^www\./, "");
  return (
    <li className="flex flex-col gap-3 rounded-box border border-line bg-base-100 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`badge badge-sm ${kindBadge[source.kind]}`}>
          {t.kinds[source.kind].label}
        </span>
      </div>
      <h3 className="text-lg font-semibold" lang="en">
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover link-primary"
        >
          {source.name}
          <span className="sr-only"> ({t.newTab})</span>
        </a>
      </h3>
      <p className="text-sm leading-6 text-muted">
        {source.description[locale]}
      </p>
      <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-muted">{t.currency}</dt>
        <dd className="font-medium">{source.currency}</dd>
        <dt className="text-muted">{t.units}</dt>
        <dd>
          {new Intl.ListFormat(locale, { type: "unit", style: "short" }).format(
            source.units.map((unit) => t.unitNames[unit]),
          )}
        </dd>
      </dl>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-xs text-muted">
        <span dir="ltr">{host}</span>
        <span>
          {interpolate(t.reviewed, {
            date: formatIsoDate(locale, source.reviewed),
          })}
        </span>
      </div>
    </li>
  );
}
