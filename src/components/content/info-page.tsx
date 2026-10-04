import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import {
  infoPages,
  isInfoPagePublished,
  type InfoPageSlug,
} from "@/content/pages";
import { INFO_PAGES_UPDATED_ON } from "@/content/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/interpolate";
import { formatIsoDate } from "@/lib/format-date";
import { localizedHref } from "@/lib/routes";
import { Breadcrumbs } from "./breadcrumbs";
import { ContentSections } from "./content-blocks";

type Props = { params: Promise<{ locale: string }> };

export function infoPageMetadata(slug: InfoPageSlug) {
  return async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale) || !isInfoPagePublished(slug)) return {};
    const page = infoPages[slug][locale];
    return {
      title: `${page.title} — ${getDictionary(locale).meta.siteName}`,
      description: page.description,
    };
  };
}

export function infoPageRoute(slug: InfoPageSlug) {
  return async function InfoPage({ params }: Props) {
    const { locale } = await params;
    if (!isLocale(locale) || !isInfoPagePublished(slug)) notFound();
    const dict = getDictionary(locale);
    const page = infoPages[slug][locale];

    return (
      <Container className="py-10 sm:py-14">
        <article className="mx-auto max-w-3xl">
          <Breadcrumbs
            label={dict.content.breadcrumbLabel}
            items={[
              { label: dict.content.home, href: localizedHref(locale, "") },
              { label: page.title },
            ]}
          />
          <header className="mt-4 border-b border-line pb-6">
            <h1 className="text-3xl font-semibold">{page.title}</h1>
            <p className="mt-2 text-sm text-muted">
              {interpolate(dict.content.updated, {
                date: formatIsoDate(locale, INFO_PAGES_UPDATED_ON),
              })}
            </p>
            <p className="mt-4 text-lg leading-8 text-muted">{page.intro}</p>
          </header>
          <div className="mt-8">
            <ContentSections sections={page.sections} locale={locale} />
          </div>
        </article>
      </Container>
    );
  };
}
