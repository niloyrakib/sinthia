import Link from "next/link";
import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary-50">
        <Compass className="size-6 text-primary-600" />
      </span>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">404</h1>
      <p className="max-w-sm text-sm text-ink-muted">
        We couldn&apos;t find the page you&apos;re looking for.{" "}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants({ variant: "primary", size: "md" })}>
          Back to Home
        </Link>
        <Link
          href="/games"
          className={buttonVariants({ variant: "outline", size: "md" })}
        >
          Browse Games
        </Link>
      </div>
    </div>
  );
}
