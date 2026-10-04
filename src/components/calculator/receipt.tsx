import { PLACEHOLDER, type ReceiptModel } from "@/lib/receipt/model";

export const RECEIPT_ID = "receipt";

const valueClass = (value: string) =>
  value === PLACEHOLDER ? "text-muted" : "";

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
      {/* When the card is stretched, rows share the extra height evenly. */}
      <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
        <p className="text-sm text-muted">{model.amountLabel}</p>
        <p
          className={`text-3xl font-bold break-words ${
            model.amount === PLACEHOLDER ? "text-muted" : "text-primary"
          }`}
        >
          {model.amount}
        </p>
        {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
        <hr className="my-4 border-line" />
        <dl className="flex flex-1 flex-col justify-evenly gap-3">
          {model.rows.map((row) => (
            <div key={row.label}>
              <dt className="text-xs text-muted">{row.label}</dt>
              <dd
                className={`font-semibold break-words ${valueClass(row.value)}`}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <hr className="my-4 border-line" />
        <p className="text-xs leading-relaxed text-muted">{model.disclaimer}</p>
      </div>
    </article>
  );
}
