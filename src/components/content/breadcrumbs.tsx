import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** The last crumb is the current page and is not a link. */
export function Breadcrumbs({
  items,
  label,
}: {
  items: Crumb[];
  label: string;
}) {
  return (
    <nav
      aria-label={label}
      className="breadcrumbs overflow-y-hidden py-1 text-sm text-muted"
    >
      <ul>
        {items.map((item, index) =>
          item.href && index < items.length - 1 ? (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            </li>
          ) : (
            <li key={item.label}>
              <span aria-current="page" className="text-base-content">
                {item.label}
              </span>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
