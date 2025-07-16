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
          <p className="font-semibold text-lg opacity-75 md:text-xl lg:text-2xl">{caption}</p>
          <p className="font-bold text-2xl text-black uppercase md:text-3xl lg:text-4xl dark:text-white">
            {title}
          </p>
          <p className="text-sm opacity-75 md:text-base lg:text-lg">{subtitle}</p>
          <div id="ctaButtons" className="mt-5 flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="blend truncate rounded bg-black px-4 py-2 text-white text-xs hover:opacity-75 md:text-sm lg:text-base dark:bg-white dark:text-black"
            >
              {primaryLinkText}
            </Link>
            <Link
              href="/careers"
              className="blend truncate rounded border border-black/25 px-4 py-2 text-xs hover:bg-black/5 md:text-sm lg:text-base dark:border-white/25 hover:dark:bg-white/15"
            >
              {secondaryLinkText}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
