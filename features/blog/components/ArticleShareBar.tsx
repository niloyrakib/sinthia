import { Facebook, Linkedin, Twitter } from "lucide-react";
import { ShareButton } from "@/components/shared/ShareButton";

export function ArticleShareBar({ title, url }: { title: string; url: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Share on Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "Share on Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        Share
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex size-9 items-center justify-center rounded-full border border-border bg-white text-ink-muted transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
        >
          <link.icon className="size-4" />
        </a>
      ))}
      <ShareButton title={title} url={url} size="sm" />
    </div>
  );
}
