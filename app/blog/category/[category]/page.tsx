import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_CATEGORIES } from "@/constants/blog-categories";
import { getPosts } from "@/services/blog.service";
import { BlogGrid } from "@/features/blog/components";
import { Breadcrumbs } from "@/components/shared";

interface CategoryPageProps {
  params: { category: string };
}

function getCategory(slug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};

  return {
    title: `${category.label} Articles`,
    description: `Browse all SINTHIA articles in ${category.label}.`,
    alternates: { canonical: `/blog/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const { items: posts, totalItems } = await getPosts({
    category: category.slug,
    perPage: 50,
  });

  return (
    <main className="container-page py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: category.label, href: `/blog/category/${category.slug}` },
        ]}
      />

      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {category.label}
        </h1>
        <p className="mt-2 text-ink-muted">
          {totalItems} article{totalItems === 1 ? "" : "s"} in this category.
        </p>
      </div>

      <BlogGrid posts={posts} />
    </main>
  );
}
