import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { Container } from "@/components/layout/container";
import { BookingForm, type CountryGroup } from "@/components/qazi/booking-form";
import { QAZI_WHATSAPP, SITE_DOMAIN } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedHref } from "@/lib/routes";
import { commonCountryCodes, countryCodes, type CountryCode } from "@/lib/qazi/countries";
import { normalizeSearch } from "@/lib/qazi/country-search";

// Built on the server so option text never differs between server and client ICU data
// (same reasoning as the currency groups on the calculator page).
function countryGroups(locale: Locale, t: Dictionary["qazi"]): CountryGroup[] {
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const nameOf = (code: string) => names.of(code) ?? code;
  const option = (code: CountryCode) => {
    const name = nameOf(code);
    return { code, name, search: normalizeSearch(`${code} ${name}`) };
  };
  const common = new Set(commonCountryCodes);
  const collator = new Intl.Collator(locale);
  const rest = countryCodes
    .filter((code) => !common.has(code))
    .map(option)
    .sort((a, b) => collator.compare(a.name, b.name));
  return [
    { label: t.countryCommon, options: commonCountryCodes.map(option) },
    { label: t.countryAll, options: rest },
  ];
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/online-qazi">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || QAZI_WHATSAPP === null) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.qaziTitle,
    description: dict.meta.qaziDescription,
  };
}

export default async function OnlineQaziPage({
  params,
}: PageProps<"/[locale]/online-qazi">) {
  const { locale } = await params;
  // Unpublished until the owner sets the booking number in src/content/site.ts.
  if (!isLocale(locale) || QAZI_WHATSAPP === null) notFound();
  const dict = getDictionary(locale);
  const t = dict.qazi;

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        label={dict.content.breadcrumbLabel}
        items={[
          { label: dict.content.home, href: localizedHref(locale, "") },
          { label: t.heading },
        ]}
      />
      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-semibold">{t.heading}</h1>
        <p className="mt-3 text-lg leading-8 text-muted">{t.intro}</p>
      </header>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <BookingForm
            locale={locale}
            number={QAZI_WHATSAPP}
            domain={SITE_DOMAIN}
            countryGroups={countryGroups(locale, t)}
            texts={t}
          />
        </div>

        <aside className="grid gap-6 lg:col-span-2">
          <section
            aria-labelledby="qazi-steps-heading"
            className="rounded-box border border-line bg-base-100 p-5 sm:p-6"
          >
            <h2 id="qazi-steps-heading" className="text-lg font-semibold">
              {t.stepsTitle}
            </h2>
            <ol className="mt-4 grid gap-4">
              {t.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-0.5 leading-6">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby="qazi-notes-heading"
            className="rounded-box border border-warning/40 bg-warning/10 p-5 sm:p-6"
          >
            <h2 id="qazi-notes-heading" className="text-lg font-semibold">
              {t.notesTitle}
            </h2>
            <ul className="mt-3 grid list-disc gap-2 ps-5 text-sm leading-6">
              {t.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </Container>
  );
}
