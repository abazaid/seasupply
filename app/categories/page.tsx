import Link from "next/link";
import { CategoryCard } from "@/components/shared/category-card";
import { categories } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Marine Categories",
  description: "Browse all major Sea Supply Hub marine ecommerce categories.",
  path: "/categories",
});

export default function CategoriesIndexPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">All Categories</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
      <p className="text-sm text-slate-600">
        Need a faster path? Try <Link className="text-sky-700" href="/search">Search</Link>.
      </p>
    </section>
  );
}
