import type { AccentColor } from "@/types/content";

export interface GameCategory {
  slug: string;
  label: string;
  icon: string;
  accent: AccentColor;
}

export const GAME_CATEGORIES: GameCategory[] = [
  { slug: "action", label: "Action", icon: "swords", accent: "danger" },
  { slug: "arcade", label: "Arcade", icon: "gamepad", accent: "secondary" },
  { slug: "puzzle", label: "Puzzle", icon: "puzzle", accent: "warning" },
  { slug: "racing", label: "Racing", icon: "car", accent: "primary" },
  { slug: "sports", label: "Sports", icon: "trophy", accent: "success" },
  { slug: "strategy", label: "Strategy", icon: "brain", accent: "secondary" },
];
