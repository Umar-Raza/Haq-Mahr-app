import type { Dictionary } from "@/i18n/dictionaries/en";
import { Container } from "./container";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-line bg-base-100">
      <Container className="flex flex-col gap-3 py-8 text-sm text-muted">
        <div aria-hidden="true" className="h-px w-12 bg-accent" />
        <p className="max-w-2xl">{dict.footer.disclaimer}</p>
        <p>
          © {new Date().getFullYear()} {dict.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
