const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * Content-Security-Policy — scoped to what SINTHIA actually loads:
 * - 'self' for scripts/styles (Next's inline hydration scripts need
 *   'unsafe-inline' unless a nonce pipeline is added; kept simple here)
 * - api.qrserver.com for the QR Code Generator tool (Phase 6)
 * - the WP media host for real featured images once Phase 8 is live
 * - vercel analytics/speed-insights endpoints
 * Tighten this further (e.g. add a nonce, drop 'unsafe-inline') once the
 * exact set of third-party embeds is finalized for production.
 */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://api.qrserver.com https://sinthia.top https://cms.sinthia.top;
  font-src 'self' data:;
  connect-src 'self' https://cms.sinthia.top https://api.qrserver.com https://vitals.vercel-insights.com;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self';
`
  .replace(/\s{2,}/g, " ")
  .trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sinthia.top",
        pathname: "/wp-content/uploads/**",
      },
      {
        // Allow the WP admin/staging subdomain during development.
        protocol: "https",
        hostname: "cms.sinthia.top",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: ContentSecurityPolicy },
        ],
      },
      {
        // Static build assets are content-hashed — safe to cache forever.
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
