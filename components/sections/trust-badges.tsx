export function TrustBadges() {
  const badges = [
    "Curated by marine specialists",
    "marketplace transparency on every listing",
    "Fast category-to-product research flow",
    "US-focused support content",
  ];

  return (
    <section className="rounded-2xl bg-slate-900 p-6 text-white">
      <h2 className="text-xl font-semibold">Why Boaters Trust Sea Supply Hub</h2>
      <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
        {badges.map((badge) => (
          <li key={badge} className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2">
            {badge}
          </li>
        ))}
      </ul>
    </section>
  );
}

