import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import EmptyState from "@/components/EmptyState";
import CategoryFilter from "@/components/CategoryFilter";
import { getPublishedPosts, getCategories } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides and insights on AI tools, web gaming, productivity, and SEO.",
};

export const revalidate = 300;

export default async function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const [categories, { items: posts }] = await Promise.all([
    getCategories("post"),
    getPublishedPosts({ categorySlug: searchParams.category }),
  ]);
  const categoryName = (id: string) => categories.find((c) => c.slug === id)?.name ?? id;

  return (
    <>
      <Header />
      <main className="container-page py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        <h1 className="font-display text-3xl font-extrabold text-ink">Blog</h1>
        <p className="mt-2 max-w-xl text-muted">Guides and insights on AI, web gaming, productivity, and SEO.</p>

        <div className="mt-8">
          <CategoryFilter categories={categories} />
        </div>

        {posts.length === 0 ? (
          <EmptyState icon={FileText} title="No posts found" body="Try a different category." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group block overflow-hidden rounded-xl2 border border-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-cardHover"
              >
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-brand-violet to-brand-blue">
                  <FileText className="h-7 w-7 text-white/70" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-brand-violet">{categoryName(p.categoryId)}</span>
                  <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-ink group-hover:text-brand-violet">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{p.excerpt}</p>
                  <p className="mt-3 text-xs text-muted">
                    {p.publishedAt && new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · By {p.authorId}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
