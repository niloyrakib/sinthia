import type { AccentColor } from "@/types/content";

export interface ToolCategory {
  slug: string;
  label: string;
  icon: string;
  accent: AccentColor;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  { slug: "image", label: "Image", icon: "image", accent: "primary" },
  { slug: "document", label: "Document", icon: "file-text", accent: "danger" },
  { slug: "text", label: "Text", icon: "type", accent: "success" },
  { slug: "utility", label: "Utility", icon: "qr-code", accent: "secondary" },
  { slug: "design", label: "Design", icon: "palette", accent: "warning" },
  { slug: "developer", label: "Developer", icon: "braces", accent: "primary" },
];
