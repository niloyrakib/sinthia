"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, Wrench } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { SITE } from "@/constants/design-tokens";
import { HeroSearch } from "./HeroSearch";
import { Statistics } from "./Statistics";
import { HeroIllustration } from "./HeroIllustration";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pt-16 lg:pb-24 lg:pt-20">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={item}
            className="rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700"
          >
            Your Ultimate Hub for Games, Tools &amp; Knowledge
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]"
          >
            Play. Solve. Learn.
            <br />
            All in{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              One Place.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-md text-base text-ink-muted sm:text-lg"
          >
            {SITE.description}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Link
              href="/games"
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className: "gap-2",
              })}
            >
              <Gamepad2 className="size-4" />
              Explore Games
            </Link>
            <Link
              href="/tools"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "gap-2",
              })}
            >
              <Wrench className="size-4" />
              Browse Tools
            </Link>
          </motion.div>

          <motion.div variants={item} className="w-full">
            <HeroSearch />
          </motion.div>

          <motion.div variants={item} className="w-full">
            <Statistics />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="hidden lg:block"
        >
          <HeroIllustration />
        </motion.div>
      </div>
    </section>
  );
}
