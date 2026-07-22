// lib/types.ts — Firestore collection schemas.
// Collections: posts, games, tools, categories, tags, users, media, settings

export type ContentStatus = "draft" | "scheduled" | "published" | "archived";

export interface SEOFields {
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BaseContent extends SEOFields {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  categoryId: string;
  tagIds: string[];
  status: ContentStatus;
  createdAt: string; // ISO date
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
}

export interface Post extends BaseContent {
  content: string; // rich text / markdown
  excerpt: string;
  featuredImage: string;
  authorId: string;
  faq?: FAQItem[];
  relatedPostIds?: string[];
}

export interface Game extends BaseContent {
  gameUrl: string; // embed URL or iframe target
  screenshots: string[];
  instructions: string;
  controls: string;
  developer: string;
  playCount: number;
}

export interface Tool extends BaseContent {
  toolUrl: string; // route to internal component, or external embed
  instructions: string;
  faq?: FAQItem[];
  usageCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: "post" | "game" | "tool" | "general";
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export type UserRole = "admin" | "editor" | "author" | "viewer";

export interface AppUser {
  id: string; // Firebase Auth UID
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  path: string; // Storage path
  fileName: string;
  contentType: string;
  size: number;
  uploadedBy: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logoUrl?: string;
  defaultOgImage?: string;
}
