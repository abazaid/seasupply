import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PredictiveSearch } from "@/components/search/predictive-search";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3">
        <MobileNav />
        <Link href="/" className="flex items-center" aria-label="Sea Supply Hub homepage">
          <Image
            src="/images/sea-supply-logo.svg"
            alt="Sea Supply Hub"
            width={512}
            height={140}
            priority
            className="h-9 w-auto sm:h-10 md:h-11 lg:h-12"
            sizes="(max-width: 640px) 170px, (max-width: 1024px) 220px, 260px"
          />
        </Link>
        <div className="hidden lg:flex lg:flex-1">
          <PredictiveSearch />
        </div>
        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm font-medium text-slate-700 xl:flex">
          {categories.slice(0, 6).map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="hover:text-slate-900">
              {category.name}
            </Link>
          ))}
          <Link href="/deals" className="text-orange-600 hover:text-orange-500">
            Deals
          </Link>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-3 lg:hidden">
        <PredictiveSearch />
      </div>
      <MegaMenu />
    </header>
  );
}
