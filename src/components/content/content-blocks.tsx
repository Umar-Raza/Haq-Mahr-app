import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { CONTACT_EMAIL } from "@/content/site";
import type { Block, Section } from "@/content/types";
import { localizedHref } from "@/lib/routes";

function BlockView({ block, locale }: { block: Block; locale: Locale }) {
  switch (block.type) {
    case "p":
      return <p className="leading-8">{block.text}</p>;
    case "ul":
      return (
        <ul className="grid list-disc gap-2 ps-6 leading-7 marker:text-accent">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="grid list-decimal gap-2 ps-6 leading-7 marker:font-semibold marker:text-primary">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "note":
      return (
        <p
          role="note"
          className={`alert alert-soft text-sm leading-7 ${
            block.tone === "warning" ? "alert-warning" : "alert-info"
          }`}
        >
          {block.text}
        </p>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-box border border-line">
          <table className="table">
            <caption className="sr-only">{block.caption}</caption>
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={cell} scope="row" className="font-medium">
                        {cell}
                      </th>
                    ) : (
                      <td key={cell} className="tabular-nums">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "link":
      return (
        <p>
          <Link
            href={localizedHref(locale, block.path)}
            className="link link-primary font-medium"
          >
            {block.text}
          </Link>
        </p>
      );
    case "email":
      return CONTACT_EMAIL ? (
        <p className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{block.label}</span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="link link-primary"
            dir="ltr"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      ) : null;
  }
}

export function ContentSections({
  sections,
  locale,
}: {
  sections: Section[];
  locale: Locale;
}) {
  return (
    <div className="grid gap-10">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="grid scroll-mt-20 gap-4"
        >
          <h2 id={`${section.id}-heading`} className="text-xl font-semibold">
            {section.heading}
          </h2>
          {section.blocks.map((block, index) => (
            <BlockView key={index} block={block} locale={locale} />
          ))}
        </section>
      ))}
    </div>
  );
}
