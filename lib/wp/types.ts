export interface WpRendered {
  rendered: string;
}

export interface WpBaseEntity {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: WpRendered;
  content?: WpRendered;
  excerpt?: WpRendered;
  featured_media?: number;
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text?: string }[];
    author?: { id: number; name: string; slug: string; description?: string }[];
    "wp:term"?: { id: number; name: string; slug: string; taxonomy: string }[][];
  };
}

/** Games CPT — assumes ACF fields registered via the "ACF to REST API" plugin. */
export interface WpGame extends WpBaseEntity {
  acf: {
    rating: number;
    plays: number;
    difficulty: "Easy" | "Medium" | "Hard";
    tags: string; // comma-separated in ACF, split on our side
    game_category: string;
    accent_color: string;
    is_new?: boolean;
    is_trending?: boolean;
  };
}

/** Tools CPT. */
export interface WpTool extends WpBaseEntity {
  acf: {
    description: string;
    tool_category: string;
    accent_color: string;
    icon: string;
    is_featured?: boolean;
    is_trending?: boolean;
  };
}

/** Standard WP posts, used for the blog. */
export interface WpPost extends WpBaseEntity {
  acf?: {
    read_time_minutes?: number;
    faqs?: { question: string; answer: string }[];
  };
}

export interface WpListResponse<T> {
  items: T[];
  total: number;
  totalPages: number;
}
