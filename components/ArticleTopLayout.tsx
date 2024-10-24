"use client";

import CalendarToday from "@mui/icons-material/CalendarToday";
import LinkIcon from "@mui/icons-material/Link";
import MenuBook from "@mui/icons-material/MenuBook";
import Public from "@mui/icons-material/Public";

import { useMemo } from "react";

import Link from "@/components/ViewTransitionLink";

import legals, { type LegalItem } from "@/data/legals";
import posts, { type PostItem } from "@/data/posts";
import projects, { type ProjectItem } from "@/data/projects";

type ContentItem = PostItem | ProjectItem | LegalItem;

export interface ArticleTopLayoutProps {
  collection: "blog" | "projects" | "legals";
  slug: string;
}

const readingTime = (html: string) => {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
};

export default function ArticleTopLayout({ collection, slug }: ArticleTopLayoutProps) {
  const contents = useMemo(
    () => ("blog" === collection ? posts : "projects" === collection ? projects : legals),
    [collection, posts, projects, legals]
  );

  const entry: ContentItem | undefined = useMemo(
    () => contents.find(({ metadata }) => metadata.slug === slug),
    [contents, slug]
  );

  return (
    entry && (
      <div>
        <Link
          href={`/${entry.metadata.collection}`}
          className="group w-fit p-1.5 gap-1.5 text-sm flex items-center border rounded hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-current group-hover:stroke-black group-hover:dark:stroke-white"
          >
            <line
              x1="19"
              y1="12"
              x2="5"
              y2="12"
              className="scale-x-0 group-hover:scale-x-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
            />
            <polyline
              points="12 19 5 12 12 5"
              className="translate-x-1 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
            />
          </svg>
          <div className="w-full group-hover:text-black group-hover:dark:text-white transition-colors duration-300 ease-in-out">
            Back to {entry.metadata.collection}
          </div>
        </Link>
        <div className="flex flex-wrap text-sm uppercase mt-12 gap-3 opacity-75">
          <div className="flex items-center gap-2">
            <CalendarToday className="size-4 stroke-current" />

            {entry.metadata.created &&
              Intl.DateTimeFormat(undefined, {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }).format(new Date(entry.metadata.created))}
          </div>
          <div className="flex items-center gap-2">
            <MenuBook className="size-4 stroke-current" />
            {entry.metadata.content && readingTime(entry.metadata.content)}
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-black dark:text-white mt-2">
          {entry.metadata.title}
        </h1>
        <div className="mt-1">{entry.metadata.description}</div>
        {(entry.metadata.demo || entry.metadata.repo) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.metadata.demo && (
              <Link
                href={entry.metadata.demo}
                target="_blank"
                className="group flex gap-2 items-center px-3 py-1.5 truncate rounded text-xs md:text-sm lg:text-base border border-black/25 dark:border-white/25 hover:bg-black/5 hover:dark:bg-white/15 blend"
              >
                <Public className="size-4" />
                <span className="text-current group-hover:text-black group-hover:dark:text-white blend">
                  See Demo
                </span>
              </Link>
            )}
            {entry.metadata.repo && (
              <Link
                href={entry.metadata.repo}
                target="_blank"
                className="group flex gap-2 items-center px-3 py-1.5 truncate rounded text-xs md:text-sm lg:text-base border border-black/25 dark:border-white/25 hover:bg-black/5 hover:dark:bg-white/15 blend"
              >
                <LinkIcon className="size-4" />
                <span className="text-current group-hover:text-black group-hover:dark:text-white blend">
                  See Repository
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    )
  );
}
