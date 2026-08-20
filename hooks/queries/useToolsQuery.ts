"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getTools, type ToolsQueryParams } from "@/services/tools.service";
import { queryKeys } from "@/lib/query-keys";

export function useToolsQuery(params: Omit<ToolsQueryParams, "page">) {
  return useInfiniteQuery({
    queryKey: queryKeys.tools.list(params),
    queryFn: ({ pageParam }) => getTools({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
}
