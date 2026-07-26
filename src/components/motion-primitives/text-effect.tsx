"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface TextEffectProps {
  children: string;
  per?: "word" | "char" | "line";
  as?: React.ElementType;
  className?: string;
  delay?: number;
  speedReveal?: number;
  preset?: "fade-in-blur" | "fade-up" | "slide";
}

const presetVariants: Record<string, { container: Variants; item: Variants }> = {
  "fade-in-blur": {
    container: {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, filter: "blur(6px)", y: 8 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { type: "spring", stiffness: 180, damping: 24 },
      },
    },
  },
  "fade-up": {
    container: {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      },
    },
  },
  slide: {
    container: {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.03, delayChildren: i * 0.1 },
      }),
    },
    item: {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 220, damping: 20 },
      },
    },
  },
};

export const TextEffect: React.FC<TextEffectProps> = ({
  children,
  per = "word",
  as: Component = "span",
  className = "",
  delay = 0,
  preset = "fade-in-blur",
}) => {
  const { container, item } = presetVariants[preset] || presetVariants["fade-in-blur"];

  const segments =
    per === "char"
      ? children.split("")
      : per === "word"
      ? children.split(" ")
      : [children];

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      custom={delay}
    >
      {segments.map((segment, idx) => (
        <motion.span
          key={`${segment}-${idx}`}
          variants={item}
          className="inline-block whitespace-pre"
        >
          {segment}
          {per === "word" && idx < segments.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};
