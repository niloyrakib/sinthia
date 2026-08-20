"use client";

import { Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export function ShareButton({
  title,
  url,
  size = "md",
}: {
  title: string;
  url: string;
  size?: "sm" | "md";
}) {
  async function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the native share sheet — no-op
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Couldn't copy the link");
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share"
      className={cn(
        "flex items-center justify-center rounded-full border border-border bg-white text-ink-muted shadow-soft transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700",
        size === "sm" ? "size-8" : "size-11",
      )}
    >
      <Share2 className={size === "sm" ? "size-4" : "size-5"} />
    </button>
  );
}
