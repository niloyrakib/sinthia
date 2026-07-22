import type { Metadata } from "next";
import { Gamepad2, Wrench, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About",
  description: "Sinthia is a free platform for browser games, online tools, and practical guides.",
};

const PILLARS = [
  { icon: Gamepad2, title: "Games", body: "Instant-play browser games — no downloads, no accounts." },
  { icon: Wrench, title: "Tools", body: "Small, focused utilities that solve one job well." },
  { icon: FileText, title: "Blog", body: "Practical guides on AI, productivity, and the web." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container-page max-w-3xl py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <h1 className="font-display text-3xl font-extrabold text-ink">About Sinthia</h1>
        <p className="mt-4 leading-relaxed text-muted">
          Sinthia is a free, all-in-one platform combining browser games, everyday online tools, and practical
          written guides — built to be fast, ad-light, and useful without asking anyone to sign up first.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-xl2 border border-line p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-violet/10 text-brand-violet">
                <p.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-3.5 font-display text-base font-bold text-ink">{p.title}</h2>
              <p className="mt-1.5 text-sm text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
