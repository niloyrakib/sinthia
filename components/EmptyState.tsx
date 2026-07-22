import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  body,
}: {
  icon?: LucideIcon;
  title?: string;
  body?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-line py-16 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-surface text-muted">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-base font-bold text-ink">{title}</h3>
      {body && <p className="mt-1.5 max-w-sm text-sm text-muted">{body}</p>}
    </div>
  );
}
