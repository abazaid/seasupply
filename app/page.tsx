import Image from "next/image";
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
import { ProductCard } from "@/components/shared/product-card";
import { ArticleCard } from "@/components/shared/article-card";
import { BrandStrip } from "@/components/sections/brand-strip";
import { HeroSection } from "@/components/sections/hero-section";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { TrustBadges } from "@/components/sections/trust-badges";
import {
  articles,
  bestSellers,
  featuredProducts,
  getArticlesByType,
} from "@/data";
import { buildMetadata } from "@/lib/seo";

const shopByCategory = [
  { label: "Marine Electrical", href: "/categories/marine-electrical", icon: Battery, image: "/categories/marine-electrical.jpg", imageAlt: "Marine electrical category featuring AGM marine battery" },
  { label: "Electronics & Navigation", href: "/categories/electronics-navigation", icon: Compass, image: "/categories/electronics-navigation.jpg", imageAlt: "Electronics and navigation category featuring chartplotter display" },
  { label: "Boat Docking", href: "/categories/anchor-docking", icon: Anchor, image: "/categories/boat-docking.jpg", imageAlt: "Boat docking category featuring marine fenders" },
  { label: "Boat Maintenance", href: "/categories/boat-maintenance", icon: Wrench, image: "/categories/boat-maintenance.jpg", imageAlt: "Boat maintenance category featuring antifouling paint" },
  { label: "Engine Systems", href: "/categories/engine-systems", icon: Settings, image: "/categories/engine-systems.png", imageAlt: "Engine systems category featuring marine engine oils and fluids" },
  { label: "Safety", href: "/categories/safety", icon: Shield, image: "/categories/safety.png", imageAlt: "Marine safety category featuring inflatable life jacket" },
  { label: "Marine Plumbing", href: "/categories/plumbing", icon: Settings, image: "/categories/marine-plumbing.jpg", imageAlt: "Marine plumbing category featuring bilge pump" },
  { label: "Fishing", href: "/categories/fishing", icon: Fish, image: "/categories/fishing.jpg", imageAlt: "Fishing category featuring spinning reel" },
  { label: "Outdoor Living", href: "/categories/cabin-galley", icon: LifeBuoy, image: "/categories/outdoor-living.jpg", imageAlt: "Outdoor living category featuring marine folding chair" },
  { label: "Boats", href: "/categories/boats-motors", icon: Anchor, image: "/categories/boats.png", imageAlt: "Boats category featuring inflatable dinghy" },
  { label: "Outboard Motors", href: "/categories/boats-motors", icon: Settings, image: "/categories/outboard-motors.png", imageAlt: "Outboard motors category featuring marine outboard engine" },
  { label: "Anchoring", href: "/categories/anchor-docking", icon: Anchor, image: "/categories/anchoring.jpg", imageAlt: "Anchoring category featuring stainless steel anchor" },
];

const topCollections = [
  { title: "Offshore Electronics Upgrade", href: "/categories/electronics-navigation" },
  { title: "Family Safety Essentials", href: "/categories/safety" },
  { title: "Spring Maintenance Refit", href: "/categories/boat-maintenance" },
  { title: "Anchor & Dock Confidence Kit", href: "/categories/anchor-docking" },
];

export const metadata = buildMetadata({
  title: "Marine Ecommerce marketplace Store for US Boaters",
  description:
    "Shop Sea Supply Hub for marine electronics, safety gear, maintenance essentials, and expert buying guides with trusted partner links.",
  path: "/",
  keywords: ["marine supplies", "boat electronics", "boating safety", "marine store"],
});

export default function HomePage() {
  const guideHighlights = getArticlesByType("buying-guide").slice(0, 3);
  const educationalHighlights = articles.slice(0, 3);

  return (
    <div className="space-y-10">
      <HeroSection />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-center text-3xl font-bold uppercase tracking-tight text-sky-950">Shop by Category</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {shopByCategory.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} className="rounded-2xl border border-slate-200 p-4 text-center transition hover:-translate-y-0.5 hover:bg-slate-50">
                <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-slate-200" aria-hidden="true">
                  <Icon className="h-10 w-10 text-sky-900" />
                </div>
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Category Visual Picks</h2>
          <Link href="/categories" className="text-sm font-semibold text-sky-700 hover:underline">View All Categories</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {shopByCategory.map((item) => (
            <Link key={`image-${item.label}`} href={item.href} className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="relative aspect-[4/3] w-full">
                <Image src={item.image} alt={item.imageAlt} fill className="object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
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
          Our marketplace model keeps pages content-rich and transparent while sending purchase traffic to established marine partners.
          Every category and brand page is built with crawlable internal linking, clean metadata, and schema coverage for stronger search visibility.
        </p>
      </section>
    </div>
  );
}

