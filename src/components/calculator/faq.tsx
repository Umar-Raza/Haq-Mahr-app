import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { localizedHref } from "@/lib/routes";

/** Static FAQ shown below the calculator and receipt. Answers use native <details>, so no JS is needed. */
export function Faq({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["faq"];
}) {
  return (
    <section aria-labelledby="faq-heading" className="print:hidden">
      <h2 id="faq-heading" className="text-center text-2xl font-semibold">
        {dict.heading}
      </h2>
      <div className="mt-5 grid gap-2">
        {dict.items.map((item) => (
          <details
            key={item.question}
            className="collapse collapse-arrow rounded-box border border-line bg-base-100"
          >
            <summary className="collapse-title font-medium">
              {item.question}
            </summary>
            <div className="collapse-content">
              <p className="max-w-3xl leading-7 text-muted">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
      <p className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
        <Link
          href={localizedHref(locale, "/guides")}
          className="link link-primary"
        >
          {dict.guidesLink}
        </Link>
        <Link
          href={localizedHref(locale, "/silver-rate-sources")}
          className="link link-primary"
        >
          {dict.sourcesLink}
        </Link>
      </p>
    </section>
  );
}
