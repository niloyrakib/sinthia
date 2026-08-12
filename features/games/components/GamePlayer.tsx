"use client";

import * as React from "react";
import { Gamepad2, Maximize, Minimize, Play, RotateCcw } from "lucide-react";
import { getAccentClasses } from "@/lib/icon-map";
import { cn } from "@/lib/utils";
import { useFullscreen } from "@/hooks/useFullscreen";
import { FavoriteButton } from "@/components/shared/FavoriteButton";
import { ShareButton } from "@/components/shared/ShareButton";
import type { Game } from "@/types/content";

export function GamePlayer({ game }: { game: Game }) {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const { isFullscreen, toggle } = useFullscreen(frameRef);
  const [status, setStatus] = React.useState<"idle" | "loading" | "playing">("idle");
  const colors = getAccentClasses(game.accent);

  // Deterministic on both server and the client's first render pass —
  // window.location.href only exists in the browser, so reading it directly
  // during render would make the server and client's first output differ
  // (a React hydration mismatch), even though the value never currently
  // lands in visible DOM output. Resolving it post-mount avoids the
  // landmine entirely rather than relying on that being true forever.
  const [shareUrl, setShareUrl] = React.useState(
    `https://sinthia.top/games/${game.slug}`,
  );
  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  function startGame() {
    setStatus("loading");
    // Real embed integration (iframe / WebGL bundle) drops in here in a later
    // phase — this simulates the load so the UI states are all exercised.
    window.setTimeout(() => setStatus("playing"), 900);
  }

  return (
    <div>
      <div
        ref={frameRef}
        className={cn(
          "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-card-lg border border-border bg-gradient-to-br shadow-soft-lg",
          game.accent === "primary" && "from-primary-100 to-primary-50",
          game.accent === "secondary" && "from-secondary-100 to-secondary-50",
          game.accent === "success" && "from-emerald-100 to-emerald-50",
          game.accent === "warning" && "from-amber-100 to-amber-50",
          game.accent === "danger" && "from-red-100 to-red-50",
          isFullscreen && "aspect-auto rounded-none",
        )}
      >
        {status === "idle" && (
          <button
            type="button"
            onClick={startGame}
            className="flex flex-col items-center gap-3 rounded-card-lg px-6 py-4 transition-transform duration-200 ease-premium hover:scale-105"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-white shadow-soft-lg">
              <Play className="ml-1 size-6 fill-primary text-primary" />
            </span>
            <span className="text-sm font-semibold text-ink">Click to Play</span>
          </button>
        )}

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3">
            <span className="size-10 animate-spin rounded-full border-4 border-white border-t-primary" />
            <span className="text-sm font-medium text-ink-muted">
              Loading {game.title}...
            </span>
          </div>
        )}

        {status === "playing" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <span
              className={cn(
                "flex size-14 items-center justify-center rounded-full bg-white/80",
              )}
            >
              <Gamepad2 className={cn("size-6", colors.text)} />
            </span>
            <p className="text-sm font-medium text-ink">{game.title} is running here.</p>
            <p className="max-w-xs text-xs text-ink-muted">
              This placeholder stands in for the real game canvas / iframe embed.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-1 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-soft hover:bg-primary-50"
            >
              <RotateCcw className="size-3.5" />
              Restart
            </button>
          </div>
        )}

        {status === "playing" && (
          <button
            type="button"
            onClick={toggle}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-card bg-white/90 text-ink shadow-soft hover:bg-white"
          >
            {isFullscreen ? (
              <Minimize className="size-4" />
            ) : (
              <Maximize className="size-4" />
            )}
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            {game.category}
          </span>
          <span className="rounded-full bg-border/60 px-3 py-1 text-xs font-medium text-ink-muted">
            {game.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ShareButton title={game.title} url={shareUrl} size="sm" />
          <FavoriteButton namespace="games" id={game.id} size="sm" />
        </div>
      </div>
    </div>
  );
}
