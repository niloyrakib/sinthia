export type ThemeColor =
  | "background"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "border"
  | "text"
  | "textMuted";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
