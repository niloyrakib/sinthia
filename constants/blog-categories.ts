import type { AccentColor } from "@/types/content";

export interface BlogCategory {
  slug: string;
  label: string;
  icon: string;
  accent: AccentColor;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { slug: "ai-automation", label: "AI & Automation", icon: "bot", accent: "secondary" },
  { slug: "blogging", label: "Blogging", icon: "file-text", accent: "primary" },
  { slug: "finance", label: "Finance", icon: "wallet", accent: "warning" },
  { slug: "web-resources", label: "Web Resources", icon: "globe", accent: "danger" },
];
