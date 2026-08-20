"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GameCard } from "@/components/shared/GameCard";
import { ToolCard } from "@/components/shared/ToolCard";
import { BlogCard } from "@/components/shared/BlogCard";
import { MOCK_GAMES } from "@/constants/mock-games";
import { MOCK_TOOLS } from "@/constants/mock-tools";
import { MOCK_POSTS } from "@/constants/mock-blog";

type Tab = "games" | "tools" | "articles";

const TABS: { key: Tab; label: string }[] = [
  { key: "games", label: "Games" },
  { key: "tools", label: "Tools" },
  { key: "articles", label: "Articles" },
];

const trendingGames = MOCK_GAMES.filter((g) => g.isTrending);
const trendingTools = MOCK_TOOLS.filter((t) => t.isTrending);
const trendingPosts = MOCK_POSTS.filter((p) => p.isTrending);

export function Trending() {
  const [tab, setTab] = React.useState<Tab>("games");

  return (
    <section className="bg-primary-50/30 py-10 sm:py-14">
      <div className="container-page">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <SectionHeader title="Trending Now" />
          <div
            role="tablist"
            aria-label="Trending content type"
            className="-mt-6 flex gap-1 rounded-full border border-border bg-white p-1"
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  tab === t.key
                    ? "bg-primary-600 text-white"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "games" && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {trendingGames.map((g) => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
            )}
            {tab === "tools" && (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {trendingTools.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            )}
            {tab === "articles" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {trendingPosts.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
