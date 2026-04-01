import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { FiltersPlaceholder } from "@/components/shared/filters-placeholder";
import { ProductCard } from "@/components/shared/product-card";
import { StructuredData } from "@/components/shared/structured-data";
import { categories, getProductsBySubcategory, getSubcategory } from "@/data";
import { breadcrumbSchema, collectionSchema, faqSchema } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      categorySlug: category.slug,
      subcategorySlug: subcategory.slug,
    })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { categorySlug: string; subcategorySlug: string };
}) {
  const subcategory = getSubcategory(params.categorySlug, params.subcategorySlug);
  if (!subcategory) {
    return buildMetadata({
      title: "Subcategory Not Found",
      description: "Subcategory not found.",
      path: "/categories",
    });
  }

  return buildMetadata({
    title: `${subcategory.name} Marine Products`,
    description: subcategory.description,
    path: `/categories/${params.categorySlug}/${params.subcategorySlug}`,
    keywords: [subcategory.name, "marine subcategory", "boat parts", "marine gear"],
  });
}

export default function SubcategoryPage({
  params,
}: {
  params: { categorySlug: string; subcategorySlug: string };
}) {
  const subcategory = getSubcategory(params.categorySlug, params.subcategorySlug);
  if (!subcategory) notFound();

  const products = getProductsBySubcategory(params.categorySlug, params.subcategorySlug);

  const scopedFaqs = [
    {
      question: `How do I choose the right ${subcategory.name.toLowerCase()} product?`,
      answer:
        "Match your boat type, usage conditions, and compatibility requirements, then compare specs and partner availability.",
    },
    {
      question: "Are prices fixed on Sea Supply Hub?",
      answer:
        "No. Prices are provided by partner merchants and may change based on inventory and promotions.",
    },
  ];

  return (
    <div className="space-y-6">
      <StructuredData
        data={collectionSchema(
          subcategory.name,
          subcategory.description,
          absoluteUrl(`/categories/${params.categorySlug}/${params.subcategorySlug}`),
          products.length,
        )}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Categories", url: absoluteUrl("/categories") },
          {
            name: subcategory.name,
            url: absoluteUrl(`/categories/${params.categorySlug}/${params.subcategorySlug}`),
          },
        ])}
      />
      <StructuredData data={faqSchema(scopedFaqs)} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          {
            label: subcategory.name,
            href: `/categories/${params.categorySlug}/${params.subcategorySlug}`,
          },
        ]}
      />

      <header className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-semibold text-slate-900">{subcategory.name}</h1>
        <p className="mt-2 text-slate-700">{subcategory.description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FiltersPlaceholder />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>

      <FaqList items={scopedFaqs} />
    </div>
  );
}
