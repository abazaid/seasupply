import Link from "next/link";
import { searchContent } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Search",
  description: "Search products, categories, brands, and marine resources.",
  path: "/search",
});

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const results = searchContent(query);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Search</h1>
      <form action="/search" className="rounded-xl border border-slate-300 bg-white p-4">
        <label htmlFor="q" className="sr-only">Search query</label>
        <input id="q" name="q" defaultValue={query} placeholder="Search products, categories, brands, guides..." className="w-full rounded-lg border border-slate-300 px-4 py-2" />
      </form>
      {query ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <ResultBlock title="Products" items={results.products.map((item) => ({ name: item.name, href: `/products/${item.slug}` }))} />
          <ResultBlock title="Articles" items={results.articles.map((item) => ({ name: item.title, href: item.type === "buying-guide" ? `/resources/buying-guides/${item.slug}` : item.type === "comparison" ? `/resources/comparisons/${item.slug}` : `/resources/blog/${item.slug}` }))} />
          <ResultBlock title="Categories" items={results.categories.map((item) => ({ name: item.name, href: `/categories/${item.slug}` }))} />
          <ResultBlock title="Brands" items={results.brands.map((item) => ({ name: item.name, href: `/brands/${item.slug}` }))} />
        </div>
      ) : (
        <p className="text-slate-700">Enter a query to see product and content results.</p>
      )}
    </section>
  );
}

function ResultBlock({ title, items }: { title: string; items: Array<{ name: string; href: string }> }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-600">No matches found.</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-slate-900 hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
