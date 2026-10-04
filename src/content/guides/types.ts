import type { PageContent } from "../types";

export type GuideContent = PageContent & {
  /** One or two sentences for the guide index card. */
  summary: string;
};
