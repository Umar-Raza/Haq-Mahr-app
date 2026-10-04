import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { TocList } from "@/components/content/toc-list";
import { ContentSections } from "@/components/content/content-blocks";
import { Container } from "@/components/layout/container";
import { getGuide, guides } from "@/content/guides";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/interpolate";
import { METHODOLOGY_REVIEWED_ON } from "@/lib/calc/sources";
import { formatIsoDate } from "@/lib/format-date";
import { localizedHref } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    guides.map((guide) => ({ locale, slug: guide.slug })),
  );
}

// A table of contents only helps on longer guides.
const TOC_MIN_SECTIONS = 4;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/guides/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!isLocale(locale) || !guide) return {};
  const content = guide.content[locale];
  return {
    title: `${content.title} — ${getDictionary(locale).meta.siteName}`,
    description: content.description,
  };
}

export default async function GuidePage({
  params,
}: PageProps<"/[locale]/guides/[slug]">) {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!isLocale(locale) || !guide) notFound();
  const dict = getDictionary(locale);
  const t = dict.content;
  const content = guide.content[locale];
  const related = guide.related.flatMap((s) => getGuide(s) ?? []);
  const showToc = content.sections.length >= TOC_MIN_SECTIONS;

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        label={t.breadcrumbLabel}
        items={[
          { label: t.home, href: localizedHref(locale, "") },
          { label: t.guidesHeading, href: localizedHref(locale, "/guides") },
          { label: content.title },
        ]}
      />

      <div
        className={`mt-4 grid gap-8 ${
          showToc ? "lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12" : ""
        }`}
      >
        <article className="min-w-0 max-w-3xl">
          <header className="border-b border-line pb-6">
            <h1 className="text-3xl font-semibold">{content.title}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span>
                {interpolate(t.updated, {
                  date: formatIsoDate(locale, guide.updated),
                })}
              </span>
              {guide.religious ? (
                <span className="badge badge-soft badge-accent badge-sm">
                  {t.religiousBadge}
                </span>
              ) : null}
            </p>
            <p className="mt-4 text-lg leading-8 text-muted">{content.intro}</p>
          </header>

          {showToc ? (
            <nav
              aria-labelledby="toc-heading-mobile"
              className="mt-6 rounded-box border border-line bg-base-100 p-4 lg:hidden"
            >
              <TocList
                headingId="toc-heading-mobile"
                heading={t.onThisPage}
                sections={content.sections}
              />
            </nav>
          ) : null}

          <div className="mt-8">
            <ContentSections sections={content.sections} locale={locale} />
          </div>

          {guide.sources.length > 0 ? (
            <section
              aria-labelledby="sources-heading"
              className="mt-10 rounded-box border border-line bg-base-200 p-5"
            >
              <h2 id="sources-heading" className="font-semibold">
                {t.sources}
              </h2>
              <ul className="mt-3 grid gap-2 text-sm">
                {guide.sources.map((source) => (
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
                    <span className="sr-only"> ({t.newTab})</span>
                    {source.notOpened ? (
                      <span className="mt-0.5 block text-xs text-warning">
                        {t.sourceNotOpened}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted">
                {interpolate(t.sourcesNote, {
                  date: formatIsoDate(locale, METHODOLOGY_REVIEWED_ON),
                })}
              </p>
              {guide.religious ? (
                <div
                  role="note"
                  className="alert alert-warning alert-soft mt-4 text-sm"
                >
                  <div>
                    <p className="font-semibold">{t.reviewTitle}</p>
                    <p className="mt-1">{t.reviewReligious}</p>
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}

          <aside
            aria-labelledby="cta-heading"
            className="mt-10 flex flex-col items-start gap-4 rounded-box bg-primary p-6 text-primary-content sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 id="cta-heading" className="text-lg font-semibold">
                {t.ctaTitle}
              </h2>
              <p className="mt-1 text-sm opacity-90">{t.ctaBody}</p>
            </div>
            <Link
              href={localizedHref(locale, "")}
              className="btn shrink-0 border-0 bg-base-100 text-primary hover:bg-base-200"
            >
              {t.ctaButton}
            </Link>
          </aside>

          {related.length > 0 ? (
            <section aria-labelledby="related-heading" className="mt-10">
              <h2 id="related-heading" className="text-xl font-semibold">
                {t.related}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={localizedHref(locale, `/guides/${item.slug}`)}
                      className="flex h-full flex-col gap-2 rounded-box border border-line bg-base-100 p-4 transition-colors hover:border-primary"
                    >
                      <span className="font-semibold">
                        {item.content[locale].title}
                      </span>
                      <span className="text-sm leading-6 text-muted">
                        {item.content[locale].summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>

        {showToc ? (
          <nav aria-labelledby="toc-heading" className="hidden lg:block">
            <div className="sticky top-6 rounded-box border border-line bg-base-100 p-4">
              <TocList
                headingId="toc-heading"
                heading={t.onThisPage}
                sections={content.sections}
              />
            </div>
          </nav>
        ) : null}
      </div>
    </Container>
  );
}
