import Link from "next/link";
import { FaqList } from "@/components/shared/faq-list";
import { ProductCard } from "@/components/shared/product-card";
import { StructuredData } from "@/components/shared/structured-data";
import { getRelatedProducts } from "@/data";
import { articleSchema as articleSchemaData, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import type { Article } from "@/types";

export function ArticleDetail({ article, pathPrefix }: { article: Article; pathPrefix: string }) {
  const relatedProducts = getRelatedProducts(article.relatedProductSlugs);
  const path = `${pathPrefix}/${article.slug}`;

  return (
    <article className="space-y-8">
      <StructuredData
        data={articleSchemaData({
          title: article.title,
          description: article.excerpt,
          url: absoluteUrl(path),
          image: absoluteUrl(article.coverImage),
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          author: article.author,
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Resources", url: absoluteUrl("/resources") },
          { name: article.title, url: absoluteUrl(path) },
        ])}
      />

      <header className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{article.type.replace("-", " ")}</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">{article.title}</h1>
        <p className="mt-3 text-slate-700">{article.excerpt}</p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        {article.sections.map((section) => (
          <section key={section.heading} className="mb-6 last:mb-0">
            <h2 className="text-xl font-semibold text-slate-900">{section.heading}</h2>
            <p className="mt-2 text-slate-700">{section.body}</p>
          </section>
        ))}
      </div>

      <FaqList items={article.faqs} />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">Related Products</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <Link href="/resources" className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100">
        Back to Resources
      </Link>
    </article>
  );
}
