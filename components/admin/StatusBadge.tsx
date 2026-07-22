import type { ContentStatus } from "@/lib/types";

const STYLES: Record<ContentStatus, string> = {
  draft: "bg-zinc-100 text-zinc-600",
  scheduled: "bg-amber-100 text-amber-700",
  published: "bg-emerald-100 text-emerald-700",
  archived: "bg-rose-100 text-rose-600",
};

export default function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STYLES[status]}`}>
      {status}
    </span>
  );
}
