"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable, { type DataTableColumn } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { listAllContent, bulkDelete, bulkSetStatus, deleteContent } from "@/lib/admin-queries";
import { useToast } from "@/lib/toast-context";
import type { Post } from "@/lib/types";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const { push } = useToast();

  async function reload() {
    setPosts(await listAllContent<Post>("posts"));
  }
  useEffect(() => {
    reload();
  }, []);

  const columns: DataTableColumn<Post>[] = [
    {
      key: "title",
      header: "Title",
      render: (p) => (
        <div>
          <p className="font-semibold text-ink">{p.title}</p>
          <p className="text-xs text-muted">/{p.slug}</p>
        </div>
      ),
    },
    { key: "author", header: "Author", render: (p) => p.authorId },
    { key: "status", header: "Status", render: (p) => <StatusBadge status={p.status} /> },
    {
      key: "updated",
      header: "Updated",
      render: (p) => new Date(p.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (p) => (
        <div className="flex justify-end gap-2">
          <Link href={`/admin/posts/${p.id}/edit`} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-ink/20">
            <Pencil className="h-3.5 w-3.5" />
          </Link>
          <button onClick={() => setPendingDelete(p.id)} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-rose-600 hover:border-rose-300">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminPageHeader
        title="Posts"
        description="Manage blog content."
        action={
          <Link href="/admin/posts/new" className="flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card">
            <Plus className="h-4 w-4" /> New Post
          </Link>
        }
      />
      <div className="px-6 pb-10 sm:px-8">
        <DataTable
          rows={posts ?? []}
          loading={posts === null}
          columns={columns}
          searchKeys={["title", "slug", "authorId"]}
          emptyTitle="No posts yet"
          bulkActions={(ids, clear) => (
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  await bulkSetStatus("posts", ids, "published");
                  push("success", `Published ${ids.length} post(s)`);
                  clear();
                  reload();
                }}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:border-ink/20"
              >
                Publish
              </button>
              <button
                onClick={async () => {
                  await bulkSetStatus("posts", ids, "draft");
                  push("info", `Moved ${ids.length} post(s) to draft`);
                  clear();
                  reload();
                }}
                className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:border-ink/20"
              >
                Draft
              </button>
              <button
                onClick={async () => {
                  await bulkDelete("posts", ids);
                  push("success", `Deleted ${ids.length} post(s)`);
                  clear();
                  reload();
                }}
                className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                Delete
              </button>
            </div>
          )}
        />
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this post?"
        body="This can't be undone."
        confirmLabel="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete) {
            await deleteContent("posts", pendingDelete);
            push("success", "Post deleted");
            setPendingDelete(null);
            reload();
          }
        }}
      />
    </>
  );
}
