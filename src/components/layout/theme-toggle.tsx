"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import {
  DARK_THEME,
  LIGHT_THEME,
  THEME_STORAGE_KEY,
  resolveTheme,
} from "@/lib/theme";

function readStored(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () =>
  document.documentElement.getAttribute("data-theme") === DARK_THEME;
const getServerSnapshot = () => false;

export function ThemeToggle({ label }: { label: string }) {
  // React's dev remount resets <html> attributes; re-apply. No-op in production.
  useLayoutEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    document.documentElement.setAttribute(
      "data-theme",
      resolveTheme(readStored(), prefersDark),
    );
  }, []);

  const isDark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  function toggle() {
    const next = isDark ? LIGHT_THEME : DARK_THEME;
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable: theme still applies for this page view.
    }
  }

  // A <label> (not a button with aria-pressed) so DaisyUI's :active press effect still applies.
  return (
    <label className="btn btn-ghost btn-square btn-sm has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary">
      <input
        type="checkbox"
        className="sr-only"
        aria-label={label}
        checked={isDark}
        onChange={toggle}
      />
      <span className={`swap swap-rotate ${isDark ? "swap-active" : ""}`}>
        <svg
          className="swap-off size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
        <svg
          className="swap-on size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </span>
    </label>
  );
}
