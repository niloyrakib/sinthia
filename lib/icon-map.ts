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

interface AccentClasses {
  bg: string;
  text: string;
  solid: string;
}

const ACCENT_CLASSES_BY_KEY = {
  primary: { bg: "bg-primary-50", text: "text-primary-600", solid: "bg-primary" },
  secondary: {
    bg: "bg-secondary-50",
    text: "text-secondary-600",
    solid: "bg-secondary",
  },
  success: { bg: "bg-emerald-50", text: "text-success", solid: "bg-success" },
  warning: { bg: "bg-amber-50", text: "text-warning", solid: "bg-warning" },
  danger: { bg: "bg-red-50", text: "text-danger", solid: "bg-danger" },
} satisfies Record<string, AccentClasses>;

export const ACCENT_CLASSES: Record<string, AccentClasses> = ACCENT_CLASSES_BY_KEY;

export function getAccentClasses(accent: string): AccentClasses {
  return (
    ACCENT_CLASSES_BY_KEY[accent as keyof typeof ACCENT_CLASSES_BY_KEY] ??
    ACCENT_CLASSES_BY_KEY.primary
  );
}
