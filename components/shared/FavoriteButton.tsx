"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

export function FavoriteButton({
  namespace,
  id,
  size = "md",
}: {
  namespace: string;
  id: string;
  size?: "sm" | "md";
}) {
  const { isFavorite, toggle, hydrated } = useFavorites(namespace);
  const active = hydrated && isFavorite(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "flex items-center justify-center rounded-full border border-border bg-white shadow-soft transition-colors hover:border-red-200 hover:bg-red-50",
        size === "sm" ? "size-8" : "size-11",
      )}
    >
      <motion.span
        key={String(active)}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Heart
          className={cn(
            size === "sm" ? "size-4" : "size-5",
            active ? "fill-danger text-danger" : "text-ink-muted",
          )}
        />
      </motion.span>
    </button>
  );
}
