"use client";

import * as React from "react";
import { useGamesQuery } from "@/hooks/queries";
import { useDebounce } from "@/hooks/useDebounce";
import { GameFilters, type GameSort } from "@/features/games/components/GameFilters";
import { GamesGrid } from "@/features/games/components/GamesGrid";
import { GridSkeleton, ErrorState, LoadMoreButton } from "@/components/shared";

export default function GamesPage() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);
  const [sort, setSort] = React.useState<GameSort>("popular");
  const debouncedSearch = useDebounce(search, 300);

  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGamesQuery({ category, search: debouncedSearch, sort, perPage: 8 });

  const games = data?.pages.flatMap((p) => p.items) ?? [];
  const totalItems = data?.pages[0]?.totalItems ?? 0;

  return (
    <main className="container-page py-8 sm:py-12">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Instant Games
        </h1>
        <p className="mt-2 text-ink-muted">
          Free browser games — no download, no signup, just click and play.
        </p>
      </div>

      <GameFilters
        search={search}
        onSearchChange={setSearch}
        activeCategory={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
      />

      {!isPending && !isError && (
        <p className="mb-4 text-sm text-ink-muted">
          {totalItems} game{totalItems === 1 ? "" : "s"}
        </p>
      )}

      {isPending && (
        <GridSkeleton count={8} columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" />
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isPending && !isError && (
        <>
          <GamesGrid games={games} />
          <LoadMoreButton
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            hasMore={Boolean(hasNextPage)}
            loadedCount={games.length}
            totalCount={totalItems}
          />
        </>
      )}
    </main>
  );
}
