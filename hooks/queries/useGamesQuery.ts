"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getGames, type GamesQueryParams } from "@/services/games.service";
import { queryKeys } from "@/lib/query-keys";

export function useGamesQuery(params: Omit<GamesQueryParams, "page">) {
  return useInfiniteQuery({
    queryKey: queryKeys.games.list(params),
    queryFn: ({ pageParam }) => getGames({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
}
