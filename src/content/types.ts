import type { Locale } from "@/i18n/config";

/** Static content blocks. Plain text only, so nothing needs to be sanitized. */
export type Block =
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "note"; tone: "info" | "warning"; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  /** Internal link to another page of this site, e.g. "" (calculator) or "/history". */
  | { type: "link"; text: string; path: string }
  /** Renders the published contact email (see src/content/site.ts). */
  | { type: "email"; label: string };

export type Section = { id: string; heading: string; blocks: Block[] };

export type PageContent = {
  title: string;
  /** Meta description: unique per page and locale. */
  description: string;
  intro: string;
  sections: Section[];
};

export type Localized<T> = Record<Locale, T>;
