import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAccentClasses } from "@/lib/icon-map";
import type { Author } from "@/constants/mock-authors";

export function AuthorCard({ author }: { author: Author }) {
  const colors = getAccentClasses(author.accent);

  return (
    <Link
      href={`/blog/author/${author.slug}`}
      className="card-interactive flex items-start gap-4 rounded-card-lg border border-border bg-white p-5 shadow-soft"
    >
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full",
          colors.bg,
        )}
      >
        <User className={cn("size-5", colors.text)} />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{author.name}</p>
        <p className="text-xs font-medium text-ink-muted">{author.role}</p>
        <p className="mt-2 text-sm text-ink-muted">{author.bio}</p>
      </div>
    </Link>
  );
}
