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
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {prev ? (
          <Link
            href={`/${type}/${prev.slug}?${returnToSearchParams}`}
            className="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 blend"
          >
            <div className="order-2 w-full h-full group-hover:text-black group-hover:dark:text-white blend">
              <div className="flex flex-wrap gap-2">
                <div className="text-sm uppercase">Prev</div>
              </div>
              <div className="font-semibold mt-3 text-black dark:text-white">{prev.title}</div>
            </div>
            <ArrowDown className="stroke-current group-hover:stroke-black group-hover:dark:stroke-white rotate-270" />
          </Link>
        ) : (
          <div className="invisible"></div>
        )}

        {next ? (
          <Link
            href={`/${type}/${next.slug}?${returnToSearchParams}`}
            className="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
          >
            <div className="w-full h-full text-right group-hover:text-black group-hover:dark:text-white blend">
              <div className="text-sm uppercase">Next</div>
              <div className="font-semibold mt-3 text-black dark:text-white">{next.title}</div>
            </div>
            <ArrowDown className="stroke-current group-hover:stroke-black group-hover:dark:stroke-white rotate-180" />
          </Link>
        ) : (
          <div className="invisible"></div>
        )}
      </motion.div>
    </section>
  );
}
