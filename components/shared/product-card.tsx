import Link from "next/link";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-4 aspect-[4/3] rounded-lg bg-gradient-to-br from-slate-100 to-slate-200" aria-hidden="true" />
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{product.sku}</p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">
        <Link href={`/products/${product.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700">
          {product.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-slate-700">{product.shortDescription}</p>
      <Link
        href={`/products/${product.slug}`}
        className="mt-4 inline-flex rounded-lg bg-sky-800 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
      >
        View Details
      </Link>
    </article>
  );
}
