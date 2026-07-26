"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionPanelProps {
  children: React.ReactNode;
  activeKey: string | number;
  className?: string;
  mode?: "sync" | "wait" | "popLayout";
}

export const TransitionPanel: React.FC<TransitionPanelProps> = ({
  children,
  activeKey,
  className = "",
  mode = "wait",
}) => {
  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={activeKey}
        initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
