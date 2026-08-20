import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoadMoreButton({
  onClick,
  isLoading,
  hasMore,
  loadedCount,
  totalCount,
}: {
  onClick: () => void;
  isLoading: boolean;
  hasMore: boolean;
  loadedCount: number;
  totalCount: number;
}) {
  if (!hasMore) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <Button variant="outline" size="lg" onClick={onClick} disabled={isLoading}>
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {isLoading ? "Loading..." : "Load More"}
      </Button>
      <p className="text-xs text-ink-muted">
        Showing {loadedCount} of {totalCount}
      </p>
    </div>
  );
}
