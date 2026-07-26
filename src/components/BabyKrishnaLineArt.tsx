"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface BabyKrishnaLineArtProps {
  className?: string;
  isStarting?: boolean;
}

export const BabyKrishnaLineArt: React.FC<BabyKrishnaLineArtProps> = ({ 
  className = "", 
  isStarting = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isStarting ? 0 : 1, y: isStarting ? -20 : 0 }}
      transition={{ duration: 0.9, delay: isStarting ? 0 : 2.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-20 flex flex-col items-center justify-center ${className}`}
    >
      {/* 1. Halo Layer */}
      {/* Soft, radial, warm champagne gold, extremely subtle */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "clamp(280px, 40vw, 450px)",
          height: "clamp(280px, 40vw, 450px)",
          background: "radial-gradient(circle, rgba(235,190,85,0.16) 0%, rgba(235,190,85,0.06) 40%, transparent 70%)",
        }}
      />

      {/* 2. Krishna Line-Art Layer */}
      {/* The PNG asset itself has a genuinely transparent background. */}
      <div 
        className="relative z-10 pointer-events-none mx-auto"
        style={{
          width: "clamp(240px, 35vw, 320px)",
          height: "clamp(240px, 35vw, 320px)",
        }}
      >
        <Image
          src="/images/krishna-lineart-transparent.png"
          alt="Baby Krishna Line Art"
          fill
          priority
          style={{ objectFit: "contain", objectPosition: "center center" }}
        />
      </div>
    </motion.div>
  );
};
