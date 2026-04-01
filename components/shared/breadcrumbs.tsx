import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            <Link className="hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
