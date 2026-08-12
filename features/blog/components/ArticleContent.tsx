import type { ContentBlock } from "@/types/content";

export function ArticleContent({ content }: { content: ContentBlock[] }) {
  return (
    <div className="max-w-2xl">
      {content.map((block, i) =>
        block.type === "heading" ? (
          <h2
            key={i}
            id={block.id}
            className="mb-4 mt-10 scroll-mt-28 text-xl font-bold tracking-tight text-ink first:mt-0 sm:text-2xl"
          >
            {block.text}
          </h2>
        ) : (
          <p key={i} className="mb-4 text-[15px] leading-relaxed text-ink-muted">
            {block.text}
          </p>
        ),
      )}
    </div>
  );
}
