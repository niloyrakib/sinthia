"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { listCategories, createCategory, deleteCategory } from "@/lib/admin-queries";
import { useToast } from "@/lib/toast-context";
import type { Category } from "@/lib/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", type: "post" as Category["type"] });
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const { push } = useToast();

  async function reload() {
    setCategories((await listCategories()) as Category[]);
  }
  useEffect(() => {
    reload();
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, "-");
    await createCategory({ ...form, slug });
    push("success", "Category created");
    setForm({ name: "", slug: "", type: "post" });
    reload();
  }

  return (
    <>
      <AdminPageHeader title="Categories" description="Organize games, tools, and posts." />
      <div className="grid gap-6 px-6 pb-10 sm:px-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl2 border border-line bg-white shadow-card">
          {categories === null ? (
            <p className="p-6 text-sm text-muted">Loading...</p>
          ) : categories.length === 0 ? (
            <p className="p-6 text-sm text-muted">No categories yet — add one to get started.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">{c.name}</td>
                    <td className="px-4 py-3 text-muted">{c.slug}</td>
                    <td className="px-4 py-3 capitalize text-muted">{c.type}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setPendingDelete(c.id)} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-rose-600 hover:border-rose-300">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <form onSubmit={onCreate} className="h-fit rounded-xl2 border border-line bg-white p-5">
          <h3 className="mb-4 font-display text-sm font-bold text-ink">Add Category</h3>
          <label className="mb-1.5 block text-sm font-medium text-ink">Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mb-3 w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />
          <label className="mb-1.5 block text-sm font-medium text-ink">Slug (optional)</label>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mb-3 w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none" />
          <label className="mb-1.5 block text-sm font-medium text-ink">Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Category["type"] })} className="mb-4 w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand-violet focus:outline-none">
            <option value="post">Post</option>
            <option value="game">Game</option>
            <option value="tool">Tool</option>
            <option value="general">General</option>
          </select>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card">
            <Plus className="h-4 w-4" /> Add Category
          </button>
        </form>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this category?"
        body="Content using it will keep the old category ID until reassigned."
        confirmLabel="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete) {
            await deleteCategory(pendingDelete);
            push("success", "Category deleted");
            setPendingDelete(null);
            reload();
          }
        }}
      />
    </>
  );
}
