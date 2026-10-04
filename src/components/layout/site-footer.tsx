import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { footerItems, localizedHref } from "@/lib/routes";
import { Container } from "./container";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="border-t border-line bg-base-100 print:hidden">
      <Container className="flex flex-col items-center gap-4 py-8 text-center text-sm text-muted">
        <div aria-hidden="true" className="h-px w-12 bg-accent" />
        <nav aria-label={dict.footer.links.label}>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={localizedHref(locale, item.path)}
                  className="link-hover hover:text-primary"
                >
                  {dict.footer.links[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="max-w-2xl">{dict.footer.disclaimer}</p>
        <p>
          © {new Date().getFullYear()} {dict.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
