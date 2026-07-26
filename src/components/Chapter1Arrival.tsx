"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { BorderTrail } from "@/components/motion-primitives/border-trail";

export const Chapter1Arrival: React.FC = () => {
  const { startExperience, currentState } = useCinematic();
  const [isStarting, setIsStarting] = useState(false);

  if (currentState !== "Landing") return null;

  const handleStart = () => {
    if (isStarting) return;
    setIsStarting(true);
    startExperience();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="hero-container"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 0.98,
          filter: "blur(6px)",
          transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
        }}
        className="fixed inset-0 z-50 w-screen h-[100dvh] overflow-hidden"
        style={{ backgroundColor: "#ecd6b3" }}
      >
        {/* ================================================================ */}
        {/* 1. DEDICATED DESKTOP HERO (md:flex)                              */}
        {/* Aspect-ratio locked (1716 × 917) container with contain scaling.   */}
        {/* ================================================================ */}
        <div className="hidden md:flex w-full h-full items-center justify-center">
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              aspectRatio: "1716 / 917",
              maxWidth: "100vw",
              maxHeight: "100vh",
            }}
          >
            <Image
              src="/images/homepage-cover.png"
              alt="Shri Thakurji 25th Birthday Mahotsav"
              fill
              priority={true}
              quality={100}
              sizes="100vw"
              style={{
                objectFit: "contain",
                objectPosition: "center center",
              }}
            />

            {/* Desktop Interaction Button */}
            <motion.button
              onClick={handleStart}
              disabled={isStarting}
              aria-label="Enter the Mahotsav"
              title="Enter the Mahotsav"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                position: "absolute",
                top: "86.37%",
                left: "33.68%",
                width: "31.35%",
                height: "7.42%",
                minWidth: "140px",
                minHeight: "44px",
                background: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                opacity: 0,
                zIndex: 40,
              }}
            />
          </div>
        </div>

        {/* ================================================================ */}
        {/* 2. DEDICATED MOBILE HERO (block md:hidden)                       */}
        {/* Designed specifically for portrait mobile screens (320px–430px+).*/}
        {/* ================================================================ */}
        <div className="block md:hidden relative w-full h-[100dvh] overflow-hidden">
          {/* Portrait Hero Background Artwork Layer */}
          <div className="absolute inset-0 z-10 w-full h-full">
            <Image
              src="/images/homepage-cover-mobile.png"
              alt="Shri Thakurji 25th Birthday Mahotsav - Mobile"
              fill
              priority={true}
              quality={100}
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/40" />

          {/* Thumb-Friendly Interactive Mobile Button Layer */}
          <div className="absolute bottom-6 left-0 right-0 z-40 flex items-center justify-center px-6 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <motion.button
              onClick={handleStart}
              disabled={isStarting}
              aria-label="Enter the Mahotsav"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden w-full max-w-[280px] min-w-[220px] min-h-[52px] py-3.5 px-6 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#0b192f] to-[#1e3a8a] border-2 border-amber-300/90 text-amber-100 font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center space-x-2.5 cursor-pointer hover:brightness-110"
            >
              <BorderTrail duration={4} size={50} />
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0 relative z-10" />
              <span className="drop-shadow-sm whitespace-nowrap relative z-10">ENTER THE MAHOTSAV</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0 relative z-10" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
