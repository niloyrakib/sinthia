import { cn } from "@/lib/utils";

export function GridSkeleton({
  count = 8,
  columns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  aspect = "aspect-[4/3]",
}: {
  count?: number;
  columns?: string;
  aspect?: string;
}) {
  return (
    <div className={cn("grid gap-4", columns)}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-card-lg border border-border bg-white"
        >
          <div className={cn("skeleton w-full", aspect)} />
          <div className="space-y-2 p-3.5">
            <div className="skeleton h-3.5 w-3/4 rounded-full" />
            <div className="skeleton h-3 w-1/2 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
