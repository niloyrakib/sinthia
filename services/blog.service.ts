import { wpClient, readPaginationMeta } from "@/lib/wp/client";
import { WP_ENDPOINTS } from "@/lib/wp/config";
import { mapWpPost, mapWpAuthor } from "@/lib/wp/mappers";
import { withWpFallback } from "@/lib/wp/with-fallback";
import { MOCK_POSTS } from "@/constants/mock-blog";
import { MOCK_AUTHORS, type Author } from "@/constants/mock-authors";
import type { BlogPost } from "@/types/content";
import type { PaginatedResult } from "@/types/api";
import type { WpPost } from "@/lib/wp/types";

export interface PostsQueryParams {
  page?: number;
  perPage?: number;
  category?: string | null;
  authorSlug?: string;
  search?: string;
}

async function fetchPostsFromWp(
  params: PostsQueryParams,
): Promise<PaginatedResult<BlogPost>> {
  const { page = 1, perPage = 9, category, authorSlug, search } = params;

  const response = await wpClient.get<WpPost[]>(WP_ENDPOINTS.posts, {
    params: {
      page,
      per_page: perPage,
      search: search || undefined,
      categories: category || undefined,
      _embed: 1,
    },
  });

  const { total, totalPages } = readPaginationMeta(response);

  let items = response.data.map(mapWpPost);
  if (authorSlug) items = items.filter((p) => p.authorSlug === authorSlug);

  return {
    items,
    page,
    perPage,
    totalItems: authorSlug ? items.length : total,
    totalPages: authorSlug ? 1 : totalPages,
  };
}

async function fetchPostsFromMock(
  params: PostsQueryParams,
): Promise<PaginatedResult<BlogPost>> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { page = 1, perPage = 9, category, authorSlug, search } = params;

  let items = [...MOCK_POSTS];
  if (category) items = items.filter((p) => p.categorySlug === category);
  if (authorSlug) items = items.filter((p) => p.authorSlug === authorSlug);
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q),
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

export function getPosts(
  params: PostsQueryParams = {},
): Promise<PaginatedResult<BlogPost>> {
  return withWpFallback(
    "getPosts",
    () => fetchPostsFromWp(params),
    () => fetchPostsFromMock(params),
  );
}

async function fetchPostBySlugFromWp(slug: string): Promise<BlogPost | null> {
  const response = await wpClient.get<WpPost[]>(WP_ENDPOINTS.posts, {
    params: { slug, _embed: 1 },
  });
  const post = response.data[0];
  return post ? mapWpPost(post) : null;
}

async function fetchPostBySlugFromMock(slug: string): Promise<BlogPost | null> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
}

export function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return withWpFallback(
    "getPostBySlug",
    () => fetchPostBySlugFromWp(slug),
    () => fetchPostBySlugFromMock(slug),
  );
}

export async function getAllPostSlugs(): Promise<string[]> {
  const { items } = await getPosts({ perPage: 100 });
  return items.map((p) => p.slug);
}

async function fetchAuthorFromWp(slug: string): Promise<Author | null> {
  const response = await wpClient.get<
    { id: number; name: string; slug: string; description?: string }[]
  >(WP_ENDPOINTS.users, { params: { slug } });
  const author = response.data[0];
  return author ? mapWpAuthor(author) : null;
}

async function fetchAuthorFromMock(slug: string): Promise<Author | null> {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return MOCK_AUTHORS.find((a) => a.slug === slug) ?? null;
}

export function getAuthorBySlug(slug: string): Promise<Author | null> {
  return withWpFallback(
    "getAuthorBySlug",
    () => fetchAuthorFromWp(slug),
    () => fetchAuthorFromMock(slug),
  );
}

async function fetchAllAuthorSlugsFromWp(): Promise<string[]> {
  const response = await wpClient.get<{ slug: string }[]>(WP_ENDPOINTS.users, {
    params: { per_page: 100 },
  });
  return response.data.map((a) => a.slug);
}

async function fetchAllAuthorSlugsFromMock(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_AUTHORS.map((a) => a.slug);
}

export function getAllAuthorSlugs(): Promise<string[]> {
  return withWpFallback(
    "getAllAuthorSlugs",
    fetchAllAuthorSlugsFromWp,
    fetchAllAuthorSlugsFromMock,
  );
}
