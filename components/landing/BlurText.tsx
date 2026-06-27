"use client";

import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export default function BlurText({ text, className = "", delayOffset = 0 }: BlurTextProps) {
  const words = text.split(" ");

  return (
    <p
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: "0.05em",
      }}
    >
      {words.map((word, i) => {
        const delay = (i * 70) / 1000 + delayOffset;

        return (
          <motion.span
            key={i}
            initial={{ filter: "blur(6px)", opacity: 0, y: 16 }}
            whileInView={{
              filter: ["blur(6px)", "blur(2px)", "blur(0px)"],
              opacity: [0, 0.6, 1],
              y: [16, -2, 0],
            }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.5,
              times: [0, 0.5, 1],
              ease: "easeOut",
              delay: delay,
            }}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}
