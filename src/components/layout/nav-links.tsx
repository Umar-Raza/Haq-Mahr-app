"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isActivePath, localizedHref } from "@/lib/routes";

export type NavLinkItem = { path: string; label: string };

type Props = {
  locale: Locale;
  items: NavLinkItem[];
  orientation: "horizontal" | "vertical";
  onNavigate?: () => void;
};

// DaisyUI `menu` styles the [aria-current] link as active.
export function NavLinks({ locale, items, orientation, onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <ul
      className={
        orientation === "horizontal"
          ? "menu menu-horizontal gap-1 p-0"
          : "menu w-full gap-1 p-0"
      }
    >
      {items.map((item) => (
        <li key={item.path}>
          <Link
            href={localizedHref(locale, item.path)}
            aria-current={
              isActivePath(pathname, locale, item.path) ? "page" : undefined
            }
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
