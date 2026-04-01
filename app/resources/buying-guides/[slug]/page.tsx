import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/shared/article-detail";
import { articles, getArticleBySlug } from "@/data";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.filter((article) => article.type === "buying-guide").map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.type !== "buying-guide") {
    return buildMetadata({ title: "Guide Not Found", description: "Guide not found.", path: "/resources/buying-guides" });
  }
  return buildMetadata({ title: article.title, description: article.excerpt, path: `/resources/buying-guides/${article.slug}` });
}

export default function BuyingGuideDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.type !== "buying-guide") notFound();
  return <ArticleDetail article={article} pathPrefix="/resources/buying-guides" />;
}
