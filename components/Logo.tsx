import { Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Sinthia home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-card">
        <Gamepad2 className="h-5 w-5" strokeWidth={2.4} />
      </span>
      <span className="font-display text-[1.35rem] font-extrabold tracking-tight text-ink">
        SINTHIA
      </span>
    </Link>
  );
}
