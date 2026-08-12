import { wpClient } from "@/lib/wp/client";
import { WP_CONFIG } from "@/lib/wp/config";
import { withWpFallback } from "@/lib/wp/with-fallback";
import { MOCK_SEARCH_INDEX } from "@/constants/mock-search-data";
import type { SearchSuggestion } from "@/types/navigation";

async function searchFromWp(query: string): Promise<SearchSuggestion[]> {
  const response = await wpClient.get<SearchSuggestion[]>(
    `/${WP_CONFIG.customNamespace}/search`,
    { params: { q: query, limit: 8 } },
  );
  return response.data;
}

async function searchFromMock(query: string): Promise<SearchSuggestion[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const q = query.toLowerCase();
  return MOCK_SEARCH_INDEX.filter((item) => item.title.toLowerCase().includes(q)).slice(
    0,
    8,
  );
}

/**
 * Returns matching suggestions for `query`. Real implementation hits a
 * custom "/sinthia/v1/search" WP endpoint (a single aggregated query across
 * games/tools/posts is far cheaper than three separate REST calls); falls
 * back to the in-memory mock index otherwise.
 */
export async function searchSuggestions(query: string): Promise<SearchSuggestion[]> {
  const q = query.trim();
  if (!q) return [];

  return withWpFallback(
    "searchSuggestions",
    () => searchFromWp(q),
    () => searchFromMock(q),
  );
}
