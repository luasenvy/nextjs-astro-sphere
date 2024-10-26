"use client";

import { motion } from "framer-motion";

export interface WelcomeTypographyProps {
  text: string;
}

export default function WelcomeTypography({ text }: WelcomeTypographyProps) {
  return (
    <section>
      <motion.article
        variants={{
          hidden: { opacity: 0, y: 20 },
          block: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
        }}
        initial="hidden"
        whileInView="block"
        viewport={{ once: true, amount: "some" }}
      >
        {text.split("\n").map((line, i) => (
          <motion.p
            key={`intro-${i}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              block: { opacity: 1, y: 0, transition: { duration: 0.56 } },
            }}
          >
            {line}
          </motion.p>
        ))}
      </motion.article>
    </section>
  );
}
