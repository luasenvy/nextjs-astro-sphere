"use client";

import { motion } from "framer-motion";

import Link from "@/components/ViewTransitionLink";

export interface WelcomeHeroProps {
  caption: string;
  title: string;
  subtitle: string;
  primaryLinkText?: string;
  secondaryLinkText?: string;
  introduce?: string;
}

export default function WelcomeHero({
  caption,
  title,
  subtitle,
  primaryLinkText,
  secondaryLinkText,
}: WelcomeHeroProps) {
  return (
    <motion.div
      className="absolute flex h-full w-full items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.56, ease: "easeInOut", delay: 0.15 }}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="p-5 text-center">
          <p className="text-lg font-semibold opacity-75 md:text-xl lg:text-2xl">{caption}</p>
          <p className="text-2xl font-bold uppercase text-black dark:text-white md:text-3xl lg:text-4xl">
            {title}
          </p>
          <p className="text-sm opacity-75 md:text-base lg:text-lg">{subtitle}</p>
          <div id="ctaButtons" className="mt-5 flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="blend truncate rounded bg-black px-4 py-2 text-xs text-white hover:opacity-75 dark:bg-white dark:text-black md:text-sm lg:text-base"
            >
              {primaryLinkText}
            </Link>
            <Link
              href="/careers"
              className="blend truncate rounded border border-black/25 px-4 py-2 text-xs hover:bg-black/5 dark:border-white/25 hover:dark:bg-white/15 md:text-sm lg:text-base"
            >
              {secondaryLinkText}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
