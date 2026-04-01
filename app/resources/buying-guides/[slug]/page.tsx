import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/shared/article-detail";
import { articles, getArticleBySlug } from "@/data";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.filter((article) => article.type === "buying-guide").map((article) => ({ slug: article.slug }));
}

type BuyingGuideParams = { slug: string };

export async function generateMetadata({ params }: { params: BuyingGuideParams | Promise<BuyingGuideParams> }) {
  const { slug } = await Promise.resolve(params);
  const article = getArticleBySlug(slug);
  if (!article || article.type !== "buying-guide") {
    return buildMetadata({ title: "Guide Not Found", description: "Guide not found.", path: "/resources/buying-guides" });
  }
  return buildMetadata({ title: article.title, description: article.excerpt, path: `/resources/buying-guides/${article.slug}` });
}

export default async function BuyingGuideDetailPage({ params }: { params: BuyingGuideParams | Promise<BuyingGuideParams> }) {
  const { slug } = await Promise.resolve(params);
  const article = getArticleBySlug(slug);
  if (!article || article.type !== "buying-guide") notFound();
  return <ArticleDetail article={article} pathPrefix="/resources/buying-guides" />;
}
