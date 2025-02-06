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
        className="absolute left-1/2 top-0 aspect-square min-h-[100vh] w-[250vw] -translate-x-1/2 rounded-full bg-gradient-to-b from-black/25 from-0% to-transparent to-5% p-[1px] dark:from-white/75"
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
