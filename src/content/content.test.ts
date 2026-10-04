import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { guides } from "./guides";
import { infoPages } from "./pages";
import type { Block, PageContent } from "./types";

// Internal paths a "link" block may point to.
const knownPaths = new Set([
  "",
  "/history",
  "/guides",
  "/silver-rate-sources",
  ...guides.map((g) => `/guides/${g.slug}`),
  ...Object.keys(infoPages).map((slug) => `/${slug}`),
]);

const allPages: [string, Record<string, PageContent>][] = [
  ...guides.map((g): [string, Record<string, PageContent>] => [
    `guide ${g.slug}`,
    g.content,
  ]),
  ...Object.entries(infoPages),
];

const blocksOf = (page: PageContent): Block[] =>
  page.sections.flatMap((s) => s.blocks);

describe.each(allPages)("%s", (_name, content) => {
  it("has the same section ids and block types in every locale", () => {
    const shape = (page: PageContent) =>
      page.sections.map(
        (s) => `${s.id}:${s.blocks.map((b) => b.type).join(",")}`,
      );
    const reference = shape(content.en);
    for (const locale of locales) {
      expect(shape(content[locale])).toEqual(reference);
    }
  });

  it("uses unique section ids", () => {
    const ids = content.en.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("links only to pages that exist", () => {
    for (const locale of locales) {
      for (const block of blocksOf(content[locale])) {
        if (block.type === "link") expect(knownPaths).toContain(block.path);
      }
    }
  });

  it("has a non-empty title, intro and a search-friendly description", () => {
    for (const locale of locales) {
      const page = content[locale];
      expect(page.title.trim()).not.toBe("");
      expect(page.intro.trim()).not.toBe("");
      expect(page.description.length).toBeGreaterThan(50);
      expect(page.description.length).toBeLessThanOrEqual(200);
    }
  });

  it("keeps the same numbers in every translation", () => {
    const numbers = (page: PageContent) =>
      JSON.stringify(page.sections)
        .match(/\d[\d,.]*\d|\d/g)
        ?.map((n) => n.replace(/,/g, ""))
        .sort() ?? [];
    for (const locale of locales) {
      expect(numbers(content[locale])).toEqual(numbers(content.en));
    }
  });
});

describe("guides", () => {
  it("have unique slugs and valid related guides", () => {
    const slugs = guides.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const guide of guides) {
      for (const related of guide.related) {
        expect(slugs).toContain(related);
        expect(related).not.toBe(guide.slug);
      }
    }
  });

  it("cite https sources, and religious guides always cite some", () => {
    for (const guide of guides) {
      for (const source of guide.sources) {
        expect(source.url).toMatch(/^https:\/\//);
      }
      if (guide.religious) expect(guide.sources.length).toBeGreaterThan(0);
    }
  });

  it("have unique titles and descriptions per locale", () => {
    for (const locale of locales) {
      const pages = allPages.map(([, content]) => content[locale]);
      const titles = pages.map((p) => p.title);
      const descriptions = pages.map((p) => p.description);
      expect(new Set(titles).size).toBe(titles.length);
      expect(new Set(descriptions).size).toBe(descriptions.length);
    }
  });
});
