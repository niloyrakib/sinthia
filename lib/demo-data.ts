// lib/demo-data.ts
// Placeholder data shaped exactly like the Firestore models in lib/types.ts.
// Swap each export for a real query (see lib/queries.ts you'll add in Phase 2)
// once Firestore is connected — components don't need to change.

import type { Game, Tool, Post } from "./types";

export const popularGames: Pick<Game, "id" | "title" | "slug" | "thumbnail" | "categoryId">[] = [
  { id: "1", title: "Space Adventure", slug: "space-adventure", thumbnail: "space", categoryId: "Adventure" },
  { id: "2", title: "Racing Extreme", slug: "racing-extreme", thumbnail: "racing", categoryId: "Racing" },
  { id: "3", title: "Puzzle Master", slug: "puzzle-master", thumbnail: "puzzle", categoryId: "Puzzle" },
  { id: "4", title: "Zombie Survival", slug: "zombie-survival", thumbnail: "zombie", categoryId: "Action" },
];

export const usefulTools: Pick<Tool, "id" | "title" | "slug" | "categoryId">[] = [
  { id: "1", title: "Image Compressor", slug: "image-compressor", categoryId: "Image" },
  { id: "2", title: "QR Code Generator", slug: "qr-code-generator", categoryId: "Generator" },
  { id: "3", title: "Password Generator", slug: "password-generator", categoryId: "Security" },
  { id: "4", title: "Text Counter", slug: "text-counter", categoryId: "Text" },
];

export const latestPosts: Pick<Post, "id" | "title" | "slug" | "publishedAt" | "authorId">[] = [
  { id: "1", title: "10 Amazing AI Tools You Should Try in 2026", slug: "ai-tools-2026", publishedAt: "2026-07-10", authorId: "Admin" },
  { id: "2", title: "The Future of Web Gaming: Trends to Watch", slug: "future-web-gaming", publishedAt: "2026-07-08", authorId: "John Doe" },
  { id: "3", title: "How to Stay Productive with Online Tools", slug: "productive-online-tools", publishedAt: "2026-07-05", authorId: "Sarah Smith" },
  { id: "4", title: "SEO Best Practices for Bloggers in 2026", slug: "seo-best-practices", publishedAt: "2026-07-02", authorId: "Admin" },
];

export const platformStats = [
  { label: "Games", value: "250+" },
  { label: "Tools", value: "150+" },
  { label: "Articles", value: "500+" },
];
