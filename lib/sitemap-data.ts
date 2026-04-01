import { articles, brands, categories, products } from "@/data";

export const staticPages = [
  "/",
  "/about",
  "/contact",
  "/shipping-delivery",
  "/returns-policy",
  "/marketplace-disclosure",
  "/privacy-policy",
  "/terms-of-service",
  "/accessibility-statement",
  "/sitemap",
  "/brands",
  "/deals",
  "/resources",
  "/resources/buying-guides",
  "/resources/blog",
  "/resources/comparisons",
  "/faq",
  "/help-center",
  "/categories",
  "/search",
  "/featured-collections",
];

export const categoryPaths = categories.flatMap((category) => [
  `/categories/${category.slug}`,
  ...category.subcategories.map((sub) => `/categories/${category.slug}/${sub.slug}`),
]);

export const productPaths = products.map((product) => `/products/${product.slug}`);
export const articlePaths = articles.map((article) =>
  article.type === "buying-guide"
    ? `/resources/buying-guides/${article.slug}`
    : article.type === "comparison"
      ? `/resources/comparisons/${article.slug}`
      : `/resources/blog/${article.slug}`,
);
export const brandPaths = brands.map((brand) => `/brands/${brand.slug}`);


