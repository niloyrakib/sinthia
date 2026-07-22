import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostItem from "@/components/BlogPostItem";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import { getPostBySlug, getRelatedPosts } from "@/lib/queries";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    alternates: { canonical: post.canonicalUrl ?? `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      images: post.ogImage ? [post.ogImage] : undefined,
    },
  };
}

export const revalidate = 300;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post);

  return (
    <>
      <Header />
      <main className="container-page max-w-3xl py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <h1 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">{post.title}</h1>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" /> {post.authorId}
          </span>
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          )}
        </div>

        <div className="mt-6 h-56 rounded-xl2 bg-gradient-to-br from-brand-violet to-brand-blue sm:h-72" />

        <article className="prose prose-slate mt-8 max-w-none text-[15px] leading-relaxed text-ink/90">
          <p>{post.content}</p>
        </article>

        {post.faq && post.faq.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Frequently Asked Questions</h2>
            <FAQAccordion items={post.faq} />
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-12 border-t border-line pt-8">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">Related Posts</h2>
            <div className="space-y-1 rounded-xl2 border border-line bg-white p-2 shadow-card">
              {related.map((p) => (
                <BlogPostItem key={p.id} title={p.title} slug={p.slug} publishedAt={p.publishedAt} author={p.authorId} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          author: { "@type": "Person", name: post.authorId },
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
        }}
      />
      {post.faq && post.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
      )}
    </>
  );
}
