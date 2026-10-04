import "server-only";
import type { Locale } from "./config";
import { ar } from "./dictionaries/ar";
import { en, type Dictionary } from "./dictionaries/en";
import { ur } from "./dictionaries/ur";

const dictionaries: Record<Locale, Dictionary> = { en, ur, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
