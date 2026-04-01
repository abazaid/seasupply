import Link from "next/link";

export default function NotFound() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
      <h1 className="text-4xl font-semibold text-slate-900">Page Not Found</h1>
      <p className="mt-3 text-slate-700">The page you requested could not be found. Explore our categories or search the site.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/categories" className="rounded-lg bg-sky-800 px-4 py-2 text-white">Browse Categories</Link>
        <Link href="/search" className="rounded-lg border border-slate-300 px-4 py-2">Search</Link>
      </div>
    </section>
  );
}
