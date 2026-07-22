"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { listTags, createTag, deleteTag } from "@/lib/admin-queries";
import { useToast } from "@/lib/toast-context";
import type { Tag } from "@/lib/types";

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [name, setName] = useState("");
  const { push } = useToast();

  async function reload() {
    setTags((await listTags()) as Tag[]);
  }
  useEffect(() => {
    reload();
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await createTag({ name, slug: name.toLowerCase().replace(/\s+/g, "-") });
    push("success", "Tag added");
    setName("");
    reload();
  }

  return (
    <>
      <AdminPageHeader title="Tags" description="Fine-grained labels for content." />
      <div className="px-6 pb-10 sm:px-8">
        <form onSubmit={onCreate} className="mb-6 flex max-w-md gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New tag name"
            className="flex-1 rounded-full border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none"
          />
          <button type="submit" className="flex items-center gap-1.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card">
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {tags === null && <p className="text-sm text-muted">Loading...</p>}
          {tags?.length === 0 && <p className="text-sm text-muted">No tags yet.</p>}
          {tags?.map((t) => (
            <span key={t.id} className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink">
              {t.name}
              <button
                onClick={async () => {
                  await deleteTag(t.id);
                  reload();
                }}
              >
                <X className="h-3.5 w-3.5 text-muted hover:text-rose-600" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
