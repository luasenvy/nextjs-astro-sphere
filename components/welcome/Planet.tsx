"use client";

import { motion } from "framer-motion";

export default function Planet() {
  return (
    <motion.div
      id="planetcont"
      className="absolute inset-0 top-1/4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.56, ease: "easeInOut" }}
    >
      <div
        id="crescent"
        className="-translate-x-1/2 absolute top-0 left-1/2 aspect-square min-h-[100vh] w-[250vw] rounded-full bg-gradient-to-b from-0% from-black/25 to-5% to-transparent p-[1px] dark:from-white/75"
      >
        <div
          id="planet"
          className="flex h-full w-full justify-center overflow-hidden rounded-full bg-white p-[1px] dark:bg-black"
        >
          <div
            id="blur"
            className="h-20 w-full rounded-full bg-neutral-900/25 blur-3xl dark:bg-white/25"
          />
        </div>
      </div>
    </motion.div>
  );
}
