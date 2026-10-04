import { isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export type NavKey = Exclude<
  keyof Dictionary["nav"],
  "label" | "openMenu" | "closeMenu" | "language"
>;

type NavItem = { key: NavKey; path: string; ready: boolean };

// Flip `ready` when a page ships so the nav never links to a 404.
const allNavItems: readonly NavItem[] = [
  { key: "calculator", path: "", ready: true },
  { key: "guides", path: "/guides", ready: false },
  { key: "silverRateSources", path: "/silver-rate-sources", ready: false },
  { key: "about", path: "/about", ready: false },
];

export const navItems = allNavItems.filter((item) => item.ready);

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
