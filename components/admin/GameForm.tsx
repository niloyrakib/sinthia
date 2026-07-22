"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye } from "lucide-react";
import SEOFields from "@/components/admin/SEOFields";
import MediaUploader from "@/components/admin/MediaUploader";
import { createContent, updateContent, listCategories } from "@/lib/admin-queries";
import { useToast } from "@/lib/toast-context";
import type { Game, ContentStatus } from "@/lib/types";

const EMPTY: Omit<Game, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  slug: "",
  description: "",
  thumbnail: "",
  categoryId: "",
  tagIds: [],
  status: "draft",
  gameUrl: "",
  screenshots: [],
  instructions: "",
  controls: "",
  developer: "",
  playCount: 0,
};

export default function GameForm({ gameId, initial }: { gameId?: string; initial?: Game }) {
  const router = useRouter();
  const { push } = useToast();
  const [form, setForm] = useState(initial ?? EMPTY);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listCategories().then((cats) => setCategories(cats.filter((c) => c.type === "game")));
  }, []);

  function slugify(title: string) {
    return title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }

  async function save(status?: ContentStatus) {
    setSaving(true);
    const payload = { ...form, ...(status ? { status } : {}) };
    try {
      if (gameId) {
        await updateContent("games", gameId, payload);
        push("success", "Game updated");
      } else {
        const id = await createContent("games", payload);
        push("success", "Game created");
        router.push(`/admin/games/${id}/edit`);
        return;
      }
    } catch {
      push("error", "Failed to save game");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 px-6 pb-10 sm:px-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <div className="rounded-xl2 border border-line bg-white p-5">
          <label className="mb-1.5 block text-sm font-medium text-ink">Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })}
            className="w-full rounded-xl border border-line px-4 py-2.5 text-lg font-semibold focus:border-brand-violet focus:outline-none"
          />
          <label className="mb-1.5 mt-4 block text-sm font-medium text-ink">Slug</label>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />
          <label className="mb-1.5 mt-4 block text-sm font-medium text-ink">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />
          <label className="mb-1.5 mt-4 block text-sm font-medium text-ink">Game URL / Embed</label>
          <input value={form.gameUrl} onChange={(e) => setForm({ ...form, gameUrl: e.target.value })} placeholder="https://..." className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl2 border border-line bg-white p-5">
            <label className="mb-1.5 block text-sm font-medium text-ink">Instructions</label>
            <textarea value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} rows={4} className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />
          </div>
          <div className="rounded-xl2 border border-line bg-white p-5">
            <label className="mb-1.5 block text-sm font-medium text-ink">Controls</label>
            <textarea value={form.controls} onChange={(e) => setForm({ ...form, controls: e.target.value })} rows={4} className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />
          </div>
        </div>

        <SEOFields value={form} onChange={(seo) => setForm({ ...form, ...seo })} />
      </div>

      <div className="space-y-5">
        <div className="rounded-xl2 border border-line bg-white p-5">
          <h3 className="font-display text-sm font-bold text-ink">Publish</h3>
          <label className="mb-1.5 mt-4 block text-sm font-medium text-ink">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ContentStatus })} className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none">
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <label className="mb-1.5 mt-4 block text-sm font-medium text-ink">Category</label>
          <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none">
            <option value="">Select...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>

          <label className="mb-1.5 mt-4 block text-sm font-medium text-ink">Developer</label>
          <input value={form.developer} onChange={(e) => setForm({ ...form, developer: e.target.value })} className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />

          <div className="mt-5 flex flex-col gap-2">
            <button disabled={saving} onClick={() => save()} className="flex items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-60">
              <Save className="h-4 w-4" /> Save
            </button>
            <button disabled={saving} onClick={() => save("published")} className="flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card disabled:opacity-60">
              <Eye className="h-4 w-4" /> Save &amp; Publish
            </button>
          </div>
        </div>

        <MediaUploader label="Thumbnail" value={form.thumbnail} onChange={(url) => setForm({ ...form, thumbnail: url })} />
      </div>
    </div>
  );
}
