import Link from "next/link";

export function UtilityBar() {
  return (
    <div className="hidden bg-slate-950 px-4 py-2 text-xs text-slate-100 md:block">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <p>US Support: Mon-Fri 8am-6pm ET | Track orders on partner sites</p>
        <div className="flex items-center gap-4">
          <Link href="/help-center" className="hover:text-white">
            Help Center
          </Link>
          <Link href="/affiliate-disclosure" className="hover:text-white">
            Affiliate Disclosure
          </Link>
          <span>Account (coming soon)</span>
        </div>
      </div>
    </div>
  );
}
