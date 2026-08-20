"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle className="size-6 text-danger" />
      </span>
      <h1 className="text-2xl font-extrabold tracking-tight text-ink">
        Something went wrong
      </h1>
      <p className="max-w-sm text-sm text-ink-muted">
        An unexpected error occurred. Try again, or head back to the homepage.
      </p>
      <div className="flex gap-3">
        <Button variant="primary" size="md" onClick={reset}>
          Try Again
        </Button>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-card border border-border px-5 text-sm font-medium text-ink hover:bg-primary-50"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
