import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { LoadingRegion, Skeleton } from "@/components/ui/skeleton";

// Internal QA page for Phase 1 tokens. Not user-facing, so strings are not localized.
export const metadata: Metadata = {
  title: "Design system (dev only)",
  robots: { index: false, follow: false },
};

const swatches = [
  "bg-base-100",
  "bg-base-200",
  "bg-base-300",
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-success",
  "bg-warning",
  "bg-error",
  "bg-line",
  "bg-muted",
];

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <Container className="flex flex-col gap-10 py-10">
      <section>
        <h1 className="text-3xl font-semibold">Design system</h1>
        <p className="mt-2 text-muted">
          Muted text sample. Switch theme and locale from the header.
        </p>
      </section>

      <section aria-labelledby="ds-colors">
        <h2 id="ds-colors" className="mb-3 text-xl font-semibold">
          Colors
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {swatches.map((swatch) => (
            <li key={swatch} className="text-xs">
              <div
                className={`h-12 rounded-box border border-line ${swatch}`}
              />
              <code>{swatch}</code>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ds-buttons" className="flex flex-col gap-3">
        <h2 id="ds-buttons" className="text-xl font-semibold">
          Buttons
        </h2>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary">
            Primary
          </button>
          <button type="button" className="btn btn-outline btn-primary">
            Outline
          </button>
          <button type="button" className="btn btn-ghost">
            Ghost
          </button>
          <button type="button" className="btn" disabled>
            Disabled
          </button>
        </div>
      </section>

      <section aria-labelledby="ds-form" className="max-w-md">
        <h2 id="ds-form" className="mb-3 text-xl font-semibold">
          Form controls
        </h2>
        <fieldset className="fieldset">
          <label className="fieldset-label" htmlFor="ds-rate">
            Silver rate
          </label>
          <input
            id="ds-rate"
            type="text"
            inputMode="decimal"
            className="input w-full"
          />
          <label className="fieldset-label" htmlFor="ds-basis">
            Rate basis
          </label>
          <select id="ds-basis" className="select w-full" defaultValue="tola">
            <option value="tola">Per Tola</option>
            <option value="gram">Per Gram</option>
          </select>
          <label className="fieldset-label" htmlFor="ds-error">
            Invalid field
          </label>
          <input
            id="ds-error"
            type="text"
            className="input input-error w-full"
            aria-invalid="true"
            aria-describedby="ds-error-msg"
            defaultValue="-5"
          />
          <p id="ds-error-msg" className="text-sm text-error">
            Enter a number greater than zero.
          </p>
        </fieldset>
      </section>

      <section aria-labelledby="ds-alerts" className="flex flex-col gap-3">
        <h2 id="ds-alerts" className="text-xl font-semibold">
          Alerts
        </h2>
        <div role="alert" className="alert alert-info alert-soft">
          Informational estimate only.
        </div>
        <div role="alert" className="alert alert-warning alert-soft">
          Verify the rate unit and purity on the source site.
        </div>
        <div role="alert" className="alert alert-error alert-soft">
          Something went wrong.
        </div>
      </section>

      <section aria-labelledby="ds-cards" className="grid gap-4 sm:grid-cols-2">
        <h2 id="ds-cards" className="text-xl font-semibold sm:col-span-2">
          Card and skeleton
        </h2>
        <div className="card border border-line bg-base-100">
          <div className="card-body">
            <h3 className="card-title">Card title</h3>
            <p className="text-muted">Card body text on a surface.</p>
          </div>
        </div>
        <LoadingRegion label="Loading example">
          <div className="card border border-line bg-base-100">
            <div className="card-body gap-3">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </LoadingRegion>
      </section>
    </Container>
  );
}
