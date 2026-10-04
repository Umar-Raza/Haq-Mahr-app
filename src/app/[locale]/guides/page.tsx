import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { Container } from "@/components/layout/container";
import { guides } from "@/content/guides";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedHref } from "@/lib/routes";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/guides">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.guidesTitle,
    description: dict.meta.guidesDescription,
  };
}

export default async function GuidesPage({
  params,
}: PageProps<"/[locale]/guides">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.content;

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        label={t.breadcrumbLabel}
        items={[
          { label: t.home, href: localizedHref(locale, "") },
          { label: t.guidesHeading },
        ]}
      />
      <h1 className="mt-4 text-3xl font-semibold">{t.guidesHeading}</h1>
      <p className="mt-3 max-w-2xl text-muted">{t.guidesIntro}</p>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {guides.map((guide) => {
          const content = guide.content[locale];
          return (
            <li key={guide.slug}>
              <Link
                href={localizedHref(locale, `/guides/${guide.slug}`)}
                className="group flex h-full flex-col items-start gap-3 rounded-box border border-line bg-base-100 p-5 transition-colors hover:border-primary"
              >
                {guide.religious ? (
                  <span className="badge badge-soft badge-accent badge-sm">
                    {t.religiousBadge}
                  </span>
                ) : null}
                <h2 className="text-lg font-semibold group-hover:text-primary">
                  {content.title}
                </h2>
                <p className="text-sm leading-7 text-muted">
                  {content.summary}
                </p>
                <span className="mt-auto text-sm font-medium text-primary">
                  {t.readGuide}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
