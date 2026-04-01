import Image from "next/image";
import Link from "next/link";
import { featuredBrands } from "@/data";

export function BrandStrip() {
  return (
    <section aria-label="Featured brands" className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">Shop by Brand</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {featuredBrands.slice(0, 18).map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="flex min-h-28 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-4 text-center text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            {brand.logoUrl ? (
              <Image src={brand.logoUrl} alt={`${brand.name} logo`} width={140} height={56} className="mb-2 h-12 w-auto object-contain" />
            ) : (
              <span className="mb-2 text-base">{brand.logoText}</span>
            )}
            <span>{brand.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
