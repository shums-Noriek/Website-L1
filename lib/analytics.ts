// Thin wrapper around posthog-js so call sites never import the SDK
// directly — ported from apps/web/lib/analytics.ts so the marketing site
// reports into the same PostHog project as the ERP app.
//
// autocapture and session replay are both off: the "Ready to transform your
// space" form collects a visitor's name, phone and email, and autocapture
// logs the text of whatever was clicked while session replay records the
// visible DOM. Every event this site sends is therefore explicit, via
// track() below, with hand-picked non-PII properties.
import posthog from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com";

let initialized = false;

export function initAnalytics() {
  if (initialized || !KEY || typeof window === "undefined") return;
  posthog.init(KEY, {
    api_host: HOST,
    autocapture: false,
    disable_session_recording: true,
    // Off, deliberately — posthog-js's own pageview autocapture misses
    // Next.js App Router client-side navigation. PostHogInit calls
    // capturePageview() itself off usePathname() for every route.
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
    // No feature flags in use on this site — skips the startup /flags/ call.
    advanced_disable_feature_flags: true,
  });
  initialized = true;
}

export function track(event: string, properties?: Record<string, string | number | boolean>) {
  if (!initialized) return;
  posthog.capture(event, properties);
}

// Called by PostHogInit on every route change (capture_pageview is off in
// init() — see there for why).
export function capturePageview(pathname: string) {
  if (!initialized) return;
  posthog.capture("$pageview", { $current_url: pathname });
}
