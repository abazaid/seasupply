import { ProductCard } from "@/components/shared/product-card";
import { featuredProducts } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Deals & Seasonal Sales",
  description: "Explore rotating marine deals and seasonal partner promotions.",
  path: "/deals",
});

export default function DealsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Deals / Sale</h1>
      <p className="text-slate-700">Limited-time offers curated from trusted marine partner merchants.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
