import Link from "next/link";
import {
  Anchor,
  Battery,
  Compass,
  Fish,
  LifeBuoy,
  Settings,
  Shield,
  Wrench,
} from "lucide-react";
import { CategoryCard } from "@/components/shared/category-card";
import { ProductCard } from "@/components/shared/product-card";
import { ArticleCard } from "@/components/shared/article-card";
import { BrandStrip } from "@/components/sections/brand-strip";
import { HeroSection } from "@/components/sections/hero-section";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { TrustBadges } from "@/components/sections/trust-badges";
import {
  articles,
  bestSellers,
  categories,
  featuredProducts,
  getArticlesByType,
} from "@/data";
import { buildMetadata } from "@/lib/seo";

const shopByCategory = [
  { label: "Marine Electrical", href: "/categories/marine-electrical", icon: Battery },
  { label: "Electronics & Navigation", href: "/categories/electronics-navigation", icon: Compass },
  { label: "Boat Docking", href: "/categories/anchor-docking", icon: Anchor },
  { label: "Boat Maintenance", href: "/categories/boat-maintenance", icon: Wrench },
  { label: "Engine Systems", href: "/categories/engine-systems", icon: Settings },
  { label: "Safety", href: "/categories/safety", icon: Shield },
  { label: "Marine Plumbing", href: "/categories/plumbing", icon: Settings },
  { label: "Fishing", href: "/categories/fishing", icon: Fish },
  { label: "Outdoor Living", href: "/categories/cabin-galley", icon: LifeBuoy },
  { label: "Boats", href: "/categories/boats-motors", icon: Anchor },
  { label: "Outboard Motors", href: "/categories/boats-motors", icon: Settings },
  { label: "Anchoring", href: "/categories/anchor-docking", icon: Anchor },
];

const topCollections = [
  { title: "Offshore Electronics Upgrade", href: "/categories/electronics-navigation" },
  { title: "Family Safety Essentials", href: "/categories/safety" },
  { title: "Spring Maintenance Refit", href: "/categories/boat-maintenance" },
  { title: "Anchor & Dock Confidence Kit", href: "/categories/anchor-docking" },
];

export const metadata = buildMetadata({
  title: "Marine Ecommerce Affiliate Store for US Boaters",
  description:
    "Shop Sea Supply Hub for marine electronics, safety gear, maintenance essentials, and expert buying guides with trusted partner links.",
  path: "/",
  keywords: ["marine supplies", "boat electronics", "boating safety", "affiliate marine store"],
});

export default function HomePage() {
  const guideHighlights = getArticlesByType("buying-guide").slice(0, 3);
  const educationalHighlights = articles.slice(0, 3);

  return (
    <div className="space-y-10">
      <HeroSection />

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-center text-3xl font-bold uppercase tracking-tight text-sky-950">Shop by Category</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {shopByCategory.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className="rounded-xl border border-slate-200 p-3 text-center hover:bg-slate-50">
                <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-slate-200" aria-hidden="true">
                  <Icon className="h-10 w-10 text-sky-900" />
                </div>
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.slice(0, 8).map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </section>

      <BrandStrip />

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl bg-gradient-to-r from-sky-900 to-sky-700 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-100">Seasonal Promotions</p>
          <h2 className="mt-2 text-2xl font-semibold">Spring Marine Readiness Event</h2>
          <p className="mt-2 text-sm text-sky-100">Weekly refresh of navigation, electrical, and maintenance picks curated for US boaters.</p>
          <Link href="/deals" className="mt-4 inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white">Browse Deals</Link>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Top Collections</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">High-Intent Collection Paths</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {topCollections.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="font-semibold text-sky-700 hover:underline">{item.title}</Link>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">Boating Essentials</h2>
          <p className="mt-2 text-sm text-slate-700">
            Navigation, communication, and dock-ready systems for reliable weekend and offshore trips.
          </p>
          <Link href="/categories/electronics-navigation" className="mt-4 inline-block text-sm font-semibold text-sky-700">
            Explore Electronics & Navigation
          </Link>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">Maintenance Essentials</h2>
          <p className="mt-2 text-sm text-slate-700">
            Seasonal cleaning, polishing, and preventive service picks to extend equipment life.
          </p>
          <Link href="/categories/boat-maintenance" className="mt-4 inline-block text-sm font-semibold text-sky-700">
            Explore Boat Maintenance
          </Link>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">Safety Essentials</h2>
          <p className="mt-2 text-sm text-slate-700">
            Build a reliable onboard safety setup with curated life jackets, beacons, and emergency tools.
          </p>
          <Link href="/categories/safety" className="mt-4 inline-block text-sm font-semibold text-sky-700">
            Explore Safety Gear
          </Link>
        </article>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Featured Products</h2>
          <Link href="/deals" className="text-sm font-semibold text-sky-700">
            View Seasonal Deals
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">Best Sellers</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Buying Guides & Learn</h2>
          <Link href="/resources" className="text-sm font-semibold text-sky-700">View All Resources</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guideHighlights.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">Educational Support Content</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {educationalHighlights.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <TrustBadges />
        <NewsletterSignup />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Marine Buying Intelligence for US Boaters</h2>
        <p className="mt-3 text-slate-700">
          Sea Supply Hub combines deep category architecture, product specification clarity, and practical educational content so boat owners can compare with confidence.
          Our affiliate model keeps pages content-rich and transparent while sending purchase traffic to established marine partners.
          Every category and brand page is built with crawlable internal linking, clean metadata, and schema coverage for stronger search visibility.
        </p>
      </section>
    </div>
  );
}
