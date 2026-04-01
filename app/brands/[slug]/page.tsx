import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductCard } from "@/components/shared/product-card";
import { StructuredData } from "@/components/shared/structured-data";
import { brands, getBrandBySlug, getProductsByBrand } from "@/data";
import { breadcrumbSchema, collectionSchema } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return buildMetadata({ title: "Brand Not Found", description: "Brand not found.", path: "/brands" });
  return buildMetadata({
    title: `${brand.name} Marine Products`,
    description: `${brand.name} products, specs, buying guidance, and partner purchase links on Sea Supply Hub.`,
    path: `/brands/${brand.slug}`,
    keywords: [brand.name, "marine brand", "boat products", "affiliate marine store"],
  });
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

  const brandProducts = getProductsByBrand(brand.slug);

  return (
    <section className="space-y-6">
      <StructuredData
        data={collectionSchema(
          `${brand.name} products`,
          brand.description,
          absoluteUrl(`/brands/${brand.slug}`),
          brandProducts.length,
        )}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Brands", url: absoluteUrl("/brands") },
          { name: brand.name, url: absoluteUrl(`/brands/${brand.slug}`) },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Brands", href: "/brands" }, { label: brand.name, href: `/brands/${brand.slug}` }]} />
      <header className="rounded-2xl border border-slate-200 bg-white p-6">
        {brand.logoUrl ? (
          <Image src={brand.logoUrl} alt={`${brand.name} logo`} width={220} height={80} className="h-16 w-auto object-contain" />
        ) : null}
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{brand.name}</h1>
        <p className="mt-2 text-slate-700">{brand.description}</p>
        <p className="mt-3 text-sm text-slate-600">
          This brand hub is optimized for product discovery, comparison, and topical marine buying intent. Use filters and related category links to reach the right fit faster.
        </p>
      </header>
      {brandProducts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {brandProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">
          Product feed for this brand is being expanded. Check back soon for full listings.
        </p>
      )}
    </section>
  );
}
