"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Currency } from "@/lib/calc/currencies";
import {
  filterCurrencyGroups,
  type CurrencyGroup,
} from "@/lib/currency-search";

type Props = {
  id: string;
  labelId: string;
  describedBy?: string;
  groups: CurrencyGroup[];
  value: Currency;
  onChange: (code: Currency) => void;
  texts: { search: string; noResults: string };
};

// WAI-ARIA combobox: a trigger button opens a panel with a search input (role=combobox) driving a listbox.
export function CurrencyPicker({
  id,
  labelId,
  describedBy,
  groups,
  value,
  onChange,
  texts,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCode, setActiveCode] = useState<Currency | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const listId = `${id}-listbox`;
  const optionId = (code: Currency) => `${id}-option-${code}`;

  const filtered = useMemo(
    () => filterCurrencyGroups(groups, query),
    [groups, query],
  );
  const flat = filtered.flatMap((g) => g.options);
  const active = flat.find((o) => o.code === activeCode) ?? flat[0] ?? null;
  const selected = groups
    .flatMap((g) => g.options)
    .find((o) => o.code === value);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open || !active) return;
    document
      .getElementById(`${id}-option-${active.code}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function openPanel() {
    setQuery("");
    setActiveCode(value);
    setOpen(true);
  }

  function close(focusTrigger: boolean) {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }

  function choose(code: Currency) {
    onChange(code);
    close(true);
  }

  function move(delta: number) {
    if (flat.length === 0) return;
    const index = active ? flat.indexOf(active) : -1;
    const next = flat[(index + delta + flat.length) % flat.length];
    setActiveCode(next.code);
  }

  function onSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        move(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        move(-1);
        break;
      case "Home":
        if (flat[0]) {
          event.preventDefault();
          setActiveCode(flat[0].code);
        }
        break;
      case "End":
        if (flat.length) {
          event.preventDefault();
          setActiveCode(flat[flat.length - 1].code);
        }
        break;
      case "Enter":
        event.preventDefault();
        if (active) choose(active.code);
        break;
      case "Escape":
        event.preventDefault();
        close(true);
        break;
      case "Tab":
        close(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${labelId} ${id}`}
        aria-describedby={describedBy}
        onClick={() => (open ? close(false) : openPanel())}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp"].includes(event.key)) {
            event.preventDefault();
            openPanel();
          }
        }}
        className="input flex w-full cursor-pointer items-center gap-3 text-start"
      >
        <span className="badge badge-primary badge-soft font-mono font-semibold">
          {value}
        </span>
        <span className="flex-1 truncate">{selected?.name ?? value}</span>
        <svg
          className={`size-4 shrink-0 opacity-60 transition-transform motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-box border border-line bg-base-100 shadow-lg">
          <div className="border-b border-line p-2">
            <label className="input input-sm flex w-full items-center gap-2">
              <svg
                className="size-4 shrink-0 opacity-60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                ref={searchRef}
                type="search"
                role="combobox"
                aria-label={texts.search}
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={
                  active ? optionId(active.code) : undefined
                }
                autoComplete="off"
                placeholder={texts.search}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveCode(null);
                }}
                onKeyDown={onSearchKeyDown}
                className="grow"
              />
            </label>
          </div>

          <ul
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            className="max-h-72 overflow-y-auto p-1"
          >
            {filtered.map((group) => (
              <li key={group.label} role="presentation">
                <div
                  role="presentation"
                  className="px-3 pt-2 pb-1 text-xs font-semibold text-muted"
                >
                  {group.label}
                </div>
                <ul role="group" aria-label={group.label}>
                  {group.options.map((option) => {
                    const isSelected = option.code === value;
                    const isActive = option.code === active?.code;
                    return (
                      <li
                        key={option.code}
                        id={optionId(option.code)}
                        role="option"
                        aria-selected={isSelected}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => choose(option.code)}
                        onMouseMove={() => setActiveCode(option.code)}
                        className={`flex cursor-pointer items-center gap-3 rounded-field px-3 py-2 text-sm ${
                          isActive ? "bg-base-200" : ""
                        } ${isSelected ? "font-semibold text-primary" : ""}`}
                      >
                        <span className="w-12 shrink-0 font-mono text-xs font-semibold text-muted">
                          {option.code}
                        </span>
                        <span className="flex-1 truncate">{option.name}</span>
                        {isSelected ? (
                          <svg
                            className="size-4 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
            {flat.length === 0 ? (
              <li
                role="presentation"
                className="px-3 py-6 text-center text-sm text-muted"
              >
                {texts.noResults}
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
