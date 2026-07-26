"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  padZero?: boolean;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className = "",
  padZero = true,
}) => {
  const formatted = padZero ? String(value).padStart(2, "0") : String(value);

  return (
    <span className={`inline-flex items-center overflow-hidden h-[1.1em] ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={formatted}
          initial={{ y: -24, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 24, opacity: 0, filter: "blur(4px)" }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
