import { ShieldCheck, Zap, Heart, Users } from "lucide-react";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    body: "All tools and games are safe to use.",
    bg: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    body: "Optimized for speed and performance.",
    bg: "bg-amber-100 text-amber-600",
  },
  {
    icon: Heart,
    title: "Free to Use",
    body: "Most tools and games are completely free.",
    bg: "bg-rose-100 text-rose-600",
  },
  {
    icon: Users,
    title: "For Everyone",
    body: "Designed for all ages and skill levels.",
    bg: "bg-blue-100 text-blue-600",
  },
];

export default function BenefitsSection() {
  return (
    <section className="border-t border-line bg-surface/60">
      <div className="container-page grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <div key={b.title} className="flex items-start gap-3.5">
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${b.bg}`}>
              <b.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-[15px] font-bold text-ink">{b.title}</h3>
              <p className="mt-0.5 text-sm text-muted">{b.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
