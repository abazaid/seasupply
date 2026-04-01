"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data";

export function MegaMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative hidden border-t border-slate-200 bg-white lg:block">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="desktop-mega-menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Shop by Category
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <div className="flex items-center gap-5 text-sm text-slate-600">
          <Link href="/brands" className="hover:text-slate-900">Brands</Link>
          <Link href="/featured-collections" className="hover:text-slate-900">Collections</Link>
          <Link href="/resources" className="hover:text-slate-900">Resources</Link>
        </div>
      </div>

      {open ? (
        <div id="desktop-mega-menu" className="absolute inset-x-0 top-full z-40 border-t border-slate-200 bg-white shadow-xl">
          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 px-4 py-5">
            {categories.slice(0, 16).map((category) => (
              <div key={category.slug}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                  <Link href={`/categories/${category.slug}`} className="hover:text-sky-700" onClick={() => setOpen(false)}>
                    {category.name}
                  </Link>
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {category.subcategories.slice(0, 4).map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/categories/${category.slug}/${sub.slug}`}
                        className="hover:text-slate-900"
                        onClick={() => setOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
