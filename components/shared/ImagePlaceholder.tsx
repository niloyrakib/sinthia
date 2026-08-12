import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCENT_CLASSES } from "@/lib/icon-map";
import type { AccentColor } from "@/types/content";

/**
 * Stand-in for a real thumbnail. Swap for `next/image` pointed at the WP
 * featured-image URL in Phase 8 — keep the same aspect-ratio wrapper so
 * layout doesn't shift, and keep this component around as the loading/error
 * fallback.
 */
export function ImagePlaceholder({
  icon: Icon,
  accent,
  className,
}: {
  icon: LucideIcon;
  accent: AccentColor;
  className?: string;
}) {
  const colors = ACCENT_CLASSES[accent];

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
