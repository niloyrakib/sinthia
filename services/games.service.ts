import { wpClient, readPaginationMeta } from "@/lib/wp/client";
import { WP_ENDPOINTS } from "@/lib/wp/config";
import { mapWpGame } from "@/lib/wp/mappers";
import { withWpFallback } from "@/lib/wp/with-fallback";
import { MOCK_GAMES } from "@/constants/mock-games";
import type { Game } from "@/types/content";
import type { PaginatedResult } from "@/types/api";
import type { WpGame } from "@/lib/wp/types";

export interface GamesQueryParams {
  page?: number;
  perPage?: number;
  category?: string | null;
  search?: string;
  sort?: "popular" | "newest" | "top-rated";
}

async function fetchGamesFromWp(
  params: GamesQueryParams,
): Promise<PaginatedResult<Game>> {
  const { page = 1, perPage = 12, category, search, sort = "popular" } = params;

  const orderby =
    sort === "newest"
      ? "date"
      : sort === "top-rated"
        ? "meta_value_num"
        : "meta_value_num";

  const response = await wpClient.get<WpGame[]>(WP_ENDPOINTS.games, {
    params: {
      page,
      per_page: perPage,
      search: search || undefined,
      game_category: category || undefined,
      orderby,
      order: "desc",
    },
  });

  const { total, totalPages } = readPaginationMeta(response);

  return {
    items: response.data.map(mapWpGame),
    page,
    perPage,
    totalItems: total,
    totalPages,
  };
}

async function fetchGamesFromMock(
  params: GamesQueryParams,
): Promise<PaginatedResult<Game>> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const { page = 1, perPage = 12, category, search, sort = "popular" } = params;

  let items = [...MOCK_GAMES];
  if (category) items = items.filter((g) => g.categorySlug === category);
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }
  if (sort === "popular") items.sort((a, b) => b.plays - a.plays);
  if (sort === "top-rated") items.sort((a, b) => b.rating - a.rating);
  if (sort === "newest") items.sort((a, b) => Number(b.isNew) - Number(a.isNew));

  const totalItems = items.length;
  const start = (page - 1) * perPage;
  const pageItems = items.slice(start, start + perPage);

  return {
    items: pageItems,
    page,
    perPage,
    totalItems,
    totalPages: Math.max(1, Math.ceil(totalItems / perPage)),
  };
}

export function getGames(params: GamesQueryParams = {}): Promise<PaginatedResult<Game>> {
  return withWpFallback(
    "getGames",
    () => fetchGamesFromWp(params),
    () => fetchGamesFromMock(params),
  );
}

async function fetchGameBySlugFromWp(slug: string): Promise<Game | null> {
  const response = await wpClient.get<WpGame[]>(WP_ENDPOINTS.games, { params: { slug } });
  const game = response.data[0];
  return game ? mapWpGame(game) : null;
}

async function fetchGameBySlugFromMock(slug: string): Promise<Game | null> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return MOCK_GAMES.find((g) => g.slug === slug) ?? null;
}

export function getGameBySlug(slug: string): Promise<Game | null> {
  return withWpFallback(
    "getGameBySlug",
    () => fetchGameBySlugFromWp(slug),
    () => fetchGameBySlugFromMock(slug),
  );
}

export async function getAllGameSlugs(): Promise<string[]> {
  const { items } = await getGames({ perPage: 100 });
  return items.map((g) => g.slug);
}
