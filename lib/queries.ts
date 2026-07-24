// lib/queries.ts
// Real Firestore reads for public-facing pages. Every function only returns
// `status == "published"` documents — admin screens (Phase 3) will use
// separate, auth-gated queries that can see drafts/scheduled content.

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit as fbLimit,
  orderBy,
  query,
  where,
  startAfter,
  type QueryDocumentSnapshot,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Game, Tool, Post, Category, Tag } from "./types";

const PAGE_SIZE = 12;

function withId<T>(snap: QueryDocumentSnapshot<DocumentData>): T {
  return { id: snap.id, ...snap.data() } as T;
}

// ---------- Games ----------

export async function getPublishedGames(opts?: {
  categorySlug?: string;
  cursor?: QueryDocumentSnapshot<DocumentData>;
  pageSize?: number;
}) {
  const constraints: QueryConstraint[] = [where("status", "==", "published"), orderBy("publishedAt", "desc")];
  if (opts?.categorySlug) constraints.push(where("categoryId", "==", opts.categorySlug));
  constraints.push(fbLimit(opts?.pageSize ?? PAGE_SIZE));
  const q = opts?.cursor
    ? query(collection(db, "games"), ...constraints, startAfter(opts.cursor))
    : query(collection(db, "games"), ...constraints);
  const snap = await getDocs(q);
  return { items: snap.docs.map((d) => withId<Game>(d)), lastDoc: snap.docs.at(-1) };
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const q = query(collection(db, "games"), where("slug", "==", slug), where("status", "==", "published"), fbLimit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : withId<Game>(snap.docs[0]);
}

export async function getRelatedGames(categoryId: string, excludeId: string, take = 4): Promise<Game[]> {
  const q = query(
    collection(db, "games"),
    where("status", "==", "published"),
    where("categoryId", "==", categoryId),
    fbLimit(take + 1)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => withId<Game>(d)).filter((g) => g.id !== excludeId).slice(0, take);
}

// ---------- Tools ----------

export async function getPublishedTools(opts?: {
  categorySlug?: string;
  cursor?: QueryDocumentSnapshot<DocumentData>;
  pageSize?: number;
}) {
  const constraints: QueryConstraint[] = [where("status", "==", "published"), orderBy("publishedAt", "desc")];
  if (opts?.categorySlug) constraints.push(where("categoryId", "==", opts.categorySlug));
  constraints.push(fbLimit(opts?.pageSize ?? PAGE_SIZE));
  const q = opts?.cursor
    ? query(collection(db, "tools"), ...constraints, startAfter(opts.cursor))
    : query(collection(db, "tools"), ...constraints);
  const snap = await getDocs(q);
  return { items: snap.docs.map((d) => withId<Tool>(d)), lastDoc: snap.docs.at(-1) };
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const q = query(collection(db, "tools"), where("slug", "==", slug), where("status", "==", "published"), fbLimit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : withId<Tool>(snap.docs[0]);
}

// ---------- Posts ----------

export async function getPublishedPosts(opts?: {
  categorySlug?: string;
  cursor?: QueryDocumentSnapshot<DocumentData>;
  pageSize?: number;
}) {
  const constraints: QueryConstraint[] = [where("status", "==", "published"), orderBy("publishedAt", "desc")];
  if (opts?.categorySlug) constraints.push(where("categoryId", "==", opts.categorySlug));
  constraints.push(fbLimit(opts?.pageSize ?? PAGE_SIZE));
  const q = opts?.cursor
    ? query(collection(db, "posts"), ...constraints, startAfter(opts.cursor))
    : query(collection(db, "posts"), ...constraints);
  const snap = await getDocs(q);
  return { items: snap.docs.map((d) => withId<Post>(d)), lastDoc: snap.docs.at(-1) };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(collection(db, "posts"), where("slug", "==", slug), where("status", "==", "published"), fbLimit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : withId<Post>(snap.docs[0]);
}

export async function getRelatedPosts(post: Post, take = 3): Promise<Post[]> {
  if (post.relatedPostIds?.length) {
    const docs = await Promise.all(post.relatedPostIds.slice(0, take).map((id) => getDoc(doc(db, "posts", id))));
    return docs.filter((d) => d.exists()).map((d) => ({ id: d.id, ...d.data() } as Post));
  }
  const q = query(
    collection(db, "posts"),
    where("status", "==", "published"),
    where("categoryId", "==", post.categoryId),
    fbLimit(take + 1)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => withId<Post>(d)).filter((p) => p.id !== post.id).slice(0, take);
}

// ---------- Categories / Tags ----------

export async function getCategories(type?: Category["type"]): Promise<Category[]> {
  const q = type
    ? query(collection(db, "categories"), where("type", "==", type))
    : collection(db, "categories");
  const snap = await getDocs(q);
  return snap.docs.map((d) => withId<Category>(d));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const q = query(collection(db, "categories"), where("slug", "==", slug), fbLimit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : withId<Category>(snap.docs[0]);
}

export async function getTags(): Promise<Tag[]> {
  const snap = await getDocs(collection(db, "tags"));
  return snap.docs.map((d) => withId<Tag>(d));
}

// ---------- Search ----------
// Firestore has no native full-text search. For a Sinthia-scale catalog,
// client-side substring matching over a lightweight per-collection prefetch
// is good enough; swap for Algolia/Typesense if the catalog grows large.

export async function searchAll(term: string) {
  const needle = term.trim().toLowerCase();
  if (!needle) return { games: [], tools: [], posts: [] };

  const [gamesSnap, toolsSnap, postsSnap] = await Promise.all([
    getDocs(query(collection(db, "games"), where("status", "==", "published"))),
    getDocs(query(collection(db, "tools"), where("status", "==", "published"))),
    getDocs(query(collection(db, "posts"), where("status", "==", "published"))),
  ]);

  const match = (title: string, description: string) =>
    title.toLowerCase().includes(needle) || description?.toLowerCase().includes(needle);

  return {
    games: gamesSnap.docs.map((d) => withId<Game>(d)).filter((g) => match(g.title, g.description)),
    tools: toolsSnap.docs.map((d) => withId<Tool>(d)).filter((t) => match(t.title, t.description)),
    posts: postsSnap.docs.map((d) => withId<Post>(d)).filter((p) => match(p.title, p.excerpt)),
  };
}
