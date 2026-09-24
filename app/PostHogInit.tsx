"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initAnalytics, capturePageview } from "@/lib/analytics";

// Ported from apps/web/app/PostHogInit.tsx — mounted once in the root
// layout so pageview tracking covers every route on the site.
export default function PostHogInit() {
  const pathname = usePathname();

  useEffect(() => {
    initAnalytics();
  }, []);

  // Fires for the first render too, not just subsequent route changes —
  // there's no separate "initial pageview" from the SDK since
  // capture_pageview is off (see lib/analytics.ts).
  useEffect(() => {
    if (pathname) capturePageview(pathname);
  }, [pathname]);

  return null;
}
