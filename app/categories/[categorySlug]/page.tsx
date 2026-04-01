import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { FiltersPlaceholder } from "@/components/shared/filters-placeholder";
import { ProductCard } from "@/components/shared/product-card";
import { StructuredData } from "@/components/shared/structured-data";
import {
  brands,
  getCategoryBySlug,
  getFaqsByIds,
  getProductsByCategory,
  getRelatedArticles,
  categories,
} from "@/data";
import { breadcrumbSchema, collectionSchema, faqSchema } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

type CategoryParams = { categorySlug: string };

function resolveParams(params: CategoryParams | Promise<CategoryParams>) {
  return Promise.resolve(params);
}

export function generateStaticParams() {
  return categories.map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: CategoryParams | Promise<CategoryParams>;
}) {
  const resolved = await resolveParams(params);
  const category = getCategoryBySlug(resolved.categorySlug);
  if (!category) {
    return buildMetadata({ title: "Category Not Found", description: "Category not found.", path: "/categories" });
  }

  return buildMetadata({
    title: `${category.name} Marine Gear`,
    description: category.description,
    path: `/categories/${category.slug}`,
    keywords: [
      category.name,
      `${category.name} marine products`,
      "boat parts",
      "marine equipment",
      "marine store",
    ],
  });
}

export default async function CategoryPage({
  params,
}: {
  params: CategoryParams | Promise<CategoryParams>;
}) {
  const resolved = await resolveParams(params);
  const category = getCategoryBySlug(resolved.categorySlug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);
  const faqs = getFaqsByIds(category.faqIds).map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  const featuredBrandCards = brands.filter((brand) => category.featuredBrandSlugs.includes(brand.slug));
  const relatedGuideSlugs = Array.from(new Set(products.flatMap((product) => product.relatedGuideSlugs))).slice(0, 3);
  const buyingGuides = getRelatedArticles(relatedGuideSlugs);

  return (
    <div className="space-y-6">
      <StructuredData
        data={collectionSchema(
          category.name,
          category.description,
          absoluteUrl(`/categories/${category.slug}`),
          products.length,
        )}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Categories", url: absoluteUrl("/categories") },
          { name: category.name, url: absoluteUrl(`/categories/${category.slug}`) },
        ])}
      />
      {faqs.length > 0 ? <StructuredData data={faqSchema(faqs)} /> : null}

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name, href: `/categories/${category.slug}` },
        ]}
      />

      <header className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-semibold text-slate-900">{category.name}</h1>
        <p className="mt-3 text-slate-700">{category.seoIntro}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {category.subcategories.map((sub) => (
          <Link
            key={sub.slug}
            href={`/categories/${category.slug}/${sub.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-4 hover:bg-slate-50"
          >
            <h2 className="font-semibold text-slate-900">{sub.name}</h2>
            <p className="mt-2 text-sm text-slate-700">{sub.description}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Featured Brands in {category.name}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {featuredBrandCards.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="rounded-lg border border-slate-200 p-3 text-center hover:bg-slate-50"
            >
              {brand.logoUrl ? (
                <Image
                  src={brand.logoUrl}
                  alt={`${brand.name} logo`}
                  width={120}
                  height={42}
                  className="mx-auto h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-sm font-semibold">{brand.logoText}</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FiltersPlaceholder />
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Featured Products</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.slice(0, 9).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Buying Guides for {category.name}</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {buyingGuides.map((guide) => (
            <li key={guide.slug}>
              <Link
                className="font-semibold text-sky-700 hover:underline"
                href={
                  guide.type === "buying-guide"
                    ? `/resources/buying-guides/${guide.slug}`
                    : guide.type === "comparison"
                      ? `/resources/comparisons/${guide.slug}`
                      : `/resources/blog/${guide.slug}`
                }
              >
                {guide.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FaqList items={faqs} />
    </div>
  );
}

