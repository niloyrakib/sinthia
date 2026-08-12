"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Gamepad2, Wrench, FileText, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { searchSuggestions } from "@/services/search.service";
import type { SearchSuggestion } from "@/types/navigation";

const TYPE_ICON: Record<SearchSuggestion["type"], React.ElementType> = {
  game: Gamepad2,
  tool: Wrench,
  blog: FileText,
  category: Tag,
};

export function HeroSearch() {
  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [results, setResults] = React.useState<SearchSuggestion[]>([]);
  const debouncedQuery = useDebounce(query, 250);
  const { add: addRecent } = useRecentSearches();

  React.useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    let cancelled = false;
    searchSuggestions(debouncedQuery).then((res) => {
      if (!cancelled) setResults(res);
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  React.useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setFocused(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function submit(term: string) {
    if (!term.trim()) return;
    addRecent(term);
    setFocused(false);
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  }

  const showDropdown = focused && query.length > 0 && results.length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
        className="flex items-center gap-2 rounded-card-lg border border-border bg-white p-1.5 shadow-soft transition-shadow duration-200 focus-within:shadow-soft-lg focus-within:ring-2 focus-within:ring-primary-200"
      >
        <Search className="ml-2.5 size-5 shrink-0 text-ink-muted" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          type="search"
          placeholder="Search games, tools, blog posts..."
          aria-label="Search games, tools, and blog posts"
          className="h-11 w-full min-w-0 border-0 bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-0"
        />
        <Button type="submit" variant="primary" size="md" className="shrink-0">
          <Search className="size-4 sm:hidden" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-card-lg border border-border bg-white p-2 shadow-soft-xl"
          >
            {results.map((item) => {
              const Icon = TYPE_ICON[item.type];
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => submit(item.title)}
                  className="flex items-center gap-3 rounded-card px-3 py-2.5 text-left text-sm text-ink hover:bg-primary-50"
                >
                  <Icon className="size-4 text-primary-600" />
                  <span className="flex-1 truncate">{item.title}</span>
                  <span className="text-xs capitalize text-ink-muted">{item.type}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
