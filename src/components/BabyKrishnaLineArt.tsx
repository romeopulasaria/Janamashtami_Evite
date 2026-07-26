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
      {/* Genuinely transparent background stripped from the raw artwork */}
      <div 
        className="relative z-10 pointer-events-none mx-auto flex justify-center items-center"
        style={{
          width: "clamp(260px, 45vw, 420px)",
        }}
      >
        <Image
          src="/images/krishna-transparent-final.png"
          alt="Baby Krishna Colored Illustration"
          width={1319}
          height={1192}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </motion.div>
  );
};
