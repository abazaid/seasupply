"use client";

import { useEffect } from "react";

export function useAffiliateTracking() {
  useEffect(() => {
    function onAffiliateClick(event: Event) {
      const custom = event as CustomEvent<{ href: string; at: number }>;
      if (process.env.NODE_ENV !== "production") {
        console.info("Affiliate outbound click", custom.detail);
      }
    }

    window.addEventListener("affiliate_click", onAffiliateClick);
    return () => {
      window.removeEventListener("affiliate_click", onAffiliateClick);
    };
  }, []);
}
