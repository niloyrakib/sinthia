import { GridSkeleton } from "@/components/shared";

export default function GamesLoading() {
  return (
    <main className="container-page py-8 sm:py-12">
      <div className="mb-8 max-w-2xl space-y-2">
        <div className="skeleton h-9 w-64 rounded-card" />
        <div className="skeleton h-5 w-96 max-w-full rounded-card" />
      </div>
      <GridSkeleton count={8} columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" />
    </main>
  );
}
