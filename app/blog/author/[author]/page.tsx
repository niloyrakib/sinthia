import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCENT_CLASSES } from "@/lib/icon-map";
import { getAuthorBySlug, getAllAuthorSlugs, getPosts } from "@/services/blog.service";
import { BlogGrid } from "@/features/blog/components";
import { Breadcrumbs } from "@/components/shared";

interface AuthorPageProps {
  params: { author: string };
}

export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs();
  return slugs.map((author) => ({ author }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await getAuthorBySlug(params.author);
  if (!author) return {};

  return {
    title: `${author.name} — Author`,
    description: author.bio,
    alternates: { canonical: `/blog/author/${author.slug}` },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await getAuthorBySlug(params.author);
  if (!author) notFound();

  const { items: posts } = await getPosts({ authorSlug: author.slug, perPage: 50 });
  const colors = ACCENT_CLASSES[author.accent];

  return (
    <main className="container-page py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: author.name, href: `/blog/author/${author.slug}` },
        ]}
      />

      <div className="mb-10 flex items-start gap-5 rounded-card-lg border border-border bg-white p-6 shadow-soft">
        <span
          className={cn(
            "flex size-16 shrink-0 items-center justify-center rounded-full",
            colors.bg,
          )}
        >
          <User className={cn("size-7", colors.text)} />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">
            {author.name}
          </h1>
          <p className="text-sm font-medium text-ink-muted">{author.role}</p>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">{author.bio}</p>
        </div>
      </div>

      <h2 className="mb-4 text-lg font-bold text-ink">
        Articles by {author.name} ({posts.length})
      </h2>
      <BlogGrid posts={posts} />
    </main>
  );
}
