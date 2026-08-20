import {
  Bot,
  Braces,
  Brain,
  Car,
  FileText,
  Gamepad2,
  Globe,
  Heart,
  Image as ImageIcon,
  Palette,
  Puzzle,
  QrCode,
  Swords,
  Trophy,
  Type,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { AccentColor } from "@/types/content";

export const ICON_MAP: Record<string, LucideIcon> = {
  gamepad: Gamepad2,
  wrench: Wrench,
  bot: Bot,
  globe: Globe,
  wallet: Wallet,
  image: ImageIcon,
  "file-text": FileText,
  type: Type,
  "qr-code": QrCode,
  palette: Palette,
  braces: Braces,
  swords: Swords,
  puzzle: Puzzle,
  car: Car,
  trophy: Trophy,
  brain: Brain,
  heart: Heart,
};

export interface AccentClasses {
  bg: string;
  text: string;
  solid: string;
}

/**
 * Keyed by the AccentColor literal union, not `string`. This makes the
 * type a complete mapped type (every AccentColor member is a required
 * property) rather than an index signature, so `ACCENT_CLASSES[accent]`
 * is always `AccentClasses` — never `AccentClasses | undefined`, even
 * with `noUncheckedIndexedAccess` on — as long as `accent` is typed as
 * `AccentColor`. Do not widen this back to `Record<string, ...>`.
 */
export const ACCENT_CLASSES: Record<AccentColor, AccentClasses> = {
  primary: { bg: "bg-primary-50", text: "text-primary-600", solid: "bg-primary" },
  secondary: {
    bg: "bg-secondary-50",
    text: "text-secondary-600",
    solid: "bg-secondary",
  },
  success: { bg: "bg-emerald-50", text: "text-success", solid: "bg-success" },
  warning: { bg: "bg-amber-50", text: "text-warning", solid: "bg-warning" },
  danger: { bg: "bg-red-50", text: "text-danger", solid: "bg-danger" },
};

const DEFAULT_ICON: LucideIcon = Wrench;

/**
 * `icon` strings come from WP content (see types/content.ts), so unlike
 * accent they're genuine freeform strings, not a literal union — a
 * typo'd or unmapped icon key is possible at runtime. Always read
 * through this helper instead of indexing ICON_MAP directly, so a
 * missing key degrades to a default icon instead of `undefined`
 * crashing the component tree.
 */
export function getIcon(icon: string): LucideIcon {
  return ICON_MAP[icon] ?? DEFAULT_ICON;
}
