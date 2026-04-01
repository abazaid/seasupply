"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/data";

export function PredictiveSearch() {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    if (!query.trim()) return [];
    const term = query.toLowerCase();
    return products
      .filter((item) => item.name.toLowerCase().includes(term))
      .slice(0, 6);
  }, [query]);

  return (
    <div className="relative w-full">
      <input
        aria-label="Search products"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search marine products, guides, and brands"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
      />
      {matches.length > 0 ? (
        <div className="absolute left-0 right-0 top-[110%] z-30 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          {matches.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="block rounded-lg px-3 py-2 text-sm text-slate-800 hover:bg-slate-100"
            >
              {item.name}
            </Link>
          ))}
          <Link href={`/search?q=${encodeURIComponent(query)}`} className="mt-1 block px-3 py-2 text-xs font-semibold text-sky-700">
            View full results
          </Link>
        </div>
      ) : null}
    </div>
  );
}
