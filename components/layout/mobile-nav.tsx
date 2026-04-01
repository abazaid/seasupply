"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="rounded-md border border-slate-300 p-2"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full z-40 max-h-[75vh] overflow-y-auto border-t border-slate-200 bg-white p-4 shadow-xl">
          <nav className="space-y-4">
            {categories.map((category) => (
              <div key={category.slug}>
                <Link href={`/categories/${category.slug}`} className="font-semibold text-slate-900" onClick={() => setOpen(false)}>
                  {category.name}
                </Link>
                <ul className="mt-2 space-y-1 pl-3 text-sm text-slate-600">
                  {category.subcategories.slice(0, 4).map((sub) => (
                    <li key={sub.slug}>
                      <Link href={`/categories/${category.slug}/${sub.slug}`} onClick={() => setOpen(false)}>
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
