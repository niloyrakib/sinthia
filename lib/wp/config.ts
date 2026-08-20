export const WP_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_WP_API_URL ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sinthia.top",
  /** Custom REST namespace for endpoints that aren't plain WP posts (search, newsletter). */
  customNamespace: "sinthia/v1",
} as const;

export const WP_ENDPOINTS = {
  games: "/games",
  tools: "/tools",
  posts: "/posts",
  categories: "/categories",
  users: "/users",
  media: "/media",
} as const;

/** True once a real WP backend URL has been configured via env. */
export const isWpConfigured = Boolean(WP_CONFIG.apiUrl);
