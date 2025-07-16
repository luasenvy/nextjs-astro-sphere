"use client";

import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import RssFeed from "@mui/icons-material/RssFeed";
import Search from "@mui/icons-material/Search";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import Link from "@/components/ViewTransitionLink";
import { getDrawer, toggleDrawer } from "@/lib/drawer";
import { toggleTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { nav } from "./Header";

export default function Drawer() {
  const pathname = usePathname();
  const subpath = pathname.match(/[^/]+/g);

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  useLayoutEffect(() => {
    setShowDrawer(getDrawer() === "true");

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "drawer") setShowDrawer(e.newValue === "true");
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 flex h-0 flex-col items-center justify-center overflow-hidden bg-neutral-100 transition-[height] duration-300 ease-in-out md:hidden dark:bg-neutral-900",
        { "h-full": showDrawer },
      )}
    >
      <nav className="flex flex-col items-center space-y-2">
        {nav.map(({ name, href }, i) => (
          <Link
            key={`link-${i}`}
            href={href}
            className={cn(
              "flex items-center justify-center rounded-full px-3 py-1 text-current transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black dark:hover:bg-white/20 dark:hover:text-white",
              {
                "pointer-events-none bg-black text-white dark:bg-white dark:text-black":
                  pathname === href || "/" + subpath?.[0] === href,
              },
            )}
            onClick={() => toggleTheme()}
          >
            {name}
          </Link>
        ))}
      </nav>

      <div className="mt-5 flex gap-1">
        <Link
          href="/search"
          aria-label="Search blog posts and projects on this site"
          className={cn(
            "size-9 items-center justify-center rounded-full border border-black/10 bg-transparent stroke-current p-2 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:stroke-black dark:border-white/25 dark:hover:bg-white/20 hover:dark:stroke-white",
            {
              "pointer-events-none bg-black text-white dark:bg-white dark:text-black":
                pathname === "/search" || "/" + subpath?.[0] === "search",
            },
          )}
          onClick={() => toggleDrawer()}
        >
          <Search className="block size-full" />
        </Link>

        <Link
          href="/api/feed/rss2"
          target="_blank"
          aria-label="rss feed"
          className="size-9 items-center justify-center rounded-full border border-black/10 bg-transparent stroke-current p-2 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:stroke-black dark:border-white/25 dark:hover:bg-white/20 hover:dark:stroke-white"
          onClick={() => toggleDrawer()}
        >
          <RssFeed className="block size-full" />
        </Link>

        <button
          id="drawer-theme-button"
          aria-label={`Toggle light and dark theme`}
          className="size-9 items-center justify-center rounded-full border border-black/10 bg-transparent stroke-current p-2 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:stroke-black dark:border-white/25 dark:hover:bg-white/20 hover:dark:stroke-white"
          onClick={() => toggleTheme()}
        >
          <LightMode className="block size-full dark:hidden" />
          <DarkMode className="hidden size-full dark:block" />
        </button>
      </div>
    </div>
  );
}
