import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCENT_CLASSES } from "@/lib/icon-map";
import type { AccentColor, FeaturedImage } from "@/types/content";

/**
 * Renders the real WP featured image when one is available (via `next/image`,
 * so it's optimized/lazy-loaded automatically), and falls back to the
 * gradient + icon placeholder when there isn't one — no real image yet on
 * that post/game/tool, mock data, or the WP request came back without
 * `_embed=1`.
 */
export function ImagePlaceholder({
  icon: Icon,
  accent,
  image,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority,
  className,
}: {
  icon: LucideIcon;
  accent: AccentColor;
  image?: FeaturedImage;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const colors = ACCENT_CLASSES[accent];

  if (image?.url) {
    return (
      <div className={cn("relative overflow-hidden bg-border/40", className)}>
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        accent === "primary" && "from-primary-100 to-primary-50",
        accent === "secondary" && "from-secondary-100 to-secondary-50",
        accent === "success" && "from-emerald-100 to-emerald-50",
        accent === "warning" && "from-amber-100 to-amber-50",
        accent === "danger" && "from-red-100 to-red-50",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-full bg-white/70 shadow-soft",
        )}
      >
        <Icon className={cn("size-5", colors.text)} />
      </span>
    </div>
  );
}
