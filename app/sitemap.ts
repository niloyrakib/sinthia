import type { MetadataRoute } from "next";
import { SITE } from "@/constants/design-tokens";
import { GAME_CATEGORIES } from "@/constants/game-categories";
import { TOOL_CATEGORIES } from "@/constants/tool-categories";
import { BLOG_CATEGORIES } from "@/constants/blog-categories";
import { getGames } from "@/services/games.service";
import { getTools } from "@/services/tools.service";
import { getPosts, getAllAuthorSlugs } from "@/services/blog.service";

export const revalidate = 3600; // regenerate at most once an hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ items: games }, { items: tools }, { items: posts }] = await Promise.all([
    getGames({ perPage: 200 }),
    getTools({ perPage: 200 }),
    getPosts({ perPage: 200 }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/games`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/tools`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE.url}/contact`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const gameRoutes: MetadataRoute.Sitemap = games.map((g) => ({
    url: `${SITE.url}/games/${g.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const toolRoutes: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${SITE.url}/tools/${t.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const gameCategoryRoutes: MetadataRoute.Sitemap = GAME_CATEGORIES.map((c) => ({
    url: `${SITE.url}/games?category=${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const toolCategoryRoutes: MetadataRoute.Sitemap = TOOL_CATEGORIES.map((c) => ({
    url: `${SITE.url}/tools?category=${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const blogCategoryRoutes: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((c) => ({
    url: `${SITE.url}/blog/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const authorSlugs = await getAllAuthorSlugs();
  const authorRoutes: MetadataRoute.Sitemap = authorSlugs.map((slug) => ({
    url: `${SITE.url}/blog/author/${slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...gameRoutes,
    ...toolRoutes,
    ...postRoutes,
    ...gameCategoryRoutes,
    ...toolCategoryRoutes,
    ...blogCategoryRoutes,
    ...authorRoutes,
  ];
}
