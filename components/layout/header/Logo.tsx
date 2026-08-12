import Link from "next/link";

export function Logo({ withTagline = true }: { withTagline?: boolean }) {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5"
      aria-label="SINTHIA — home"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M16 2C17.5 8 18 8.5 24 10C18 11.5 17.5 12 16 18C14.5 12 14 11.5 8 10C14 8.5 14.5 8 16 2Z"
          fill="#6366F1"
        />
        <path
          d="M9 16C10 20 10.3 20.3 14 21.3C10.3 22.3 10 22.6 9 26.6C8 22.6 7.7 22.3 4 21.3C7.7 20.3 8 20 9 16Z"
          fill="#8B5CF6"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-ink">SINTHIA</span>
        {withTagline && (
          <span className="hidden text-[11px] font-medium tracking-wide text-ink-muted sm:block">
            Games · Tools · Blog
          </span>
        )}
      </span>
    </Link>
  );
}
