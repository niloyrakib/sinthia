import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({
  message = "Something went wrong while loading this content.",
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card-lg border border-dashed border-danger/30 bg-red-50/30 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle className="size-5 text-danger" />
      </span>
      <p className="text-sm font-medium text-ink">{message}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        <RotateCw className="size-3.5" />
        Try Again
      </Button>
    </div>
  );
}
