import Link from "next/link";
import { Sparkles, Gamepad2, Wrench, BarChart3, Play, Rows3 } from "lucide-react";
import { platformStats } from "@/lib/demo-data";

export default function HeroSection() {
  return (
    <section className="container-page grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
      {/* Left: copy */}
      <div className="animate-fadeUp">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-violet/10 px-3.5 py-1.5 text-xs font-semibold text-brand-violet">
          <Sparkles className="h-3.5 w-3.5" /> All-in-One Platform
        </span>

        <h1 className="mt-5 font-display text-[2.65rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
          Games, Tools &amp; Knowledge for{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">Everyone</span>
        </h1>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
          Play exciting web games, use useful online tools, and read insightful blog posts — all in one place.
        </p>

        <dl className="mt-8 flex flex-wrap gap-8">
          {platformStats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-2xl font-extrabold text-ink">{stat.value}</dd>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </dl>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/games"
            className="flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover"
          >
            <Gamepad2 className="h-4 w-4" /> Explore Games
          </Link>
          <Link
            href="/tools"
            className="flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink/20"
          >
            <Wrench className="h-4 w-4" /> Browse Tools
          </Link>
        </div>
      </div>

      {/* Right: visual */}
      <div className="relative h-[340px] rounded-xl2 bg-hero-gradient sm:h-[420px] lg:h-[460px]">
        <div className="absolute inset-0 overflow-hidden rounded-xl2">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/40 blur-2xl" />
          <div className="absolute -right-6 bottom-6 h-48 w-48 rounded-full bg-brand-pink/20 blur-2xl" />
        </div>

        {/* floating tile: star */}
        <div className="absolute left-[8%] top-[14%] grid h-16 w-16 animate-floaty place-items-center rounded-2xl bg-brand-violet text-white shadow-cardHover [animation-delay:0.2s]">
          <Sparkles className="h-7 w-7" />
        </div>

        {/* floating tile: card/browser */}
        <div className="absolute left-[26%] top-[6%] w-44 animate-floaty rounded-2xl bg-white p-3.5 shadow-cardHover [animation-delay:0.6s] sm:w-56">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-blue" />
            <span className="h-2 w-2 rounded-full bg-line" />
          </div>
          <div className="mt-2.5 h-2.5 w-3/4 rounded-full bg-line" />
          <div className="mt-1.5 h-2.5 w-1/2 rounded-full bg-line" />
        </div>

        {/* floating tile: bar chart */}
        <div className="absolute right-[6%] top-[18%] grid h-16 w-16 animate-floaty place-items-center rounded-2xl bg-brand-pink text-white shadow-cardHover [animation-delay:0.9s]">
          <BarChart3 className="h-7 w-7" />
        </div>

        {/* floating tile: tools */}
        <div className="absolute bottom-[12%] left-[10%] grid h-16 w-16 animate-floaty place-items-center rounded-2xl bg-white text-brand-blue shadow-cardHover [animation-delay:0.4s]">
          <Wrench className="h-6 w-6" />
        </div>

        {/* center: controller */}
        <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] bg-ink text-white shadow-cardHover sm:h-40 sm:w-40">
          <Gamepad2 className="h-14 w-14 sm:h-16 sm:w-16" strokeWidth={1.6} />
        </div>

        {/* floating tile: play */}
        <div className="absolute bottom-[10%] right-[8%] flex animate-floaty items-center gap-2 rounded-2xl bg-white/90 px-3.5 py-3 shadow-cardHover [animation-delay:1.1s]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-gradient text-white">
            <Play className="h-3.5 w-3.5 fill-current" />
          </span>
          <Rows3 className="h-4 w-4 text-muted" />
        </div>
      </div>
    </section>
  );
}
