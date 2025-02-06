"use client";

import Close from "@mui/icons-material/Close";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import Menu from "@mui/icons-material/Menu";
import RssFeed from "@mui/icons-material/RssFeed";
import Search from "@mui/icons-material/Search";

import classnames from "classnames";

import debounce from "lodash/debounce";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { useLayoutEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import Container from "@/components/Container";
import Link from "@/components/ViewTransitionLink";

import type { LogoType, SiteType } from "@/config";

import { getDrawer, toggleDrawer } from "@/lib/drawer";
import { getTheme, toggleTheme } from "@/lib/theme";

import styles from "@/styles/header.module.css";

export const nav = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Careers",
    href: "/careers",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Projects",
    href: "/projects",
  },
];

export interface HeaderProps {
  logo: LogoType;
  site: SiteType;
}

export default function Header({ site, logo }: HeaderProps) {
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(true); // default is dark
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const subpath = pathname.match(/[^/]+/g);

  const isMatched = (href: string) => pathname === href || "/" + subpath?.[0] === href;

  const setDocumentDark = (isDark: boolean) => {
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  };

  useLayoutEffect(() => {
    const theme = getTheme();
    setDocumentDark(theme === "dark" || !theme); // default is dark
    setShowDrawer(getDrawer() === "true");

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") setDocumentDark(e.newValue === "dark");
      else if (e.key === "drawer") setShowDrawer(e.newValue === "true");
    };

    window.addEventListener("storage", handleStorage);

    const handleScroll = debounce(() => setScrolled(window.scrollY > 0), 100);

    document.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorage);
    };
  }, [headerRef, setScrolled]);

  return (
    <header
      ref={headerRef}
      id="header"
      className={classnames(styles.header, "fixed top-0 z-50 h-16 w-full", {
        [styles["not-scrolled"]]: !scrolled,
        [styles["scrolled"]]: scrolled && !dark,
        [styles["scrolled-dark"]]: scrolled && dark,
      })}
    >
      <Container size="md">
        <div className="relative h-full w-full">
          <div className="absolute left-0 top-1/2 flex -translate-y-1/2 gap-1 font-semibold">
            <Link
              href="/"
              className="flex gap-1 text-current transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white"
            >
              {logo.light && (
                <Image
                  width={25}
                  height={32}
                  alt="brand"
                  className="dark:hidden"
                  src={logo.light}
                />
              )}
              {logo.dark && (
                <Image
                  width={25}
                  height={32}
                  alt="brand"
                  className="hidden dark:block"
                  src={logo.dark}
                />
              )}
              <div>{site.name}</div>
            </Link>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <nav className="hidden items-center justify-center gap-1 text-sm md:flex">
              {nav.map(({ name, href }, i) => (
                <Link
                  key={`link-${i}`}
                  href={href}
                  className={twMerge(
                    classnames(
                      "flex h-8 items-center justify-center rounded-full px-3 text-current transition-colors duration-300 ease-in-out",
                      {
                        "bg-black text-white dark:bg-white dark:text-black": isMatched(href),
                        "hover:bg-black/5 hover:text-black dark:hover:bg-white/20 dark:hover:text-white":
                          !isMatched(href),
                      }
                    )
                  )}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="buttons absolute right-0 top-1/2 flex -translate-y-1/2 gap-1">
            <Link
              href="/search"
              aria-label="Search blog posts and projects on this site"
              className={twMerge(
                classnames(
                  "hidden size-9 items-center justify-center rounded-full border border-black/10 bg-transparent stroke-current p-2 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:stroke-black dark:border-white/25 dark:hover:bg-white/20 hover:dark:stroke-white md:flex",
                  {
                    "pointer-events-none bg-black text-white dark:bg-white dark:text-black":
                      pathname === "/search" || "/" + subpath?.[0] === "/search",
                  }
                )
              )}
            >
              <Search className="block size-full" />
            </Link>

            <Link
              href="/api/feed/rss2"
              target="_blank"
              aria-label={`Rss feed for ${site.name}`}
              className={twMerge(
                classnames(
                  "hidden size-9 items-center justify-center rounded-full border border-black/10 bg-transparent stroke-current p-2 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:stroke-black dark:border-white/25 dark:hover:bg-white/20 hover:dark:stroke-white md:flex"
                )
              )}
            >
              <RssFeed className="block size-full" />
            </Link>

            <button
              id="header-theme-button"
              aria-label="Toggle light and dark theme"
              className={twMerge(
                classnames(
                  "hidden size-9 items-center justify-center rounded-full border border-black/10 bg-transparent stroke-current p-2 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:stroke-black dark:border-white/25 dark:hover:bg-white/20 hover:dark:stroke-white md:flex"
                )
              )}
              onClick={() => toggleTheme()}
            >
              <LightMode className="block size-full dark:hidden" />
              <DarkMode className="hidden size-full dark:block" />
            </button>

            <button
              aria-label="Toggle drawer open and closed"
              className={twMerge(
                classnames(
                  "flex size-9 items-center justify-center rounded-full border border-black/10 bg-transparent stroke-current p-2 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:stroke-black dark:border-white/25 dark:hover:bg-white/20 hover:dark:stroke-white md:hidden"
                )
              )}
              onClick={() => toggleDrawer()}
            >
              <Menu
                id="drawer-open"
                className={classnames("size-full", { block: !showDrawer, hidden: showDrawer })}
              />

              <Close
                id="drawer-close"
                className={classnames("size-full", { block: showDrawer, hidden: !showDrawer })}
              />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
