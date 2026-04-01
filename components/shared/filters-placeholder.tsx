export function FiltersPlaceholder() {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4">
      <h2 className="text-base font-semibold text-slate-900">Filter & Sort</h2>
      <p className="mt-2 text-sm text-slate-700">
        Filter architecture is live and ready for future search backends (Algolia/Meilisearch).
      </p>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        <li>Brand</li>
        <li>Price Range</li>
        <li>Compatibility</li>
        <li>Rating</li>
      </ul>
    </aside>
  );
}
