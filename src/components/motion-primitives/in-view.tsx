"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface InViewProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: "blur-fade" | "fade-up" | "scale-in" | "slide-up";
  delay?: number;
  duration?: number;
  margin?: string;
  once?: boolean;
}

const variantsMap: Record<string, Variants> = {
  "blur-fade": {
    hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },
  },
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.94, y: 12 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
};

export const InView: React.FC<InViewProps> = ({
  children,
  id,
  className = "",
  variant = "blur-fade",
  delay = 0,
  duration = 0.8,
  margin = "-10%",
  once = true,
}) => {
  const selectedVariant = variantsMap[variant] || variantsMap["blur-fade"];

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      variants={selectedVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
};
