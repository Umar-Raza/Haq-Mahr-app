import type { Locale } from "@/i18n/config";
import { methodologySources, type MethodologySource } from "@/lib/calc/sources";
import type { Localized } from "../types";
import { checkingSilverRates } from "./checking-silver-rates";
import { howToUseTheCalculator } from "./how-to-use-the-calculator";
import { minimumHaqMahr10Dirhams } from "./minimum-haq-mahr-10-dirhams";
import { tolaMashaGram } from "./tola-masha-gram";
import type { GuideContent } from "./types";

export type GuideSource = Omit<MethodologySource, "supports">;

const source = (url: string): GuideSource => {
  const found = methodologySources.find((s) => s.url === url);
  if (!found) throw new Error(`Unknown source: ${url}`);
  return { title: found.title, publisher: found.publisher, url: found.url };
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
    sources: [
      source(
        "https://islamqa.org/hanafi/muftionline/130564/minimum-mahar-in-pounds-explained/",
      ),
      source(
        "https://daruliftabirmingham.co.uk/what-is-the-minimum-quantity-of-mehar-in-gram-for-muslim-marriage/",
      ),
      source("https://jang.com.pk/news/494011"),
      TOLA_SOURCE,
    ],
    related: ["tola-masha-gram", "how-to-use-the-calculator"],
    content: minimumHaqMahr10Dirhams,
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
