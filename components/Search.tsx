"use client";

import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

import { useState } from "react";

import SearchResult from "./SearchResult";

import type { PostItem } from "@/lib/db";

export interface SearchProps {
  posts: Array<PostItem>;
  projects: Array<PostItem>;
  legals: Array<PostItem>;
}

export default function Search({ posts, projects, legals }: SearchProps) {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          name="search"
          type="text"
          value={query}
          onInput={(e: React.FormEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="What are you looking for?"
          className="w-full rounded border border-black/10 bg-black/5 px-2.5 py-1.5 pl-10 text-black outline-none focus:border-black dark:border-white/20 dark:bg-white/15 dark:text-white focus:dark:border-white"
        />
        <SearchIcon className="absolute left-1.5 top-1/2 size-6 -translate-y-1/2 stroke-current" />
      </div>

      {query.length > 1 && (
        <div className="mt-12">
          <div className="mb-2 text-sm uppercase">Results for {`"${query}"`}</div>
          <motion.ul
            variants={{
              hidden: { opacity: 0, y: 20 },
              block: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            animate="block"
            className="flex flex-col gap-3"
          >
            <>
              <SearchResult label="blog" posts={posts} query={query} />
              <SearchResult label="projects" posts={projects} query={query} />
              <SearchResult label="legals" posts={legals} query={query} />
            </>
          </motion.ul>
        </div>
      )}
    </div>
  );
}
