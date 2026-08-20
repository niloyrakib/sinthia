"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { useDebounce } from "@/hooks/useDebounce";
import { useToolsQuery } from "@/hooks/queries";
import { ToolFilters, ToolsGrid, RecentlyUsedTools } from "@/features/tools/components";
import { GridSkeleton, ErrorState, LoadMoreButton } from "@/components/shared";

export default function ToolsPage() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);
  const [favoritesOnly, setFavoritesOnly] = React.useState(false);
  const debouncedSearch = useDebounce(search, 300);
  const { isFavorite, hydrated } = useFavorites("tools");

  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useToolsQuery({ category, search: debouncedSearch, perPage: 9 });

  const allTools = data?.pages.flatMap((p) => p.items) ?? [];
  const tools =
    favoritesOnly && hydrated ? allTools.filter((t) => isFavorite(t.id)) : allTools;
  const totalItems = data?.pages[0]?.totalItems ?? 0;

  return (
    <main className="container-page py-8 sm:py-12">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Online Tools
        </h1>
        <p className="mt-2 text-ink-muted">
          Free tools that run entirely in your browser — no account required for most of
          them.
        </p>
      </div>

      <RecentlyUsedTools />

      <div className="mb-1 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <ToolFilters
            search={search}
            onSearchChange={setSearch}
            activeCategory={category}
            onCategoryChange={setCategory}
          />
        </div>
        <button
          type="button"
          onClick={() => setFavoritesOnly((v) => !v)}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            favoritesOnly
              ? "border-danger bg-red-50 text-danger"
              : "border-border bg-white text-ink-muted hover:border-primary-200 hover:text-primary-700",
          )}
        >
          <Heart className={cn("size-3.5", favoritesOnly && "fill-danger")} />
          Favorites
        </button>
      </div>

      {!isPending && !isError && (
        <p className="mb-4 text-sm text-ink-muted">
          {tools.length} tool{tools.length === 1 ? "" : "s"}
        </p>
      )}

      {isPending && (
        <GridSkeleton
          count={9}
          columns="grid-cols-2 lg:grid-cols-3"
          aspect="aspect-[3/2]"
        />
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isPending && !isError && (
        <>
          <ToolsGrid tools={tools} />
          {!favoritesOnly && (
            <LoadMoreButton
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
              hasMore={Boolean(hasNextPage)}
              loadedCount={allTools.length}
              totalCount={totalItems}
            />
          )}
        </>
      )}
    </main>
  );
}
