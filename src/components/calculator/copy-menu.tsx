"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type CopyKind = "formatted" | "short";

type Texts = {
  copy: string;
  copyMenu: string;
  copyFormatted: string;
  copyFormattedHint: string;
  copyShort: string;
  copyShortHint: string;
};

/** Copy button that opens upwards with two choices: formatted (multi-line) or short (one line). */
export function CopyMenu({
  texts,
  icon,
  onCopy,
}: {
  texts: Texts;
  icon: ReactNode;
  onCopy: (kind: CopyKind) => void;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const details = ref.current;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && details) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (details && !details.contains(event.target as Node)) {
        details.open = false;
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function choose(kind: CopyKind) {
    if (ref.current) ref.current.open = false;
    onCopy(kind);
  }

  const options: { kind: CopyKind; label: string; hint: string }[] = [
    {
      kind: "formatted",
      label: texts.copyFormatted,
      hint: texts.copyFormattedHint,
    },
    { kind: "short", label: texts.copyShort, hint: texts.copyShortHint },
  ];

  return (
    <details
      ref={ref}
      className="dropdown dropdown-top dropdown-end w-full"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="btn btn-outline btn-primary w-full">
        {icon}
        {texts.copy}
        <svg
          className="size-3.5 opacity-70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 15l6-6 6 6" />
        </svg>
      </summary>
      <div className="dropdown-content z-30 mb-2 w-64 rounded-box border border-line bg-base-100 p-2 shadow-lg">
        <p className="px-3 pt-1 pb-2 text-xs text-muted">{texts.copyMenu}</p>
        <ul className="menu w-full gap-1 p-0">
          {options.map((option) => (
            <li key={option.kind}>
              <button
                type="button"
                className="flex flex-col items-start gap-0.5 text-start"
                onClick={() => choose(option.kind)}
              >
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-muted">{option.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
