"use client";

import React, { useState } from "react";
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
    <div
      key="hero-container"
      className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#ecd6b3" }}
    >
      {/* 
        Aspect-Ratio Locked Container:
        1716 x 917 matches public/images/homepage-cover.png.
        This container shrink-wraps to the exact rendered bounds of the image
        at all screen resolutions and device breakpoints (320px to 1440px+).
      */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          aspectRatio: "1716 / 917",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        {/* Full-screen high-quality artwork */}
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
          Positioned directly over the printed blue button inside homepage-cover.png.
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
    </div>
  );
};
