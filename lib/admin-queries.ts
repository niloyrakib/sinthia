// lib/admin-queries.ts
// Auth-gated CRUD for the admin panel. Unlike lib/queries.ts, these return
// every status (draft/scheduled/published/archived) — Firestore rules
// restrict actual access to signed-in admin/editor/author accounts.

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import type { ContentStatus } from "./types";

export type ContentCollection = "posts" | "games" | "tools";

function withId<T>(id: string, data: unknown): T {
  return { id, ...(data as object) } as T;
}

export async function listAllContent<T extends { id: string }>(collectionName: ContentCollection): Promise<T[]> {
  const snap = await getDocs(query(collection(db, collectionName), orderBy("updatedAt", "desc")));
  return snap.docs.map((d) => withId<T>(d.id, d.data()));
}

export async function getContentById<T extends { id: string }>(
  collectionName: ContentCollection,
  id: string
): Promise<T | null> {
  const snap = await getDoc(doc(db, collectionName, id));
  return snap.exists() ? withId<T>(snap.id, snap.data()) : null;
}

export async function createContent(collectionName: ContentCollection, data: Record<string, unknown>) {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function updateContent(collectionName: ContentCollection, id: string, data: Record<string, unknown>) {
  await updateDoc(doc(db, collectionName, id), { ...data, updatedAt: new Date().toISOString() });
}

export async function deleteContent(collectionName: ContentCollection, id: string) {
  await deleteDoc(doc(db, collectionName, id));
}

export async function setStatus(collectionName: ContentCollection, id: string, status: ContentStatus) {
  const patch: Record<string, unknown> = { status, updatedAt: new Date().toISOString() };
  if (status === "published") patch.publishedAt = new Date().toISOString();
  await updateDoc(doc(db, collectionName, id), patch);
}

export async function bulkDelete(collectionName: ContentCollection, ids: string[]) {
  const batch = writeBatch(db);
  ids.forEach((id) => batch.delete(doc(db, collectionName, id)));
  await batch.commit();
}

export async function bulkSetStatus(collectionName: ContentCollection, ids: string[], status: ContentStatus) {
  const batch = writeBatch(db);
  ids.forEach((id) => {
    const patch: Record<string, unknown> = { status, updatedAt: new Date().toISOString() };
    if (status === "published") patch.publishedAt = new Date().toISOString();
    batch.update(doc(db, collectionName, id), patch);
  });
  await batch.commit();
}

// ---------- Categories / Tags (simple CRUD, no status) ----------

export async function listCategories() {
  const snap = await getDocs(collection(db, "categories"));
  return snap.docs.map((d) => withId<{ id: string; name: string; slug: string; type: string }>(d.id, d.data()));
}
export async function createCategory(data: Record<string, unknown>) {
  await addDoc(collection(db, "categories"), data);
}
export async function updateCategory(id: string, data: Record<string, unknown>) {
  await updateDoc(doc(db, "categories", id), data);
}
export async function deleteCategory(id: string) {
  await deleteDoc(doc(db, "categories", id));
}

export async function listTags() {
  const snap = await getDocs(collection(db, "tags"));
  return snap.docs.map((d) => withId<{ id: string; name: string; slug: string }>(d.id, d.data()));
}
export async function createTag(data: Record<string, unknown>) {
  await addDoc(collection(db, "tags"), data);
}
export async function deleteTag(id: string) {
  await deleteDoc(doc(db, "tags", id));
}

// ---------- Users ----------

export async function listUsers() {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => withId<{ id: string; name: string; email: string; role: string }>(d.id, d.data()));
}
export async function updateUserRole(id: string, role: string) {
  await updateDoc(doc(db, "users", id), { role });
}

// ---------- Media ----------

export async function listMedia() {
  const snap = await getDocs(query(collection(db, "media"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) =>
    withId<{ id: string; url: string; fileName: string; size: number; createdAt: string }>(d.id, d.data())
  );
}
export async function deleteMedia(id: string) {
  await deleteDoc(doc(db, "media", id));
}

// ---------- Settings ----------

export async function getSettings() {
  const snap = await getDoc(doc(db, "settings", "site"));
  return snap.exists() ? snap.data() : null;
}
export async function saveSettings(data: Record<string, unknown>) {
  await updateDoc(doc(db, "settings", "site"), data).catch(async () => {
    await addDoc(collection(db, "settings"), { id: "site", ...data });
  });
}
