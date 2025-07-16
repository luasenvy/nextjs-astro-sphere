"use client";

import Image from "next/image";
import { createElement } from "react";

import Container from "@/components/Container";
import ArrowDown from "@/components/icons/ArrowDown";
import Link from "@/components/ViewTransitionLink";

import type { AuthorType, LogoType, SiteType, SocialType } from "@/config";

export interface FooterProps {
  site: SiteType;
  social: SocialType;
  author: AuthorType;
  logo: LogoType;
}

export default function Footer({ site, author, social, logo }: FooterProps) {
  return (
    <footer className="relative bg-white dark:bg-black">
      <section className="py-5">
        <Container size="md">
          <div className="flex items-center justify-center sm:justify-end">
            <button
              id="back-to-top"
              aria-label="Back to top of page"
              className="group flex w-fit items-center gap-1.5 rounded border border-black/15 p-1.5 text-sm transition-colors duration-300 ease-in-out hover:bg-black/5 dark:border-white/20 hover:dark:bg-white/10"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowDown className="rotate-90 stroke-current group-hover:stroke-black group-hover:dark:stroke-white" />

              <div className="w-full transition-colors duration-300 ease-in-out group-hover:text-black group-hover:dark:text-white">
                Back to top
              </div>
            </button>
          </div>
        </Container>
      </section>

      <section className="overflow-hidden whitespace-nowrap border-black/10 border-t py-5 dark:border-white/25">
        <Container size="md">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col items-center sm:items-start">
              <Link
                href="/"
                className="flex w-fit gap-1 font-semibold text-current transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white"
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
                {site.name}
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 sm:justify-end">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>
              All systems normal
            </div>
          </div>
        </Container>
      </section>

      <section className="overflow-hidden whitespace-nowrap border-black/10 border-t py-5 dark:border-white/25">
        <Container size="md">
          <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="order-2 flex flex-col items-center justify-center sm:order-1 sm:items-start">
              <div className="legal">
                <Link
                  href="/legals/terms"
                  className="text-current transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white"
                >
                  Terms
                </Link>{" "}
                |{" "}
                <Link
                  href="/legals/privacy"
                  className="text-current transition-colors duration-300 ease-in-out hover:text-black dark:hover:text-white"
                >
                  Privacy
                </Link>
              </div>
              <div className="mt-2 text-sm">&copy; 2024 {author.name} | All rights reserved</div>
            </div>

            <div className="order-1 flex justify-center sm:order-2 sm:justify-end">
              <div className="flex flex-wrap items-center justify-center gap-1">
                {social.map(({ name, href, icon }, i) => (
                  <Link
                    key={`social-${i}`}
                    href={href}
                    target="_blank"
                    aria-label={`connect ${name}`}
                    className="blend group size-10 items-center justify-center rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/20"
                  >
                    {icon &&
                      createElement(icon, {
                        className:
                          "size-full fill-current group-hover:fill-black group-hover:dark:fill-white blend",
                      })}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </footer>
  );
}
