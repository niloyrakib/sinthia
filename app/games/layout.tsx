import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instant Games — Play Free Online",
  description:
    "150+ free browser games across action, arcade, puzzle, racing, sports, and strategy. No download, no signup.",
  alternates: { canonical: "/games" },
  openGraph: {
    title: "Instant Games — Play Free Online",
    description:
      "150+ free browser games across action, arcade, puzzle, racing, sports, and strategy.",
  },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
