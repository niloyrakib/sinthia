import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Tools — Free Browser Utilities",
  description:
    "120+ free tools for images, documents, text, design, and developers — most run entirely in your browser.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Online Tools — Free Browser Utilities",
    description: "120+ free tools for images, documents, text, design, and developers.",
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
