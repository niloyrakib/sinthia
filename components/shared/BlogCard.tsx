import Link from "next/link";
import { FileText } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { getAccentClasses } from "@/lib/icon-map";
import { cn, formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/content";

export function BlogCard({
  post,
  horizontal = false,
}: {
  post: BlogPost;
  horizontal?: boolean;
}) {
  const colors = getAccentClasses(post.accent);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "card-interactive group flex overflow-hidden rounded-card-lg border border-border bg-white shadow-soft",
        horizontal ? "flex-row items-stretch" : "flex-col",
      )}
    >
      <ImagePlaceholder
        icon={FileText}
        accent={post.accent}
        className={
          horizontal ? "aspect-square w-28 shrink-0 sm:w-36" : "aspect-[16/9] w-full"
        }
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span
          className={cn(
            "w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            colors.bg,
            colors.text,
          )}
        >
          {post.category}
        </span>
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-ink">
          {post.title}
        </p>
        {!horizontal && (
          <p className="line-clamp-2 text-xs text-ink-muted">{post.excerpt}</p>
        )}
        <p className="mt-auto text-[11px] text-ink-muted">
          {post.author} · {formatDate(post.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
