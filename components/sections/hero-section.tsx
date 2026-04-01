import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top,_#0ea5e9,_#0b1f3a_45%,_#020617)] px-6 py-14 text-white md:px-10">
      <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-cyan-300/20 blur-2xl" aria-hidden="true" />
      <div className="absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-blue-400/20 blur-2xl" aria-hidden="true" />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">US Marine Gear Intelligence</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
        Research smarter. Buy from trusted marine partners.
      </h1>
      <p className="mt-4 max-w-2xl text-sky-100">
        Sea Supply Hub delivers enterprise-grade marine product discovery with deep category coverage,
        buying guides, and affiliate-ready partner links.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/categories" className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-400">
          Shop Categories
        </Link>
        <Link href="/resources/buying-guides" className="rounded-lg border border-sky-200/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
          Explore Buying Guides
        </Link>
      </div>
    </section>
  );
}
