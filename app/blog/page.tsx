"use client";

import * as React from "react";
import { usePostsQuery } from "@/hooks/queries";
import { useDebounce } from "@/hooks/useDebounce";
import { BlogFilters, BlogGrid, FeaturedPost } from "@/features/blog/components";
import { GridSkeleton, ErrorState, LoadMoreButton } from "@/components/shared";

export default function BlogPage() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);
  const isFiltering = Boolean(debouncedSearch || category);

  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePostsQuery({ category, search: debouncedSearch, perPage: 6 });

  const allPosts = data?.pages.flatMap((p) => p.items) ?? [];
  const featured = !isFiltering
    ? (allPosts.find((p) => p.isFeatured) ?? allPosts[0])
    : undefined;
  const posts = featured ? allPosts.filter((p) => p.id !== featured.id) : allPosts;
  const totalItems = data?.pages[0]?.totalItems ?? 0;

  return (
    <main className="container-page py-8 sm:py-12">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Blog
        </h1>
        <p className="mt-2 text-ink-muted">
          AI tips, tool guides, and honest ways to make money online.
        </p>
      </div>

      {isPending && (
        <div className="mb-10">
          <div className="skeleton h-64 w-full rounded-card-lg" />
        </div>
      )}

      {!isPending && !isError && featured && (
        <div className="mb-10">
          <FeaturedPost post={featured} />
        </div>
      )}

      <BlogFilters
        search={search}
        onSearchChange={setSearch}
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      {!isPending && !isError && (
        <p className="mb-4 text-sm text-ink-muted">
          {totalItems} article{totalItems === 1 ? "" : "s"}
        </p>
      )}

      {isPending && (
        <GridSkeleton
          count={6}
          columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          aspect="aspect-[16/9]"
        />
      )}

      {isError && <ErrorState onRetry={() => refetch()} />}

      {!isPending && !isError && (
        <>
          <BlogGrid posts={posts} />
          <LoadMoreButton
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            hasMore={Boolean(hasNextPage)}
            loadedCount={allPosts.length}
            totalCount={totalItems}
          />
        </>
      )}
    </main>
  );
}
