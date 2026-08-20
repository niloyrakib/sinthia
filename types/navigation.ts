export interface NavItem {
  label: string;
  href: string;
}

export interface MegaMenuCategory {
  slug: string;
  label: string;
  description: string;
  href: string;
  icon: string; // key into the icon map — see lib/icon-map.ts
  accent: "primary" | "secondary" | "success" | "warning" | "danger";
  count?: number;
}

export interface MegaMenuGroup {
  heading: string;
  categories: MegaMenuCategory[];
}

export interface RecentSearch {
  term: string;
  timestamp: number;
}

export interface SearchSuggestion {
  id: string;
  title: string;
  type: "game" | "tool" | "blog" | "category";
  href: string;
  image?: string;
}
