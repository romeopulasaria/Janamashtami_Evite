"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MOTION_TOKENS } from "@/lib/motion-tokens";

interface TextEffectProps {
  children: string;
  per?: "word" | "line";
  as?: React.ElementType;
  className?: string;
  delay?: number;
  category?: "ceremonial" | "supporting" | "functional";
}

export const TextEffect: React.FC<TextEffectProps> = ({
  children,
  per = "word",
  as: Component = "span",
  className = "",
  delay = 0,
  category = "ceremonial",
}) => {
  const isCeremonial = category === "ceremonial";
  const isSupporting = category === "supporting";

  const duration = isCeremonial
    ? MOTION_TOKENS.duration.ceremonial
    : isSupporting
    ? MOTION_TOKENS.duration.supporting
    : MOTION_TOKENS.duration.functional;

  const offsetY = isCeremonial
    ? MOTION_TOKENS.offsetY.ceremonialDesktop
    : isSupporting
    ? MOTION_TOKENS.offsetY.supportingDesktop
    : MOTION_TOKENS.offsetY.functionalDesktop;

  const ease = isCeremonial
    ? MOTION_TOKENS.easing.ceremonial
    : isSupporting
    ? MOTION_TOKENS.easing.supporting
    : MOTION_TOKENS.easing.functional;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (d = delay) => ({
      opacity: 1,
      transition: {
        staggerChildren: per === "word" ? 0.1 : 0.18,
        delayChildren: d,
      },
    }),
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: offsetY,
      filter: isCeremonial ? MOTION_TOKENS.blur.ceremonial : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease,
      },
    },
  };

  const segments = per === "word" ? children.split(" ") : [children];

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      custom={delay}
    >
      {segments.map((segment, idx) => (
        <motion.span
          key={`${segment}-${idx}`}
          variants={itemVariants}
          className="inline-block whitespace-pre"
        >
          {segment}
          {per === "word" && idx < segments.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};
