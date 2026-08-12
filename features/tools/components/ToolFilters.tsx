"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICON_MAP } from "@/lib/icon-map";
import { TOOL_CATEGORIES } from "@/constants/tool-categories";

export function ToolFilters({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          type="search"
          placeholder="Search tools..."
          aria-label="Search tools"
          className="h-11 w-full rounded-card border border-border bg-white pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onCategoryChange(null)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            activeCategory === null
              ? "border-primary-600 bg-primary-600 text-white"
              : "border-border bg-white text-ink-muted hover:border-primary-200 hover:text-primary-700",
          )}
        >
          All Tools
        </button>
        {TOOL_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon];
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onCategoryChange(cat.slug)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-border bg-white text-ink-muted hover:border-primary-200 hover:text-primary-700",
              )}
            >
              {Icon && <Icon className="size-3.5" />}
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
