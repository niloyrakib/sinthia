import type { SearchSuggestion } from "@/types/navigation";

export const MOCK_SEARCH_INDEX: SearchSuggestion[] = [
  { id: "g1", title: "Pixel Runner", type: "game", href: "/games/pixel-runner" },
  { id: "g2", title: "Galaxy Shooter", type: "game", href: "/games/galaxy-shooter" },
  { id: "g3", title: "2048 Classic", type: "game", href: "/games/2048-classic" },
  { id: "g4", title: "Car Racing Pro", type: "game", href: "/games/car-racing-pro" },
  { id: "g5", title: "Basketball Stars", type: "game", href: "/games/basketball-stars" },
  { id: "t1", title: "Image Compressor", type: "tool", href: "/tools/image-compressor" },
  { id: "t2", title: "PDF Merger", type: "tool", href: "/tools/pdf-merger" },
  { id: "t3", title: "Word Counter", type: "tool", href: "/tools/word-counter" },
  {
    id: "b1",
    title: "10 Free AI Tools That Will Save You 10 Hours a Week",
    type: "blog",
    href: "/blog/free-ai-tools-save-time",
  },
  {
    id: "b2",
    title: "How to Start a Profitable Blog in 2026 (Step-by-Step)",
    type: "blog",
    href: "/blog/start-profitable-blog-2026",
  },
  { id: "c1", title: "Instant Games", type: "category", href: "/games" },
  { id: "c2", title: "Online Tools", type: "category", href: "/tools" },
];
