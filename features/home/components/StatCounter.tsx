"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Gamepad2, Wrench, FileText, Users, type LucideIcon } from "lucide-react";
import type { Stat } from "@/constants/stats";

const ICONS: Record<Stat["icon"], LucideIcon> = {
  gamepad: Gamepad2,
  wrench: Wrench,
  "file-text": FileText,
  users: Users,
};

export function StatCounter({ stat, delay = 0 }: { stat: Stat; delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = React.useState(0);
  const Icon = ICONS[stat.icon];

  React.useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      setCount(stat.value);
      return;
    }

    const durationMs = 1200;
    const startTime = performance.now() + delay;
    let frame: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out-quint for a snappy finish
      const eased = 1 - Math.pow(1 - progress, 5);
      setCount(Math.round(eased * stat.value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, prefersReducedMotion, stat.value, delay]);

  return (
    <div
      ref={ref}
      className="flex items-center gap-3 rounded-card-lg border border-border bg-white p-4 shadow-soft"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-card bg-primary-50">
        <Icon className="size-5 text-primary-600" />
      </span>
      <div>
        <p className="text-2xl font-extrabold tabular-nums tracking-tight text-ink">
          {count}
          {stat.suffix}
        </p>
        <p className="text-xs font-medium text-ink-muted">{stat.label}</p>
      </div>
    </div>
  );
}
