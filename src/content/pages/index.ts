import { isContactPublished } from "../site";
import type { Localized, PageContent } from "../types";
import { about } from "./about";
import { contact } from "./contact";
import { disclaimer } from "./disclaimer";
import { privacyPolicy } from "./privacy-policy";
import { terms } from "./terms";

export const infoPages = {
  about,
  disclaimer,
  "privacy-policy": privacyPolicy,
  terms,
  contact,
} satisfies Record<string, Localized<PageContent>>;

export type InfoPageSlug = keyof typeof infoPages;

/** A page that would only show a placeholder is not published. */
export function isInfoPagePublished(slug: InfoPageSlug): boolean {
  return slug !== "contact" || isContactPublished;
}
