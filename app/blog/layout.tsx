import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — AI Tools, Web Resources & Making Money Online",
  description: "AI tips, tool guides, and honest ways to make money online — no fluff.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — AI Tools, Web Resources & Making Money Online",
    description: "AI tips, tool guides, and honest ways to make money online.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
