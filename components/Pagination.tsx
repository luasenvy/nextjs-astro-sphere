"use client";

import classnames from "classnames";
import { motion } from "framer-motion";

export interface PaginationProps {
  total: number;
  page: number;
  size: number;
  onChange: (page: number) => void;
}

export default function Pagination({ total, page, size, onChange: handleChange }: PaginationProps) {
  const pages = Math.ceil(total / size);

  return (
    <motion.nav
      variants={{
        hidden: { opacity: 0, y: 20 },
        block: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } },
      }}
      initial="hidden"
      animate="block"
      className="mt-6 flex items-center justify-center gap-2"
    >
      {new Array(pages).fill(0).map((_, i) => (
        <motion.button
          key={`page-${i}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            block: { opacity: 1, y: 0, transition: { duration: 0.56 } },
          }}
          className={classnames(
            "size-7 font-mono rounded-full flex text-xs text-center items-center justify-center bg-transparent border border-black/10 transition-colors duration-300 ease-in-out",
            {
              "bg-black/5 dark:bg-white/20": i + 1 === page,
              "hover:bg-black/5 dark:hover:bg-white/20 dark:border-white/25": i + 1 !== page,
            }
          )}
          onClick={() => handleChange(i + 1)}
        >
          {i + 1}
        </motion.button>
      ))}
    </motion.nav>
  );
}
