import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OutboundButton } from "@/components/shared/outbound-button";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { ProductCard } from "@/components/shared/product-card";
import { StructuredData } from "@/components/shared/structured-data";
import { articles, getBrandBySlug, getProductBySlug, getRelatedProducts, products } from "@/data";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type ProductParams = { slug: string };

function resolveParams(params: ProductParams | Promise<ProductParams>) {
  return Promise.resolve(params);
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: ProductParams | Promise<ProductParams> }) {
  const resolved = await resolveParams(params);
  const product = getProductBySlug(resolved.slug);
  if (!product) return buildMetadata({ title: "Product Not Found", description: "Product not found.", path: "/categories" });

  return buildMetadata({
    title: `${product.name} | Specs, Reviews & Price`,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    keywords: [product.name, product.sku, "marine product", "boat gear", "price check"],
  });
}

export default async function ProductPage({ params }: { params: ProductParams | Promise<ProductParams> }) {
  const resolved = await resolveParams(params);
  const product = getProductBySlug(resolved.slug);
  if (!product) notFound();

  const brand = getBrandBySlug(product.brandSlug);
  const relatedProducts = getRelatedProducts(product.relatedProductSlugs);
  const relatedGuides = articles.filter((item) => product.relatedGuideSlugs.includes(item.slug));
  const gallery = product.images.length > 0 ? product.images : ["/images/products/placeholder-product-1.svg"];

  const faqItems = [
    { question: "How current is pricing?", answer: "Pricing and availability can change quickly. Use outbound links for live details before checkout." },
    { question: "Does Sea Supply Hub sell products directly?", answer: "Sea Supply Hub focuses on product research and routes shoppers to trusted merchant pages for checkout." },
  ];

  return (
    <article className="space-y-6">
      <StructuredData data={productSchema({ name: product.name, description: product.longDescription, sku: product.sku, image: gallery.map((img) => absoluteUrl(img)), brand: brand?.name ?? product.brandSlug, url: absoluteUrl(`/products/${product.slug}`) })} />
      <StructuredData data={breadcrumbSchema([{ name: "Home", url: absoluteUrl("/") }, { name: "Products", url: absoluteUrl("/categories") }, { name: product.name, url: absoluteUrl(`/products/${product.slug}`) }])} />
      <StructuredData data={faqSchema(faqItems)} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/categories" }, { label: product.name, href: `/products/${product.slug}` }]} />

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200"><Image src={gallery[0]} alt={`${product.name} main image`} fill className="object-cover" /></div>
            <div className="space-y-3">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200"><Image src={gallery[1] || gallery[0]} alt={`${product.name} alternate image`} fill className="object-cover" /></div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200"><Image src={gallery[2] || gallery[0]} alt={`${product.name} detail image`} fill className="object-cover" /></div>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
          <p className="text-slate-700">{product.longDescription}</p>
          <div><h2 className="text-lg font-semibold text-slate-900">Highlights</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">{product.highlights.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Buy Options</p>
          <p className="text-sm text-slate-700">Checkout is completed on merchant sites. Availability may vary.</p>
          {product.partnerLinks.map((partner) => (
            <div key={partner.url} className="space-y-2 rounded-lg border border-slate-200 p-3">
              <OutboundButton href={partner.url} label={partner.label} />
              <p className="text-xs text-slate-600">{partner.merchant} · Last checked {partner.lastChecked}</p>
            </div>
          ))}
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-semibold text-slate-900">Specifications</h2><table className="mt-3 w-full text-sm"><tbody>{product.specs.map((spec) => <tr key={spec.label} className="border-t border-slate-200 first:border-t-0"><th className="py-2 pr-3 text-left font-medium text-slate-700">{spec.label}</th><td className="py-2 text-slate-900">{spec.value}</td></tr>)}</tbody></table></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-semibold text-slate-900">Compatibility & Guidance</h2><ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">{product.compatibility.map((item) => <li key={item}>{item}</li>)}</ul><h3 className="mt-5 text-lg font-semibold text-slate-900">Pros</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">{product.pros.map((item) => <li key={item}>{item}</li>)}</ul><h3 className="mt-4 text-lg font-semibold text-slate-900">Cons</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">{product.cons.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-semibold text-slate-900">Shipping & Availability Info</h2><p className="mt-2 text-sm text-slate-700">Orders are completed on merchant sites. Shipping speed, returns, and inventory depend on the selected merchant. Always confirm delivery options before checkout.</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-semibold text-slate-900">Brand Profile</h2>{brand ? <div className="mt-2 space-y-2 text-sm text-slate-700">{brand.logoUrl ? <Image src={brand.logoUrl} alt={`${brand.name} logo`} width={160} height={60} className="h-12 w-auto object-contain" /> : null}<p className="font-semibold text-slate-900">{brand.name}</p><p>{brand.description}</p><Link href={`/brands/${brand.slug}`} className="font-semibold text-sky-700 hover:underline">Explore all {brand.name} products</Link></div> : <p className="mt-2 text-sm text-slate-700">Brand profile is being expanded.</p>}</div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-semibold text-slate-900">Related Buying Guides</h2><ul className="mt-3 space-y-2 text-sm text-slate-700">{relatedGuides.map((guide) => <li key={guide.slug}><Link href={guide.type === "buying-guide" ? `/resources/buying-guides/${guide.slug}` : guide.type === "comparison" ? `/resources/comparisons/${guide.slug}` : `/resources/blog/${guide.slug}`} className="text-sky-700 hover:underline">{guide.title}</Link></li>)}</ul></section>

      <section className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white"><h2 className="text-xl font-semibold">Sea Supply Hub Trust Promise</h2><p className="mt-2 text-sm text-slate-200">We prioritize practical product fit, clear specs, and transparent merchant routing so you can buy with confidence.</p></section>

      <FaqList items={faqItems} />

      <section><h2 className="mb-4 text-2xl font-semibold text-slate-900">Related Products</h2><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{relatedProducts.map((related) => <ProductCard key={related.slug} product={related} />)}</div></section>
    </article>
  );
}
