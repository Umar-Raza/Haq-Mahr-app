import { isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { CONTACT_EMAIL } from "@/content/site";

export type NavKey = Exclude<
  keyof Dictionary["nav"],
  "label" | "openMenu" | "closeMenu" | "language"
>;

type NavItem = { key: NavKey; path: string; ready: boolean };

// Flip `ready` when a page ships so the nav never links to a 404.
const allNavItems: readonly NavItem[] = [
  { key: "calculator", path: "", ready: true },
  { key: "history", path: "/history", ready: true },
  { key: "guides", path: "/guides", ready: true },
  { key: "silverRateSources", path: "/silver-rate-sources", ready: true },
  { key: "about", path: "/about", ready: true },
];

export const navItems = allNavItems.filter((item) => item.ready);

export type FooterKey = Exclude<keyof Dictionary["footer"]["links"], "label">;

type FooterItem = { key: FooterKey; path: string; ready: boolean };

const allFooterItems: readonly FooterItem[] = [
  { key: "guides", path: "/guides", ready: true },
  { key: "about", path: "/about", ready: true },
  { key: "disclaimer", path: "/disclaimer", ready: true },
  { key: "privacy", path: "/privacy-policy", ready: true },
  { key: "terms", path: "/terms", ready: true },
  // Hidden until the owner publishes a contact email (src/content/site.ts).
  { key: "contact", path: "/contact", ready: CONTACT_EMAIL !== null },
];

export const footerItems = allFooterItems.filter((item) => item.ready);

export function localizedHref(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = target;
    return segments.join("/");
  }
  return `/${target}${pathname === "/" ? "" : pathname}`;
}

export function isActivePath(
  pathname: string,
  locale: Locale,
  path: string,
): boolean {
  const href = localizedHref(locale, path);
  if (path === "") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
