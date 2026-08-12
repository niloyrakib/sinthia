"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts, type PostsQueryParams } from "@/services/blog.service";
import { queryKeys } from "@/lib/query-keys";

export function usePostsQuery(params: Omit<PostsQueryParams, "page">) {
  return useInfiniteQuery({
    queryKey: queryKeys.posts.list(params),
    queryFn: ({ pageParam }) => getPosts({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
}
