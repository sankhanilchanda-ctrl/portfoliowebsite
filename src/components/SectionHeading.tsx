"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  
  return (
    <h2 className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
