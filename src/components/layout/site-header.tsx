import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { localizedHref, navItems } from "@/lib/routes";
import { Container } from "./container";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const items = navItems.map((item) => ({
    path: item.path,
    label: dict.nav[item.key],
  }));

  return (
    <header className="relative border-b border-line bg-base-100">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link
          href={localizedHref(locale, "")}
          className="flex items-center gap-2 whitespace-nowrap text-base font-semibold text-primary"
        >
          <span
            aria-hidden="true"
            className="inline-block size-2.5 rotate-45 bg-accent"
          />
          {dict.meta.siteName}
        </Link>

        <nav aria-label={dict.nav.label} className="hidden lg:block">
          <NavLinks locale={locale} items={items} orientation="horizontal" />
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher current={locale} label={dict.nav.language} />
          <ThemeToggle label={dict.theme.darkMode} />
          <MobileMenu
            locale={locale}
            items={items}
            labels={{
              nav: dict.nav.label,
              openMenu: dict.nav.openMenu,
              closeMenu: dict.nav.closeMenu,
            }}
          />
        </div>
      </Container>
    </header>
  );
}
