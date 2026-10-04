import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HistoryList } from "@/components/history/history-list";
import { Container } from "@/components/layout/container";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/interpolate";
import { HISTORY_LIMIT } from "@/lib/history/schema";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/history">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  // Personal, browser-only data: nothing useful for search engines to index.
  return {
    title: dict.meta.historyTitle,
    description: dict.meta.historyDescription,
    robots: { index: false, follow: true },
  };
}

export default async function HistoryPage({
  params,
}: PageProps<"/[locale]/history">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.history;

  return (
    <Container className="flex flex-col gap-6 py-10 sm:py-14">
      <div>
        <h1 className="text-3xl font-semibold text-base-content">
          {t.heading}
        </h1>
        <p className="mt-3 max-w-2xl text-muted">{t.intro}</p>
      </div>

      <aside
        aria-labelledby="history-storage-title"
        className="rounded-box border border-line bg-base-200 p-4 text-sm"
      >
        <h2 id="history-storage-title" className="font-semibold">
          {t.storageTitle}
        </h2>
        <ul className="mt-2 grid list-disc gap-1 ps-5 text-muted">
          <li>{t.storageNote}</li>
          <li>{t.privacyNote}</li>
          <li>{interpolate(t.limitNote, { limit: String(HISTORY_LIMIT) })}</li>
        </ul>
      </aside>

      <HistoryList
        locale={locale}
        texts={{
          history: t,
          receipt: {
            ratePerTola: dict.receipt.ratePerTola,
            ratePerGram: dict.receipt.ratePerGram,
          },
          loading: dict.a11y.loading,
        }}
      />
    </Container>
  );
}
