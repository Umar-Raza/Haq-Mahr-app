import type { Locale } from "@/i18n/config";
import { methodologySources, type MethodologySource } from "@/lib/calc/sources";
import type { Localized } from "../types";
import { checkingSilverRates } from "./checking-silver-rates";
import { howToUseTheCalculator } from "./how-to-use-the-calculator";
import { minimumHaqMahr10Dirhams } from "./minimum-haq-mahr-10-dirhams";
import { nikahWithoutMahrNamed } from "./nikah-without-mahr-named";
import { tolaMashaGram } from "./tola-masha-gram";
import type { GuideContent } from "./types";

export type GuideSource = Omit<MethodologySource, "supports"> & {
  /** Provided by the site owner; the page blocks automated access, so we have not opened it ourselves. */
  notOpened?: boolean;
};

const source = (url: string): GuideSource => {
  const found = methodologySources.find((s) => s.url === url);
  if (!found) throw new Error(`Unknown source: ${url}`);
  return { title: found.title, publisher: found.publisher, url: found.url };
};

// Cites the classical texts (Badai al-Sanai, al-Durr al-Mukhtar, al-Tahtawi, Bahar-e-Shariat,
// Fatawa Faqih-e-Millat). Behind a bot challenge, so supplied by the owner and not opened by us.
const FATWAQA_SOURCE: GuideSource = {
  title: "Meher ki kam se kam miqdar se bhi kam muqarrar kiya to hukum",
  publisher: "fatwaqa.com",
  url: "https://www.fatwaqa.com/ur/fatawa/nikah/meher-ki-kam-se-kam-miqdar-se-bhi-kam-muqarrar-kiya-to-hukum",
  notOpened: true,
};
// Fatawa Alamgiri, Fatawa Khaliliya and Bahar-e-Shariat as quoted there; owner-supplied, not opened by us.
const FATWAQA_NO_MAHR_SOURCE: GuideSource = {
  title: "Mehr ke baghair nikah",
  publisher: "fatwaqa.com",
  url: "https://www.fatwaqa.com/ur/fatawa/nikah/mehr-ke-baghair-nikah",
  notOpened: true,
};
const TOLA_SOURCE = source("https://en.wikipedia.org/wiki/Tola_(unit)");
// Opened and checked 2026-10-04: states 1 troy ounce = 31.1034768 g.
const TROY_SOURCE: GuideSource = {
  title: "Troy weight",
  publisher: "Wikipedia",
  url: "https://en.wikipedia.org/wiki/Troy_weight",
};

export type Guide = {
  slug: string;
  /** Last content revision (ISO date). */
  updated: string;
  /** Religious claims: show sources and review status prominently. */
  religious: boolean;
  sources: GuideSource[];
  related: string[];
  content: Localized<GuideContent>;
};

export const guides: readonly Guide[] = [
  {
    slug: "how-to-use-the-calculator",
    updated: "2026-10-04",
    religious: false,
    sources: [],
    related: ["checking-silver-rates", "tola-masha-gram"],
    content: howToUseTheCalculator,
  },
  {
    slug: "minimum-haq-mahr-10-dirhams",
    updated: "2026-10-04",
    religious: true,
    sources: [FATWAQA_SOURCE, TOLA_SOURCE],
    related: ["nikah-without-mahr-named", "tola-masha-gram"],
    content: minimumHaqMahr10Dirhams,
  },
  {
    slug: "nikah-without-mahr-named",
    updated: "2026-10-04",
    religious: true,
    sources: [FATWAQA_NO_MAHR_SOURCE],
    related: ["minimum-haq-mahr-10-dirhams", "how-to-use-the-calculator"],
    content: nikahWithoutMahrNamed,
  },
  {
    slug: "tola-masha-gram",
    updated: "2026-10-04",
    religious: false,
    sources: [TOLA_SOURCE, TROY_SOURCE],
    related: ["checking-silver-rates", "minimum-haq-mahr-10-dirhams"],
    content: tolaMashaGram,
  },
  {
    slug: "checking-silver-rates",
    updated: "2026-10-04",
    religious: false,
    sources: [TROY_SOURCE],
    related: ["tola-masha-gram", "how-to-use-the-calculator"],
    content: checkingSilverRates,
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function guideContent(guide: Guide, locale: Locale): GuideContent {
  return guide.content[locale];
}
