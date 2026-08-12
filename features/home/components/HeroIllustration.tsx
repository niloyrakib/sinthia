"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Gamepad2, Wrench, FileText } from "lucide-react";

const TILE_COLORS = [
  "bg-primary-100",
  "bg-secondary-100",
  "bg-emerald-100",
  "bg-amber-100",
  "bg-primary-100",
  "bg-secondary-100",
  "bg-amber-100",
  "bg-emerald-100",
];

export function HeroIllustration() {
  const prefersReducedMotion = useReducedMotion();

  const floatTransition = (delay: number) =>
    prefersReducedMotion
      ? { duration: 0 }
      : {
          duration: 3.2,
          delay,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut" as const,
        };

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Ambient gradient glow behind the "device" */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-90 rounded-full bg-gradient-to-br from-primary-100 via-secondary-100 to-transparent blur-3xl"
      />

      {/* Browser / device frame */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-card-lg border border-border bg-white shadow-soft-xl"
      >
        <div className="flex items-center gap-1.5 border-b border-border bg-primary-50/40 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-danger/70" />
          <span className="size-2.5 rounded-full bg-warning/70" />
          <span className="size-2.5 rounded-full bg-success/70" />
          <span className="ml-3 text-xs font-medium text-ink-muted">sinthia.top</span>
        </div>
        <div className="grid grid-cols-4 gap-2.5 p-4">
          {TILE_COLORS.map((color, i) => (
            <div key={i} className={`aspect-square rounded-card ${color}`} />
          ))}
        </div>
        <div className="space-y-2 px-4 pb-4">
          <div className="h-2.5 w-3/4 rounded-full bg-border" />
          <div className="h-2.5 w-1/2 rounded-full bg-border" />
        </div>
      </motion.div>

      {/* Floating game controller badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: prefersReducedMotion ? 0 : [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.3 },
          scale: { duration: 0.5, delay: 0.3 },
          y: floatTransition(0.3),
        }}
        className="absolute -left-6 top-10 flex items-center gap-2 rounded-card-lg border border-border bg-white p-3 shadow-soft-lg sm:-left-10"
      >
        <span className="flex size-9 items-center justify-center rounded-card bg-primary-100">
          <Gamepad2 className="h-[18px] w-[18px] text-primary-600" />
        </span>
      </motion.div>

      {/* Floating tools badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: prefersReducedMotion ? 0 : [0, 10, 0],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.5 },
          scale: { duration: 0.5, delay: 0.5 },
          y: floatTransition(0.5),
        }}
        className="absolute -right-4 top-1/3 flex items-center gap-2 rounded-card-lg border border-border bg-white p-3 shadow-soft-lg sm:-right-8"
      >
        <span className="flex size-9 items-center justify-center rounded-card bg-secondary-100">
          <Wrench className="size-4 text-secondary-600" />
        </span>
      </motion.div>

      {/* Floating article badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: prefersReducedMotion ? 0 : [0, -8, 0],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.7 },
          scale: { duration: 0.5, delay: 0.7 },
          y: floatTransition(0.7),
        }}
        className="absolute -bottom-5 left-8 flex items-center gap-2 rounded-card-lg border border-border bg-white p-3 shadow-soft-lg"
      >
        <span className="flex size-9 items-center justify-center rounded-card bg-emerald-100">
          <FileText className="size-4 text-success" />
        </span>
      </motion.div>
    </div>
  );
}
