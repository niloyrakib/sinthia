import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlogCard } from "@/components/shared/BlogCard";
import { Reveal } from "@/components/shared/Reveal";
import { getPosts } from "@/services/blog.service";
import type { BlogPost } from "@/types/content";

export async function RelatedPosts({ current }: { current: BlogPost }) {
  const { items } = await getPosts({ category: current.categorySlug, perPage: 4 });
  const related = items.filter((p) => p.id !== current.id).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 max-w-4xl">
      <SectionHeader
        title="Related Posts"
        viewAllHref={`/blog/category/${current.categorySlug}`}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.06}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
