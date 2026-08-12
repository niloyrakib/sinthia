/**
 * SINTHIA Design Tokens
 * Single source of truth for the design system. Tailwind's config reads
 * hardcoded copies of these values (Tailwind requires static config), so if
 * you change a value here, mirror it in `tailwind.config.ts`.
 */

export const COLORS = {
  background: "#FEFEFE",
  primary: "#6366F1",
  secondary: "#8B5CF6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  border: "#E5E7EB",
  text: "#111827",
  textMuted: "#6B7280",
} as const;

export const RADIUS = {
  card: "16px",
  cardLarge: "24px",
} as const;

export const FONT = {
  family: "Inter",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const SITE = {
  name: "SINTHIA",
  tagline: "Play. Solve. Learn. All in One Place.",
  description:
    "Instant games, powerful online tools, and helpful AI tips & guides — everything you need, in one place.",
  url: "https://sinthia.top",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/games" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
