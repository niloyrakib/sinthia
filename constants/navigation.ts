import type { MegaMenuGroup, NavItem } from "@/types/navigation";

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/games" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
];

export const SECONDARY_NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Categories mega menu — grouped so the panel reads as "browse by section"
 * rather than a flat list. Counts are placeholders until Phase 8 wires WP data.
 */
export const CATEGORIES_MENU: MegaMenuGroup[] = [
  {
    heading: "Browse by section",
    categories: [
      {
        slug: "instant-games",
        label: "Instant Games",
        description: "Fun and free browser games to play instantly",
        href: "/games",
        icon: "gamepad",
        accent: "primary",
        count: 150,
      },
      {
        slug: "online-tools",
        label: "Online Tools",
        description: "Powerful tools to make your tasks easier",
        href: "/tools",
        icon: "wrench",
        accent: "success",
        count: 120,
      },
      {
        slug: "ai-automation",
        label: "AI & Automation",
        description: "AI tools, guides & automation tips",
        href: "/blog/category/ai-automation",
        icon: "bot",
        accent: "secondary",
        count: 80,
      },
      {
        slug: "web-resources",
        label: "Web Resources",
        description: "Useful resources for developers & creators",
        href: "/blog/category/web-resources",
        icon: "globe",
        accent: "danger",
        count: 65,
      },
      {
        slug: "finance",
        label: "Finance",
        description: "Finance tips, guides & money making ideas",
        href: "/blog/category/finance",
        icon: "wallet",
        accent: "warning",
        count: 40,
      },
    ],
  },
];
