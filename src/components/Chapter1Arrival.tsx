"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import Image from "next/image";

export const Chapter1Arrival: React.FC = () => {
  const { startExperience, currentState } = useCinematic();
  const [isStarting, setIsStarting] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
          1716 x 917 matches public/images/homepage-cover.png.
          Shrink-wraps to the exact rendered bounds of the artwork at all screen resolutions (320px to 1440px+).
        */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            aspectRatio: "1716 / 917",
            maxWidth: "100vw",
            maxHeight: "100vh",
          }}
        >
          {/* Base Poster Artwork Layer (Guarantees instant load & seamless fallback) */}
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

          {/* HTML5 Cinematic Video Background (Looping MP4) */}
          <video
            ref={videoRef}
            src="/videos/vrindavan-cinematic-bg.mp4"
            poster="/images/homepage-cover.png"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setIsVideoLoaded(true)}
            onPlaying={() => setIsVideoLoaded(true)}
            onError={() => setIsVideoLoaded(false)}
            className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-1000 ease-in-out ${
              isVideoLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* 
            EXACT TRANSPARENT INTERACTION LAYER:
            Positioned directly over the printed blue button inside the artwork.
            Coordinates scanned from PNG pixel data:
            - top: 86.37%
            - left: 33.68%
            - width: 31.35%
            - height: 7.42%
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
