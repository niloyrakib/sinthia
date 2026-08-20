import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs, getAuthorBySlug } from "@/services/blog.service";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { Breadcrumbs } from "@/components/shared";
import { Newsletter } from "@/features/home/components";
import {
  ReadingProgress,
  TableOfContents,
  ArticleContent,
  ArticleFAQ,
  AuthorCard,
  ArticleShareBar,
  CommentsSection,
  RelatedPosts,
  ArticleJsonLd,
} from "@/features/blog/components";
import { SITE } from "@/constants/design-tokens";
import { formatDate } from "@/lib/utils";

interface ArticlePageProps {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const author = await getAuthorBySlug(post.authorSlug);
  const url = `${SITE.url}/blog/${post.slug}`;

  return (
    <main>
      <ArticleJsonLd post={post} />
      <ReadingProgress />

      <div className="container-page py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.category, href: `/blog/category/${post.categorySlug}` },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        <div className="max-w-3xl">
          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-700">
            {post.category}
          </span>
          <h1 className="my-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mb-5 text-sm text-ink-muted">
            By{" "}
            <Link
              href={`/blog/author/${post.authorSlug}`}
              className="font-medium text-ink hover:text-primary-700"
            >
              {post.author}
            </Link>{" "}
            · {formatDate(post.publishedAt)} · {post.readTimeMinutes} min read
          </p>
        </div>

        <ImagePlaceholder
          icon={FileText}
          accent={post.accent}
          image={post.image}
          sizes="(min-width: 1024px) 768px, 100vw"
          priority
          className="mb-8 aspect-[21/9] w-full max-w-4xl rounded-card-lg"
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
          <div>
            <ArticleContent content={post.content} />

            <div className="mt-6 flex max-w-2xl flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-border/50 px-3 py-1 text-xs font-medium text-ink-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-6 max-w-2xl">
              <ArticleShareBar title={post.title} url={url} />
            </div>

            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12">
                <ArticleFAQ faqs={post.faqs} />
              </div>
            )}

            {author && (
              <div className="mt-10 max-w-2xl">
                <AuthorCard author={author} />
              </div>
            )}

            <CommentsSection postSlug={post.slug} />

            <RelatedPosts current={post} />
          </div>

          <TableOfContents content={post.content} />
        </div>
      </div>

      <Newsletter />
    </main>
  );
}
