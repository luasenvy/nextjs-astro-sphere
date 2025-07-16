"use client";

import Article from "@mui/icons-material/Article";
import CalendarToday from "@mui/icons-material/CalendarToday";

import LinkIcon from "@mui/icons-material/Link";
import MenuBook from "@mui/icons-material/MenuBook";
import Public from "@mui/icons-material/Public";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { ReadTimeResults } from "reading-time";
import ArrowDown from "@/components/icons/ArrowDown";
import Link, { withTransitionTo } from "@/components/ViewTransitionLink";
import type { PostItem, PostType } from "@/lib/db";
import { cn } from "@/lib/utils";

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
          className={cn(
            "group flex w-fit items-center gap-1.5 rounded border border-black/15 p-1.5 text-sm transition-colors duration-300 ease-in-out hover:bg-black/5 dark:border-white/20 hover:dark:bg-white/10",
            { hidden: type === "legals" },
          )}
          onClick={() => withTransitionTo(router, `/${type}?${returnToSearchParams}`)}
        >
          <ArrowDown className="stroke-current group-hover:stroke-black group-hover:dark:stroke-white" />
          <div className="w-full transition-colors duration-300 ease-in-out group-hover:text-black group-hover:dark:text-white">
            Back to {type}
          </div>
        </Link>

        <div className="my-6 flex flex-col flex-wrap gap-3 text-sm uppercase opacity-75 sm:flex-row">
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

        <h1 className="my-6 font-semibold text-3xl text-black dark:text-white">{curr.title}</h1>

        {/* <div className="mt-1">{curr.description}</div> */}
        {(curr.demo || curr.repo) && (
          <div className="flex flex-wrap gap-2">
            {curr.demo && (
              <Link
                href={curr.demo}
                target="_blank"
                className="blend group flex items-center gap-2 truncate rounded border border-black/25 px-3 py-1.5 text-xs hover:bg-black/5 md:text-sm lg:text-base dark:border-white/25 hover:dark:bg-white/15"
              >
                <Public className="size-4" />
                <span className="blend text-current group-hover:text-black group-hover:dark:text-white">
                  See Demo
                </span>
              </Link>
            )}
            {curr.repo && (
              <Link
                href={curr.repo}
                target="_blank"
                className="blend group flex items-center gap-2 truncate rounded border border-black/25 px-3 py-1.5 text-xs hover:bg-black/5 md:text-sm lg:text-base dark:border-white/25 hover:dark:bg-white/15"
              >
                <LinkIcon className="size-4" />
                <span className="blend text-current group-hover:text-black group-hover:dark:text-white">
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
