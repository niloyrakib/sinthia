import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlogCard } from "@/components/shared/BlogCard";
import { Reveal } from "@/components/shared/Reveal";
import { getPosts } from "@/services/blog.service";

export async function LatestBlog() {
  const { items } = await getPosts({ perPage: 4 });
  const [featured, ...rest] = items;

  return (
    <section className="container-page py-10 sm:py-14">
      <SectionHeader
        title="Latest Blog Posts"
        subtitle="AI tips, tool guides, and ways to make money online"
        viewAllHref="/blog"
      />
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        {featured && (
          <Reveal>
            <BlogCard post={featured} />
          </Reveal>
        )}
        <div className="flex flex-col gap-3">
          {rest.slice(0, 3).map((post, i) => (
            <Reveal key={post.id} delay={0.08 + i * 0.06}>
              <BlogCard post={post} horizontal />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
