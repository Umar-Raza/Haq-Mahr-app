"use client";

import { useEffect, useState } from "react";

type Item = { id: string; heading: string };

/** Table of contents that highlights the section currently being read. */
export function TocList({
  headingId,
  heading,
  sections,
}: {
  headingId: string;
  heading: string;
  sections: Item[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // First visible section in reading order; keep the previous one while between sections.
        const first = sections.find((section) => visible.has(section.id));
        if (first) setActive(first.id);
      },
      // A section counts as "current" while it crosses the upper part of the viewport.
      { rootMargin: "-20% 0px -60% 0px" },
    );
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <h2 id={headingId} className="text-sm font-semibold">
        {heading}
      </h2>
      <ol className="mt-3 grid gap-1 text-sm">
        {sections.map((section) => {
          const current = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? "location" : undefined}
                onClick={() => setActive(section.id)}
                className={`block rounded-field border-s-2 py-1 ps-3 transition-colors ${
                  current
                    ? "border-primary font-medium text-primary"
                    : "border-transparent text-muted hover:text-primary"
                }`}
              >
                {section.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </>
  );
}
