export interface Stat {
  key: string;
  value: number;
  suffix: string;
  label: string;
  icon: "gamepad" | "wrench" | "file-text" | "users";
}

export const HOME_STATS: Stat[] = [
  { key: "games", value: 150, suffix: "+", label: "Instant Games", icon: "gamepad" },
  { key: "tools", value: 120, suffix: "+", label: "Online Tools", icon: "wrench" },
  { key: "posts", value: 500, suffix: "+", label: "Blog Posts", icon: "file-text" },
  { key: "users", value: 10, suffix: "K+", label: "Happy Users", icon: "users" },
];
