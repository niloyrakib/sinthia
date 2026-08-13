import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { ACCENT_CLASSES } from "@/lib/icon-map";
import { cn, formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/content";

export function FeaturedPost({ post }: { post: BlogPost }) {
  const colors = ACCENT_CLASSES[post.accent];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-interactive group grid overflow-hidden rounded-card-lg border border-border bg-white shadow-soft lg:grid-cols-2"
    >
      <ImagePlaceholder
        icon={FileText}
        accent={post.accent}
        className="aspect-[16/9] w-full lg:aspect-auto"
      />
      <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
        <span
          className={cn(
            "w-fit rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide",
            colors?.bg,
            colors?.text,
          )}
        >
          Featured · {post.category}
        </span>
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
          {post.title}
        </h2>
        <p className="text-sm text-ink-muted">{post.excerpt}</p>
        <p className="text-xs text-ink-muted">
          {post.author} · {formatDate(post.publishedAt)} · {post.readTimeMinutes} min read
        </p>
        <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-primary-600">
          Read Article
          <ArrowRight className="size-4 transition-transform duration-200 ease-premium group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
