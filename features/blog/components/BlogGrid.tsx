import { FileText } from "lucide-react";
import { BlogCard } from "@/components/shared/BlogCard";
import { Reveal } from "@/components/shared/Reveal";
import type { BlogPost } from "@/types/content";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card-lg border border-dashed border-border py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary-50">
          <FileText className="size-5 text-primary-600" />
        </span>
        <p className="text-sm font-medium text-ink">No articles match your filters</p>
        <p className="text-xs text-ink-muted">Try a different category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <Reveal key={post.id} delay={(i % 6) * 0.06}>
          <BlogCard post={post} />
        </Reveal>
      ))}
    </div>
  );
}
