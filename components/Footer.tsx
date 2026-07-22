import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <Logo />
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/about" className="hover:text-ink">About</Link>
          <Link href="/contact" className="hover:text-ink">Contact</Link>
          <Link href="/blog" className="hover:text-ink">Blog</Link>
        </nav>
        <p className="text-xs text-muted">© {new Date().getFullYear()} Sinthia. All rights reserved.</p>
      </div>
    </footer>
  );
}
