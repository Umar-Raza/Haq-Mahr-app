import Link from "next/link";
import { isQaziPublished } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { localizedHref } from "@/lib/routes";

/** Home-page banner for the Online Qazi page; renders nothing until that page is published. */
export function QaziCta({
  locale,
  texts,
}: {
  locale: Locale;
  texts: Dictionary["qazi"];
}) {
  if (!isQaziPublished) return null;
  return (
    <section
      aria-labelledby="qazi-cta-heading"
      className="flex flex-col items-center gap-4 rounded-box border border-primary/20 bg-primary/5 p-6 text-center sm:flex-row sm:justify-between sm:text-start print:hidden"
    >
      <div>
        <h2 id="qazi-cta-heading" className="text-lg font-semibold">
          {texts.homeTitle}
        </h2>
        <p className="mt-1 text-muted">{texts.homeBody}</p>
      </div>
      <Link
        href={localizedHref(locale, "/online-qazi")}
        className="btn btn-primary shrink-0"
      >
        {texts.cta}
      </Link>
    </section>
  );
}
