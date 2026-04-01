import Link from "next/link";
import { categories } from "@/data";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold">Sea Supply Hub</h2>
            <p className="mt-3 text-sm text-slate-300">
              Affiliate-first marine commerce platform built for high-intent buyers who need clear specs,
              practical guidance, and trusted partner links.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Shop Categories</h3>
            <ul className="mt-3 space-y-1 text-sm text-slate-300">
              {categories.slice(0, 8).map((category) => (
                <li key={category.slug}>
                  <Link href={`/categories/${category.slug}`} className="hover:text-white">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Resources</h3>
            <ul className="mt-3 space-y-1 text-sm text-slate-300">
              <li><Link href="/resources/buying-guides">Buying Guides</Link></li>
              <li><Link href="/resources/blog">Marine Blog</Link></li>
              <li><Link href="/resources/comparisons">Comparisons</Link></li>
              <li><Link href="/faq">FAQ Hub</Link></li>
              <li><Link href="/help-center">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-3 space-y-1 text-sm text-slate-300">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/affiliate-disclosure">Affiliate Disclosure</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Sea Supply Hub. Prices and inventory are provided by partner merchants and may change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
}
