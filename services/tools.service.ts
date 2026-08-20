import { wpClient, readPaginationMeta } from "@/lib/wp/client";
import { WP_ENDPOINTS } from "@/lib/wp/config";
import { mapWpTool } from "@/lib/wp/mappers";
import { withWpFallback } from "@/lib/wp/with-fallback";
import { MOCK_TOOLS } from "@/constants/mock-tools";
import type { Tool } from "@/types/content";
import type { PaginatedResult } from "@/types/api";
import type { WpTool } from "@/lib/wp/types";

export interface ToolsQueryParams {
  page?: number;
  perPage?: number;
  category?: string | null;
  search?: string;
  favoriteIds?: string[];
}

async function fetchToolsFromWp(
  params: ToolsQueryParams,
): Promise<PaginatedResult<Tool>> {
  const { page = 1, perPage = 12, category, search } = params;

  const response = await wpClient.get<WpTool[]>(WP_ENDPOINTS.tools, {
    params: {
      page,
      per_page: perPage,
      search: search || undefined,
      tool_category: category || undefined,
      _embed: 1,
    },
  });

  const { total, totalPages } = readPaginationMeta(response);

  let items = response.data.map(mapWpTool);
  if (params.favoriteIds) {
    items = items.filter((t) => params.favoriteIds!.includes(t.id));
  }

  return { items, page, perPage, totalItems: total, totalPages };
}

async function fetchToolsFromMock(
  params: ToolsQueryParams,
): Promise<PaginatedResult<Tool>> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { page = 1, perPage = 12, category, search, favoriteIds } = params;

  let items = [...MOCK_TOOLS];
  if (category) items = items.filter((t) => t.categorySlug === category);
  if (favoriteIds) items = items.filter((t) => favoriteIds.includes(t.id));
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q),
    );
  }

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

export function getTools(params: ToolsQueryParams = {}): Promise<PaginatedResult<Tool>> {
  return withWpFallback(
    "getTools",
    () => fetchToolsFromWp(params),
    () => fetchToolsFromMock(params),
  );
}

async function fetchToolBySlugFromWp(slug: string): Promise<Tool | null> {
  const response = await wpClient.get<WpTool[]>(WP_ENDPOINTS.tools, {
    params: { slug, _embed: 1 },
  });
  const tool = response.data[0];
  return tool ? mapWpTool(tool) : null;
}

async function fetchToolBySlugFromMock(slug: string): Promise<Tool | null> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return MOCK_TOOLS.find((t) => t.slug === slug) ?? null;
}

export function getToolBySlug(slug: string): Promise<Tool | null> {
  return withWpFallback(
    "getToolBySlug",
    () => fetchToolBySlugFromWp(slug),
    () => fetchToolBySlugFromMock(slug),
  );
}

export async function getAllToolSlugs(): Promise<string[]> {
  const { items } = await getTools({ perPage: 100 });
  return items.map((t) => t.slug);
}
