"use client";

import { useSearchParams } from "next/navigation";
import { useState, type ComponentProps } from "react";
import { parseReopenQuery } from "@/lib/history/schema";
import { Calculator } from "./calculator";

type Props = Omit<ComponentProps<typeof Calculator>, "initial">;

/**
 * Reads "Open in calculator" params from history. Render inside <Suspense> with a plain
 * <Calculator> fallback, so the static HTML stays prerendered and layout does not shift.
 */
export function ReopenableCalculator(props: Props) {
  const params = useSearchParams();
  // Captured once: the calculator clears the URL after applying it.
  const [initial] = useState(() => parseReopenQuery(params.toString()));
  return <Calculator {...props} initial={initial} />;
}
