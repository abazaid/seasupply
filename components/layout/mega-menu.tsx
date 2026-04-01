import Link from "next/link";
import { categories } from "@/data";

export function MegaMenu() {
  return (
    <div className="hidden border-t border-slate-200 bg-white lg:block">
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 px-4 py-5">
        {categories.slice(0, 16).map((category) => (
          <div key={category.slug}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              <Link href={`/categories/${category.slug}`} className="hover:text-sky-700">
                {category.name}
              </Link>
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {category.subcategories.slice(0, 4).map((sub) => (
                <li key={sub.slug}>
                  <Link href={`/categories/${category.slug}/${sub.slug}`} className="hover:text-slate-900">
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
