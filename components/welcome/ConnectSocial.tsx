"use client";

import { motion } from "framer-motion";

import { Fragment } from "react";

import Link from "@/components/ViewTransitionLink";

export interface ConnectSocialProps {
  social: Array<{ name: string; href: string; text: string }>;
}

export default function ConnectSocial({ social }: ConnectSocialProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.56, ease: "easeInOut" }}
    >
      <p className="font-semibold text-black dark:text-white">Let's Connect</p>
      <p>Reach out to me via email or on social media.</p>
      <div className="mt-4 grid auto-cols-min grid-cols-4 gap-y-2">
        {social.map(({ name, href, text }, i) => (
          <Fragment key={`social-${i}`}>
            <div className="col-span-1 flex items-center gap-1">
              <span className="truncate whitespace-nowrap">{name}</span>
            </div>
            <div className="col-span-3 truncate">
              <Link
                href={href}
                target="_blank"
                className="blend group col-span-3 flex w-fit items-center gap-1 text-black underline decoration-[.5px] decoration-black/25 underline-offset-2 hover:decoration-black dark:text-white dark:decoration-white/50 dark:hover:decoration-white"
              >
                <span className="blend text-black/75 group-hover:text-black dark:text-white/75 group-hover:dark:text-white">
                  {text}
                </span>
              </Link>
            </div>
          </Fragment>
        ))}
      </div>
    </motion.section>
  );
}
