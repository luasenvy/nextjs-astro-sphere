"use client";

import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

import { useMemo } from "react";

import ArrowCard from "@/components/ArrowCard";
import Link, { withTransitionTo } from "@/components/ViewTransitionLink";
import type { PostItem, PostType } from "@/lib/db";

export interface RecentPostsProps {
  posts: Array<PostItem>;
  type: PostType;
}

export default function RecentPosts({ posts, type }: RecentPostsProps) {
  const router = useRouter();

  const label = useMemo(() => ("blog" === type ? "posts" : type), [type]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.56, ease: "easeInOut" }}
    >
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="font-semibold text-black dark:text-white">Recent {label}</p>
          <Link
            href="/blog"
            className="w-fit col-span-3 group flex gap-1 items-center underline decoration-[.5px] decoration-black/25 dark:decoration-white/50 hover:decoration-black dark:hover:decoration-white text-black dark:text-white underline-offset-2 blend"
          >
            <span className="text-black/75 dark:text-white/75 group-hover:text-black group-hover:dark:text-white blend">
              All {label}
            </span>
          </Link>
        </div>
        <motion.ul
          variants={{
            hidden: { opacity: 0, y: 20 },
            block: { opacity: 1, y: 0, transition: { staggerChildren: 0.16 } },
          }}
          initial="hidden"
          animate="block"
          className="space-y-4"
        >
          {posts.slice(0, 3).map((post, i) => (
            <motion.li
              key={`post-${i}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                block: { opacity: 1, y: 0, transition: { duration: 0.56 } },
              }}
            >
              <ArrowCard
                post={post}
                type="blog"
                onSelect={() => withTransitionTo(router, `/${type}/${post.slug}`)}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
