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
      className="absolute h-full w-full flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.56, ease: "easeInOut", delay: 0.15 }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="p-5 text-center">
          <p className="text-lg md:text-xl lg:text-2xl font-semibold opacity-75">{caption}</p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-black dark:text-white">
            {title}
          </p>
          <p className="text-sm md:text-base lg:text-lg opacity-75">{subtitle}</p>
          <div id="ctaButtons" className="flex flex-wrap gap-4 justify-center mt-5">
            <Link
              href="/posts"
              className="py-2 px-4 rounded truncate text-xs md:text-sm lg:text-base bg-black dark:bg-white text-white dark:text-black hover:opacity-75 blend"
            >
              {primaryLinkText}
            </Link>
            <Link
              href="/careers"
              className="py-2 px-4 truncate rounded text-xs md:text-sm lg:text-base border border-black/25 dark:border-white/25 hover:bg-black/5 hover:dark:bg-white/15 blend"
            >
              {secondaryLinkText}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
