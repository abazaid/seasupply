import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/shared/article-detail";
import { articles, getArticleBySlug } from "@/data";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.filter((article) => article.type === "comparison").map((article) => ({ slug: article.slug }));
}

type ComparisonParams = { slug: string };

export async function generateMetadata({ params }: { params: ComparisonParams | Promise<ComparisonParams> }) {
  const { slug } = await Promise.resolve(params);
  const article = getArticleBySlug(slug);
  if (!article || article.type !== "comparison") {
    return buildMetadata({ title: "Comparison Not Found", description: "Comparison not found.", path: "/resources/comparisons" });
  }
  return buildMetadata({ title: article.title, description: article.excerpt, path: `/resources/comparisons/${article.slug}` });
}

export default async function ComparisonDetailPage({ params }: { params: ComparisonParams | Promise<ComparisonParams> }) {
  const { slug } = await Promise.resolve(params);
  const article = getArticleBySlug(slug);
  if (!article || article.type !== "comparison") notFound();
  return <ArticleDetail article={article} pathPrefix="/resources/comparisons" />;
}
