"use client";

import { motion } from "framer-motion";

import { useSearchParams } from "next/navigation";

import { useMemo } from "react";

import ArrowDown from "./icons/ArrowDown";

import Link from "@/components/ViewTransitionLink";
import type { PostItem, PostType } from "@/lib/db";

export interface ArticleBottomLayoutProps {
  type: PostType;
  component: React.ReactNode;
  prev?: PostItem;
  next?: PostItem;
}

export default function ArticleBottomLayout({
  component,
  prev,
  next,
  type,
}: ArticleBottomLayoutProps) {
  const searchParams = useSearchParams();

  const returnToSearchParams = useMemo(
    () =>
      new URLSearchParams({
        filter: (searchParams.get("filter") as string) ?? undefined,
        page: (searchParams.get("page") as string) ?? undefined,
      }),
    [searchParams]
  );

  return (
    <section>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.56, ease: "easeInOut", delay: 0.08 * 1 }}
      >
        {component}
      </motion.article>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.56, ease: "easeInOut", delay: 0.08 * 2 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/${type}/${prev.slug}?${returnToSearchParams}`}
            className="blend group flex items-center gap-3 rounded-lg border border-black/15 p-4 hover:bg-black/5 dark:border-white/20 hover:dark:bg-white/10"
          >
            <div className="blend order-2 h-full w-full group-hover:text-black group-hover:dark:text-white">
              <div className="flex flex-wrap gap-2">
                <div className="text-sm uppercase">Prev</div>
              </div>
              <div className="mt-3 font-semibold text-black dark:text-white">{prev.title}</div>
            </div>
            <ArrowDown className="rotate-270 stroke-current group-hover:stroke-black group-hover:dark:stroke-white" />
          </Link>
        ) : (
          <div className="invisible"></div>
        )}

        {next ? (
          <Link
            href={`/${type}/${next.slug}?${returnToSearchParams}`}
            className="group flex items-center gap-3 rounded-lg border border-black/15 p-4 transition-colors duration-300 ease-in-out hover:bg-black/5 dark:border-white/20 hover:dark:bg-white/10"
          >
            <div className="blend h-full w-full text-right group-hover:text-black group-hover:dark:text-white">
              <div className="text-sm uppercase">Next</div>
              <div className="mt-3 font-semibold text-black dark:text-white">{next.title}</div>
            </div>
            <ArrowDown className="rotate-180 stroke-current group-hover:stroke-black group-hover:dark:stroke-white" />
          </Link>
        ) : (
          <div className="invisible"></div>
        )}
      </motion.div>
    </section>
  );
}
