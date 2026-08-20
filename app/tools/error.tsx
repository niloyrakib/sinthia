"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/shared";

export default function ToolsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("Tools route error:", error);
  }, [error]);

  return (
    <main className="container-page py-16">
      <ErrorState message="We couldn't load the tools right now." onRetry={reset} />
    </main>
  );
}
