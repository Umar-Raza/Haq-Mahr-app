import { PLACEHOLDER, type ReceiptModel } from "@/lib/receipt/model";

export const RECEIPT_ID = "receipt";

const muted = (value: string) => (value === PLACEHOLDER ? "text-muted" : "");

// Forced light theme: the receipt is a paper surface in both site themes.
export function Receipt({
  model,
  hint,
  className = "",
}: {
  model: ReceiptModel;
  className?: string;
  /** Shown under the amount while the receipt is a preview. */
  hint?: string;
}) {
  return (
    <article
      id={RECEIPT_ID}
      data-theme="hmf-light"
      lang={model.lang}
      dir={model.dir}
      className={`flex flex-col overflow-hidden rounded-box border border-line bg-base-100 text-base-content shadow-sm ${className}`}
    >
      <header className="bg-primary px-6 py-5 text-primary-content">
        <p className="text-sm font-semibold opacity-90">{model.brand}</p>
        <h3 className="text-xl font-bold">{model.title}</h3>
      </header>
      <div aria-hidden="true" className="ms-6 h-0.75 w-14 bg-accent" />

      <div className="flex flex-1 flex-col px-6 pt-5">
        <div className="rounded-box bg-primary/6 px-5 py-4">
          <p className="text-sm text-muted">{model.amountLabel}</p>
          <p
            className={`text-3xl font-bold break-words ${
              model.amount === PLACEHOLDER ? "text-muted" : "text-primary"
            }`}
          >
            {model.amount}
          </p>
          {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
        </div>

        <dl className="mt-4">
          {model.rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-dashed border-line py-3 last:border-b-0"
            >
              <dt className="text-sm text-muted">{row.label}</dt>
              <dd className={`font-semibold break-words ${muted(row.value)}`}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Takes up the extra height when the card is stretched, so the footer stays at the bottom. */}
        <p className="mt-auto pt-4 text-xs leading-relaxed text-muted">
          {model.disclaimer}
        </p>
      </div>

      {/* Perforation: a dashed tear line with notches, like a paper receipt. */}
      <div aria-hidden="true" className="relative mt-5 h-0">
        <div className="mx-6 border-t-2 border-dashed border-line" />
        <span className="absolute -start-2.5 -top-2.5 size-5 rounded-full border border-line bg-(--receipt-notch,var(--color-base-200))" />
        <span className="absolute -end-2.5 -top-2.5 size-5 rounded-full border border-line bg-(--receipt-notch,var(--color-base-200))" />
      </div>
      <footer className="flex items-center justify-center gap-2 px-6 py-4">
        <span
          aria-hidden="true"
          className="inline-block size-2 rotate-45 bg-accent"
        />
        <span
          dir="ltr"
          className="text-sm font-semibold tracking-wide text-primary"
        >
          {model.domain}
        </span>
      </footer>
    </article>
  );
}
