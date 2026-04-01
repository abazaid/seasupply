"use client";

import { ExternalLink } from "lucide-react";
import { useCallback } from "react";

interface AffiliateButtonProps {
  href: string;
  label: string;
}

export function AffiliateButton({ href, label }: AffiliateButtonProps) {
  const onClick = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("affiliate_click", {
          detail: { href, at: Date.now() },
        }),
      );
    }
  }, [href]);

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
    >
      {label}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
