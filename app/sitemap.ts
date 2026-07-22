import type { MetadataRoute } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const BASE_URL = "https://sinthia.top";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/games`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/tools`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.3 },
  ];

  try {
    const [games, tools, posts] = await Promise.all([
      getDocs(query(collection(db, "games"), where("status", "==", "published"))),
      getDocs(query(collection(db, "tools"), where("status", "==", "published"))),
      getDocs(query(collection(db, "posts"), where("status", "==", "published"))),
    ]);

    const gameUrls = games.docs.map((d) => ({
      url: `${BASE_URL}/games/${d.data().slug}`,
      lastModified: d.data().updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
    const toolUrls = tools.docs.map((d) => ({
      url: `${BASE_URL}/tools/${d.data().slug}`,
      lastModified: d.data().updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
    const postUrls = posts.docs.map((d) => ({
      url: `${BASE_URL}/blog/${d.data().slug}`,
      lastModified: d.data().updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...gameUrls, ...toolUrls, ...postUrls];
  } catch {
    // Firestore not reachable at build time (e.g. no env vars yet) — fall back to static routes
    return staticRoutes;
  }
}
