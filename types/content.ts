export type AccentColor = "primary" | "secondary" | "success" | "warning" | "danger";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Game {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  accent: AccentColor;
  rating: number; // 0-5
  plays: number;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface Tool {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  accent: AccentColor;
  icon: string; // key into lib/icon-map.ts
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface ContentBlock {
  type: "heading" | "paragraph";
  text: string;
  id?: string; // present on headings, used for the table of contents
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  accent: AccentColor;
  authorSlug: string;
  author: string;
  publishedAt: string; // ISO date
  readTimeMinutes: number;
  tags: string[];
  content: ContentBlock[];
  faqs?: FaqItem[];
  isFeatured?: boolean;
  isTrending?: boolean;
}
