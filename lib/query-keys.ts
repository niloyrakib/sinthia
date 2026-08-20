export const queryKeys = {
  games: {
    all: ["games"] as const,
    list: (params: Record<string, unknown>) => ["games", "list", params] as const,
    detail: (slug: string) => ["games", "detail", slug] as const,
  },
  tools: {
    all: ["tools"] as const,
    list: (params: Record<string, unknown>) => ["tools", "list", params] as const,
    detail: (slug: string) => ["tools", "detail", slug] as const,
  },
  posts: {
    all: ["posts"] as const,
    list: (params: Record<string, unknown>) => ["posts", "list", params] as const,
    detail: (slug: string) => ["posts", "detail", slug] as const,
  },
} as const;
