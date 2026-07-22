import Link from "next/link";
import { FileText } from "lucide-react";

const THUMB_STYLES: Record<string, string> = {
  "ai-tools-2026": "from-fuchsia-600 to-cyan-500",
  "future-web-gaming": "from-violet-600 to-blue-500",
  "productive-online-tools": "from-slate-700 to-slate-500",
  "seo-best-practices": "from-amber-500 to-rose-500",
};

export default function BlogPostItem({
  title,
  slug,
  publishedAt,
  author,
}: {
  title: string;
  slug: string;
  publishedAt?: string;
  author: string;
}) {
  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  return (
    <Link href={`/blog/${slug}`} className="group flex items-center gap-3.5 rounded-xl p-2 transition hover:bg-surface">
      <div
        className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${
          THUMB_STYLES[slug] ?? "from-brand-violet to-brand-blue"
        }`}
      >
        <FileText className="h-5 w-5 text-white/80" />
      </div>
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink group-hover:text-brand-violet">
          {title}
        </h3>
        <p className="mt-1 text-xs text-muted">
          {date} &nbsp;•&nbsp; By {author}
        </p>
      </div>
    </Link>
  );
}
