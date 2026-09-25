// PostHog is reached through this site's own origin, at /ingest, rather than
// directly: ad blockers drop requests to *.posthog.com on sight, so direct
// traffic undercounts exactly the visitors most likely to run one. The SDK's
// two real upstreams sit behind the dashboard host named in
// NEXT_PUBLIC_POSTHOG_HOST — <region>-assets.i.posthog.com serves scripts and
// remote config, <region>.i.posthog.com takes events.
const posthogRegion = (() => {
  try {
    return /^(eu|us)\.posthog\.com$/.exec(new URL(process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com").hostname)?.[1] ?? "eu";
  } catch {
    return "eu";
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // PostHog's API paths end in a slash (/e/, /flags/); Next's default
  // trailing-slash redirect would bounce them and drop the body.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: `https://${posthogRegion}-assets.i.posthog.com/static/:path*` },
      { source: "/ingest/array/:path*", destination: `https://${posthogRegion}-assets.i.posthog.com/array/:path*` },
      { source: "/ingest/:path*", destination: `https://${posthogRegion}.i.posthog.com/:path*` },
    ];
  },
};

module.exports = nextConfig;
