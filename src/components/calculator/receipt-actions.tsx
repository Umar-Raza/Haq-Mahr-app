"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { renderReceiptPng } from "@/lib/receipt/canvas";
import {
  buildShareText,
  whatsappHref,
  type ReceiptModel,
} from "@/lib/receipt/model";
import { RECEIPT_ID } from "./receipt";

type Status = { tone: "success" | "error"; text: string };

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

function receiptFontFamily(): string {
  const el = document.getElementById(RECEIPT_ID);
  return el ? getComputedStyle(el).fontFamily : "sans-serif";
}

/** `model` is null while the receipt is a preview; actions render disabled so the layout does not shift. */
export function ReceiptActions({
  model,
  fileName,
  texts,
}: {
  model: ReceiptModel | null;
  fileName: string;
  texts: Dictionary["actions"];
}) {
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState(false);
  // model only exists after user input, so this never runs during server rendering.
  const shareText = model ? buildShareText(model, window.location.href) : "";
  const disabled = !model || busy;

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  async function makePng(current: ReceiptModel): Promise<Blob | null> {
    try {
      return await renderReceiptPng(current, receiptFontFamily());
    } catch {
      setStatus({ tone: "error", text: texts.imageFailed });
      return null;
    }
  }

  async function onDownload() {
    if (!model) return;
    setBusy(true);
    const blob = await makePng(model);
    setBusy(false);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus({ tone: "success", text: texts.downloaded });
  }

  async function onCopy(fallbackMessage?: string) {
    if (!model) return;
    const ok = await copyText(shareText);
    setStatus(
      ok
        ? { tone: "success", text: fallbackMessage ?? texts.copied }
        : { tone: "error", text: texts.copyFailed },
    );
  }

  async function onShare() {
    if (!model) return;
    if (typeof navigator.share !== "function") {
      await onCopy(texts.shareFallback);
      return;
    }
    setBusy(true);
    const blob = await makePng(model);
    setBusy(false);
    const file = blob
      ? new File([blob], fileName, { type: "image/png" })
      : null;
    try {
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: model.title,
          text: shareText,
        });
      } else {
        await navigator.share({ title: model.title, text: shareText });
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await onCopy(texts.shareFallback);
    }
  }

  return (
    <section aria-labelledby="actions-heading" className="pt-4 print:hidden">
      <h3 id="actions-heading" className="sr-only">
        {texts.heading}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onDownload}
          disabled={disabled}
        >
          <Icon d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" />
          {texts.download}
        </button>
        <button
          type="button"
          className="btn btn-outline btn-primary"
          onClick={onShare}
          disabled={disabled}
        >
          <Icon d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          {texts.share}
        </button>
        {model ? (
          <a
            className="btn btn-outline btn-primary"
            href={whatsappHref(shareText)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon d={CHAT_ICON} />
            {texts.whatsapp}
            <span className="sr-only"> ({texts.newTab})</span>
          </a>
        ) : (
          <button
            type="button"
            className="btn btn-outline btn-primary"
            disabled
          >
            <Icon d={CHAT_ICON} />
            {texts.whatsapp}
          </button>
        )}
        <button
          type="button"
          className="btn btn-outline btn-primary"
          onClick={() => onCopy()}
          disabled={!model}
        >
          <Icon d="M9 9h10v10H9zM5 15V5h10" />
          {texts.copy}
        </button>
      </div>

      {/* Always mounted so screen readers announce updates; floats as a toast so it takes no layout space. */}
      <div role="status" className="toast toast-center toast-bottom z-50">
        {status ? (
          <div
            className={`alert ${
              status.tone === "error" ? "alert-error" : "alert-success"
            } text-sm shadow-lg`}
          >
            {status.text}
          </div>
        ) : null}
      </div>
    </section>
  );
}

const CHAT_ICON =
  "M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z";

function Icon({ d }: { d: string }) {
  return (
    <svg
      className="size-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
