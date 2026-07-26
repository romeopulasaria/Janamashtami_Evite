"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MOTION_TOKENS } from "@/lib/motion-tokens";

interface InViewProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  category?: "ceremonial" | "supporting" | "functional";
  delay?: number;
  margin?: string;
  once?: boolean;
}

export const InView: React.FC<InViewProps> = ({
  children,
  id,
  className = "",
  category = "supporting",
  delay = 0,
  margin = "-15%",
  once = true,
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

  const variants: Variants = {
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
        delay,
        ease,
      },
    },
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
