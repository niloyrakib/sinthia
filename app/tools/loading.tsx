import { GridSkeleton } from "@/components/shared";

export default function ToolsLoading() {
  return (
    <main className="container-page py-8 sm:py-12">
      <div className="mb-8 max-w-2xl space-y-2">
        <div className="skeleton h-9 w-64 rounded-card" />
        <div className="skeleton h-5 w-96 max-w-full rounded-card" />
      </div>
      <GridSkeleton
        count={9}
        columns="grid-cols-2 lg:grid-cols-3"
        aspect="aspect-[3/2]"
      />
    </main>
  );
}
