import Image from "next/image";
import Link from "next/link";
import { featuredBrands } from "@/data";

export function BrandStrip() {
  return (
    <section aria-label="Featured brands" className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8">
      <h2 className="text-center text-3xl font-bold uppercase tracking-tight text-sky-950">Shop by Brand</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {featuredBrands.slice(0, 18).map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="flex min-h-52 flex-col items-center justify-start rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 text-center transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            {brand.logoUrl ? (
              <div className="flex h-24 w-full items-center justify-center rounded-md border border-slate-200 bg-white px-3">
                <Image
                  src={brand.logoUrl}
                  alt={`${brand.name} brand logo`}
                  width={220}
                  height={88}
                  className="h-16 w-auto object-contain"
                />
              </div>
            ) : (
              <span className="mb-2 text-base">{brand.logoText}</span>
            )}
            <span className="mt-4 text-base font-semibold text-slate-900">{brand.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
