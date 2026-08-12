"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, Gamepad2, Wrench, FileText, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { searchSuggestions } from "@/services/search.service";
import type { SearchSuggestion } from "@/types/navigation";

type Filter = "all" | "game" | "tool" | "blog";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "game", label: "Games" },
  { key: "tool", label: "Tools" },
  { key: "blog", label: "Blog" },
];

const TYPE_ICON: Record<SearchSuggestion["type"], React.ElementType> = {
  game: Gamepad2,
  tool: Wrench,
  blog: FileText,
  category: Tag,
};

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<Filter>("all");
  const [results, setResults] = React.useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = React.useState(false);
  const debouncedQuery = useDebounce(query, 250);
  const { items: recent, add: addRecent, clear: clearRecent } = useRecentSearches();

  useLockBodyScroll(open);
  useFocusTrap(panelRef, open);

  React.useEffect(() => {
    if (open) {
      // Focus after the enter transition starts so iOS doesn't jump-scroll.
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
    setQuery("");
    setResults([]);
  }, [open]);

  React.useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    searchSuggestions(debouncedQuery).then((res) => {
      if (!cancelled) {
        setResults(res);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const filtered = filter === "all" ? results : results.filter((r) => r.type === filter);

  function submitSearch(term: string) {
    if (!term.trim()) return;
    addRecent(term);
    onClose();
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 backdrop-blur-sm sm:pt-[12vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            ref={panelRef}
            className="flex size-full max-w-2xl flex-col overflow-hidden bg-white shadow-soft-xl sm:h-auto sm:max-h-[75vh] sm:rounded-card-lg"
          >
            <div className="flex items-center gap-3 border-b border-border p-4">
              <Search className="size-5 shrink-0 text-ink-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch(query)}
                type="search"
                placeholder="Search games, tools, blog posts..."
                className="w-full border-0 bg-transparent text-base text-ink placeholder:text-ink-muted focus:outline-none focus:ring-0"
                aria-label="Search"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="rounded-card p-1.5 text-ink-muted transition-colors hover:bg-primary-50 hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex gap-2 border-b border-border px-4 py-2.5">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    filter === f.key
                      ? "bg-primary-600 text-white"
                      : "bg-primary-50 text-ink-muted hover:text-primary-700",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {!query && recent.length > 0 && (
                <div className="p-2">
                  <div className="mb-1 flex items-center justify-between px-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      Recent searches
                    </span>
                    <button
                      type="button"
                      onClick={clearRecent}
                      className="text-xs font-medium text-primary-600 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                  {recent.map((r) => (
                    <button
                      key={r.timestamp}
                      type="button"
                      onClick={() => setQuery(r.term)}
                      className="flex w-full items-center gap-3 rounded-card px-3 py-2.5 text-left text-sm text-ink hover:bg-primary-50"
                    >
                      <Clock className="size-4 text-ink-muted" />
                      {r.term}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="space-y-2 p-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="skeleton h-12 w-full" />
                  ))}
                </div>
              )}

              {!loading && query && filtered.length === 0 && (
                <p className="p-6 text-center text-sm text-ink-muted">
                  No results for &ldquo;{query}&rdquo;. Try a different term.
                </p>
              )}

              {!loading &&
                filtered.map((item) => {
                  const Icon = TYPE_ICON[item.type];
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => submitSearch(item.title)}
                      className="flex items-center gap-3 rounded-card px-3 py-2.5 text-sm text-ink hover:bg-primary-50"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-card bg-primary-50">
                        <Icon className="size-4 text-primary-600" />
                      </span>
                      <span className="flex-1 truncate">{item.title}</span>
                      <span className="text-xs capitalize text-ink-muted">
                        {item.type}
                      </span>
                    </Link>
                  );
                })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
