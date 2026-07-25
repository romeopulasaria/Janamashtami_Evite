"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import Image from "next/image";

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
        exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#ecd6b3" }}
      >
        {/*
          Aspect-Ratio Locked Container:
          1716 × 917 matches public/images/homepage-cover.png.
          Fills viewport while preserving ratio on every device (320px–ultrawide).
        */}
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

          {/*
            EXACT TRANSPARENT INTERACTION LAYER:
            Scanned from PNG pixel data of homepage-cover.png (1716×917).
            Coordinates:
              top: 86.37% | left: 33.68% | width: 31.35% | height: 7.42%
            Min touch target: 44×44px for mobile accessibility.
          */}
          <button
            onClick={handleStart}
            disabled={isStarting}
            aria-label="Enter the Mahotsav"
            title="Enter the Mahotsav"
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
      </motion.div>
    </AnimatePresence>
  );
};
