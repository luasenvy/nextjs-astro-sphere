"use client";

import Article from "@mui/icons-material/Article";
import CalendarToday from "@mui/icons-material/CalendarToday";

import LinkIcon from "@mui/icons-material/Link";
import MenuBook from "@mui/icons-material/MenuBook";
import Public from "@mui/icons-material/Public";
import classnames from "classnames";

import { useRouter, useSearchParams } from "next/navigation";

import { useMemo } from "react";

import type { ReadTimeResults } from "reading-time";

import Link, { withTransitionTo } from "@/components/ViewTransitionLink";
import ArrowDown from "@/components/icons/ArrowDown";

import type { PostItem, PostType } from "@/lib/db";

export interface ArticleTopLayoutProps {
  curr: PostItem;
  type: PostType;
  readingTime?: ReadTimeResults;
}

export default function ArticleTopLayout({ curr, type, readingTime }: ArticleTopLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnToSearchParams = useMemo(() => {
    const searchParams = new URLSearchParams();
    if (searchParams.get("filter"))
      searchParams.append("filter", searchParams.get("filter") as string);
    if (searchParams.get("page")) searchParams.append("page", searchParams.get("page") as string);
    return searchParams;
  }, [searchParams]);

  return (
    curr && (
      <div>
        <Link
          href={`/${type}?${returnToSearchParams}`}
          className={classnames(
            "group w-fit p-1.5 gap-1.5 text-sm flex items-center border rounded hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out",
            {
              hidden: type === "legals",
            }
          )}
          onClick={() => withTransitionTo(router, `/${type}?${returnToSearchParams}`)}
        >
          <ArrowDown className="stroke-current group-hover:stroke-black group-hover:dark:stroke-white" />
          <div className="w-full group-hover:text-black group-hover:dark:text-white transition-colors duration-300 ease-in-out">
            Back to {type}
          </div>
        </Link>

        <div className="flex flex-col sm:flex-row flex-wrap text-sm uppercase gap-3 opacity-75 my-6">
          <div className="flex items-center gap-2">
            <CalendarToday className="size-4" />

            {curr.created &&
              Intl.DateTimeFormat(undefined, {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }).format(new Date(curr.created))}
          </div>
          {readingTime && (
            <>
              <div className="flex items-center gap-2">
                <MenuBook className="size-4" />
                {new Intl.NumberFormat().format(Math.ceil(readingTime.minutes))} min read
              </div>
              <div className="flex items-center gap-2">
                <Article className="size-4" />
                {new Intl.NumberFormat().format(readingTime.words)} words
              </div>
            </>
          )}
        </div>

        <h1 className="text-3xl font-semibold text-black dark:text-white my-6">{curr.title}</h1>

        {/* <div className="mt-1">{curr.description}</div> */}
        {(curr.demo || curr.repo) && (
          <div className="flex flex-wrap gap-2">
            {curr.demo && (
              <Link
                href={curr.demo}
                target="_blank"
                className="group flex gap-2 items-center px-3 py-1.5 truncate rounded text-xs md:text-sm lg:text-base border border-black/25 dark:border-white/25 hover:bg-black/5 hover:dark:bg-white/15 blend"
              >
                <Public className="size-4" />
                <span className="text-current group-hover:text-black group-hover:dark:text-white blend">
                  See Demo
                </span>
              </Link>
            )}
            {curr.repo && (
              <Link
                href={curr.repo}
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
