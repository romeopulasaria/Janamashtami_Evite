"use client";

import React from "react";
import { motion } from "framer-motion";

interface BorderTrailProps {
  className?: string;
  size?: number;
  duration?: number;
  color?: string;
}

export const BorderTrail: React.FC<BorderTrailProps> = ({
  className = "",
  size = 60,
  duration = 5,
  color = "linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.9) 50%, transparent 100%)",
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] ${className}`}>
      <motion.div
        className="absolute w-full h-full"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration,
          ease: "linear",
        }}
        style={{
          originX: "50%",
          originY: "50%",
        }}
      >
        <div
          className="absolute"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            background: color,
            filter: "blur(4px)",
            borderRadius: "50%",
          }}
        />
      </motion.div>
    </div>
  );
};
