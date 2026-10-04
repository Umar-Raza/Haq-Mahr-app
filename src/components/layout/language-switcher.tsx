"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localeNames, locales, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/lib/routes";

type Props = {
  current: Locale;
  label: string;
};

export function LanguageSwitcher({ current, label }: Props) {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const details = detailsRef.current;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && details) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (details && !details.contains(event.target as Node)) {
        details.open = false;
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function close() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <details
      ref={detailsRef}
      className="dropdown dropdown-end"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        className="btn btn-ghost btn-sm gap-1.5 px-2"
        aria-label={`${label}: ${localeNames[current]}`}
      >
        <svg
          className="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        <span lang={current} className="hidden sm:inline">
          {localeNames[current]}
        </span>
        <svg
          className="size-3.5 opacity-60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <ul className="menu dropdown-content z-20 mt-2 w-40 rounded-box border border-line bg-base-100 p-2 shadow-md">
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={switchLocalePath(pathname, locale)}
              lang={locale}
              hrefLang={locale}
              aria-current={locale === current ? "true" : undefined}
              onClick={close}
            >
              {localeNames[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
