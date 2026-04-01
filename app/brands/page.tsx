import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Marine Brands",
  description: "Browse all marine brands available on Sea Supply Hub.",
  path: "/brands",
});

export default function BrandsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Shop by Brand</h1>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {brands.map((brand) => (
          <article key={brand.slug} className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
            <Link href={`/brands/${brand.slug}`}>
              {brand.logoUrl ? (
                <Image src={brand.logoUrl} alt={`${brand.name} logo`} width={160} height={60} className="mx-auto h-14 w-auto object-contain" />
              ) : (
                <p className="text-lg font-bold">{brand.logoText}</p>
              )}
              <p className="mt-3 text-sm font-semibold text-slate-800">{brand.name}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
