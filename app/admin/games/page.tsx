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
import type { Game } from "@/lib/types";

export default function AdminGamesPage() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const { push } = useToast();

  async function reload() {
    setGames(await listAllContent<Game>("games"));
  }
  useEffect(() => {
    reload();
  }, []);

  const columns: DataTableColumn<Game>[] = [
    {
      key: "title",
      header: "Title",
      render: (g) => (
        <div>
          <p className="font-semibold text-ink">{g.title}</p>
          <p className="text-xs text-muted">/{g.slug}</p>
        </div>
      ),
    },
    { key: "developer", header: "Developer", render: (g) => g.developer },
    { key: "plays", header: "Plays", render: (g) => g.playCount?.toLocaleString() ?? 0 },
    { key: "status", header: "Status", render: (g) => <StatusBadge status={g.status} /> },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (g) => (
        <div className="flex justify-end gap-2">
          <Link href={`/admin/games/${g.id}/edit`} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-ink/20">
            <Pencil className="h-3.5 w-3.5" />
          </Link>
          <button onClick={() => setPendingDelete(g.id)} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-rose-600 hover:border-rose-300">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <AdminPageHeader
        title="Games"
        description="Manage the games catalog."
        action={
          <Link href="/admin/games/new" className="flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card">
            <Plus className="h-4 w-4" /> New Game
          </Link>
        }
      />
      <div className="px-6 pb-10 sm:px-8">
        <DataTable
          rows={games ?? []}
          loading={games === null}
          columns={columns}
          searchKeys={["title", "slug", "developer"]}
          emptyTitle="No games yet"
          bulkActions={(ids, clear) => (
            <div className="flex gap-2">
              <button onClick={async () => { await bulkSetStatus("games", ids, "published"); push("success", `Published ${ids.length}`); clear(); reload(); }} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:border-ink/20">
                Publish
              </button>
              <button onClick={async () => { await bulkSetStatus("games", ids, "draft"); push("info", `Moved ${ids.length} to draft`); clear(); reload(); }} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:border-ink/20">
                Draft
              </button>
              <button onClick={async () => { await bulkDelete("games", ids); push("success", `Deleted ${ids.length}`); clear(); reload(); }} className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                Delete
              </button>
            </div>
          )}
        />
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this game?"
        body="This can't be undone."
        confirmLabel="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete) {
            await deleteContent("games", pendingDelete);
            push("success", "Game deleted");
            setPendingDelete(null);
            reload();
          }
        }}
      />
    </>
  );
}
