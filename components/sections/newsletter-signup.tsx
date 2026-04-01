export function NewsletterSignup() {
  return (
    <section className="rounded-2xl bg-sky-900 p-6 text-white">
      <h2 className="text-2xl font-semibold">Get Weekly Marine Gear Briefs</h2>
      <p className="mt-2 text-sky-100">
        Receive new buying guides, seasonal checklists, and curated partner deals. No spam.
      </p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row" action="#" method="post">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-sky-700 bg-sky-950 px-4 py-2 text-white placeholder:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        />
        <button
          type="submit"
          className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
