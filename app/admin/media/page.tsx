"use client";

import { useEffect, useState } from "react";
import { Trash2, Copy } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import MediaUploader from "@/components/admin/MediaUploader";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { listMedia, deleteMedia } from "@/lib/admin-queries";
import { useToast } from "@/lib/toast-context";

interface MediaItem {
  id: string;
  url: string;
  fileName: string;
  size: number;
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const { push } = useToast();

  async function reload() {
    setItems((await listMedia()) as MediaItem[]);
  }
  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      <AdminPageHeader title="Media Library" description="Images uploaded across posts, games, and tools." />
      <div className="grid gap-6 px-6 pb-10 sm:px-8 lg:grid-cols-[1fr_280px]">
        <div>
          {items === null ? (
            <p className="text-sm text-muted">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-muted">No media uploaded yet — use the uploader to add your first image.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <div key={item.id} className="group relative overflow-hidden rounded-xl2 border border-line bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.fileName} className="h-32 w-full object-cover" />
                  <div className="p-2.5">
                    <p className="truncate text-xs font-medium text-ink">{item.fileName}</p>
                    <p className="text-[11px] text-muted">{(item.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 transition group-hover:opacity-100">
                    <button
                      onClick={() => navigator.clipboard.writeText(item.url)}
                      className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-ink shadow-card"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setPendingDelete(item.id)}
                      className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-rose-600 shadow-card"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-fit">
          <MediaUploader label="Upload new" onChange={() => { push("success", "Uploaded"); reload(); }} />
        </div>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this file?"
        body="It will be removed from the media library (any content still referencing its URL won't be updated automatically)."
        confirmLabel="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (pendingDelete) {
            await deleteMedia(pendingDelete);
            push("success", "File deleted");
            setPendingDelete(null);
            reload();
          }
        }}
      />
    </>
  );
}
