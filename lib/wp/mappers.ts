import type { Game, Tool, BlogPost, AccentColor, ContentBlock, FeaturedImage } from "@/types/content";
import type { Author } from "@/constants/mock-authors";
import type { WpBaseEntity, WpGame, WpTool, WpPost } from "./types";

const VALID_ACCENTS: AccentColor[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

function toAccent(value: string | undefined): AccentColor {
  return (VALID_ACCENTS as string[]).includes(value ?? "")
    ? (value as AccentColor)
    : "primary";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Strips WP's rendered HTML down to plain text for excerpts/titles. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * Pulls the featured image out of `_embedded["wp:featuredmedia"]`.
 * Requires the REST request to have been made with `_embed=1` (or
 * `_embed=wp:featuredmedia`) — without it WP never sends this block,
 * which is the #1 reason "featured images aren't showing".
 */
function getFeaturedImage(wp: WpBaseEntity): FeaturedImage | undefined {
  const media = wp._embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) return undefined;
  return {
    url: media.source_url,
    alt: media.alt_text || wp.title.rendered.replace(/<[^>]*>/g, ""),
  };
}

/** Splits WP's `<h2>`/`<p>` post_content HTML into typed content blocks for the article renderer. */
function parseContentBlocks(html: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const regex = /<(h2|p)[^>]*>([\s\S]*?)<\/\1>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const tag = match[1];
    const inner = match[2];
    if (!tag || inner === undefined) continue;
    const text = stripHtml(inner);
    if (!text) continue;

    if (tag === "h2") {
      blocks.push({ type: "heading", text, id: slugify(text) });
    } else {
      blocks.push({ type: "paragraph", text });
    }
  }

  return blocks;
}

export function mapWpGame(wp: WpGame): Game {
  const category = wp.acf.game_category ?? "Arcade";
  return {
    id: String(wp.id),
    slug: wp.slug,
    title: stripHtml(wp.title.rendered),
    category,
    categorySlug: slugify(category),
    accent: toAccent(wp.acf.accent_color),
    rating: wp.acf.rating ?? 0,
    plays: wp.acf.plays ?? 0,
    difficulty: wp.acf.difficulty ?? "Medium",
    tags: wp.acf.tags
      ? wp.acf.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
    description: wp.excerpt ? stripHtml(wp.excerpt.rendered) : "",
    isNew: wp.acf.is_new,
    isTrending: wp.acf.is_trending,
    image: getFeaturedImage(wp),
  };
}

export function mapWpTool(wp: WpTool): Tool {
  const category = wp.acf.tool_category ?? "Utility";
  return {
    id: String(wp.id),
    slug: wp.slug,
    title: stripHtml(wp.title.rendered),
    category,
    categorySlug: slugify(category),
    description: wp.acf.description ?? "",
    accent: toAccent(wp.acf.accent_color),
    icon: wp.acf.icon ?? "wrench",
    isFeatured: wp.acf.is_featured,
    isTrending: wp.acf.is_trending,
    image: getFeaturedImage(wp),
  };
}

export function mapWpPost(wp: WpPost): BlogPost {
  const terms = wp._embedded?.["wp:term"]?.[0] ?? [];
  const category = terms.find((t) => t.taxonomy === "category")?.name ?? "Blog";
  const tags = terms.filter((t) => t.taxonomy === "post_tag").map((t) => t.name);
  const authorEmbed = wp._embedded?.author?.[0];
  const contentHtml = wp.content?.rendered ?? "";
  const wordCount = stripHtml(contentHtml).split(/\s+/).filter(Boolean).length;

  return {
    id: String(wp.id),
    slug: wp.slug,
    title: stripHtml(wp.title.rendered),
    excerpt: wp.excerpt ? stripHtml(wp.excerpt.rendered) : "",
    category,
    categorySlug: slugify(category),
    accent: "primary",
    authorSlug: authorEmbed?.slug ?? "rakib-hasan",
    author: authorEmbed?.name ?? "SINTHIA Team",
    publishedAt: wp.date,
    readTimeMinutes:
      wp.acf?.read_time_minutes ?? Math.max(1, Math.round(wordCount / 200)),
    tags,
    content: parseContentBlocks(contentHtml),
    faqs: wp.acf?.faqs,
    image: getFeaturedImage(wp),
  };
}

export function mapWpAuthor(embed: {
  id: number;
  name: string;
  slug: string;
  description?: string;
}): Author {
  return {
    slug: embed.slug,
    name: embed.name,
    role: "Contributor",
    bio: embed.description ?? "",
    accent: "primary",
  };
}
