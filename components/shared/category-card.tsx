import Link from "next/link";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        <Link href={`/categories/${category.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700">
          {category.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-slate-700">{category.description}</p>
      <ul className="mt-4 space-y-1 text-sm text-slate-600">
        {category.subcategories.slice(0, 4).map((sub) => (
          <li key={sub.slug}>
            <Link href={`/categories/${category.slug}/${sub.slug}`} className="hover:text-slate-900">
              {sub.name}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
