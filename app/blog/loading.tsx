import { GridSkeleton } from "@/components/shared";

export default function BlogLoading() {
  return (
    <main className="container-page py-8 sm:py-12">
      <div className="mb-8 max-w-2xl space-y-2">
        <div className="skeleton h-9 w-48 rounded-card" />
        <div className="skeleton h-5 w-80 max-w-full rounded-card" />
      </div>
      <div className="skeleton mb-10 h-64 w-full rounded-card-lg" />
      <GridSkeleton
        count={6}
        columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        aspect="aspect-[16/9]"
      />
    </main>
  );
}
