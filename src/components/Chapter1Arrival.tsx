"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import Image from "next/image";

/* ─────────────────────────────────────────────
   CSS-only atmospheric animations
   ───────────────────────────────────────────── */
const HeroAtmospherics = () => (
  <style dangerouslySetInnerHTML={{__html: `
    /* Floating dust illuminated by warm light */
    @keyframes float-dust {
      0%   { transform: translate(0, 0) scale(1);   opacity: 0; }
      20%  { opacity: 0.6; }
      50%  { transform: translate(12px, -30px) scale(1.1); opacity: 0.7; }
      80%  { opacity: 0.5; }
      100% { transform: translate(-8px, -60px) scale(0.9); opacity: 0; }
    }
    /* Slow drifting flower petals */
    @keyframes drift-petal {
      0%   { transform: translateY(-5vh) translateX(0) rotate(0deg); opacity: 0; }
      8%   { opacity: 0.12; }
      50%  { transform: translateY(50vh) translateX(30px) rotate(180deg); opacity: 0.1; }
      92%  { opacity: 0.12; }
      100% { transform: translateY(105vh) translateX(-20px) rotate(360deg); opacity: 0; }
    }
    /* Firefly pulse */
    @keyframes firefly {
      0%, 100% { opacity: 0; transform: translate(0, 0); }
      15% { opacity: 0.9; }
      50% { opacity: 0.4; transform: translate(20px, -15px); }
      85% { opacity: 0.8; }
    }
    /* Star twinkle – almost invisible */
    @keyframes twinkle {
      0%, 100% { opacity: 0.08; }
      50%      { opacity: 0.35; }
    }
    /* Very slow gradient breathing */
    @keyframes ambient-breathe {
      0%, 100% { opacity: 0.5; }
      50%      { opacity: 0.8; }
    }
    .hero-dust {
      position: absolute; width: 2px; height: 2px;
      background: #D8A75B; border-radius: 50%;
      opacity: 0; filter: blur(0.5px);
      animation: float-dust linear infinite;
    }
    .hero-petal {
      position: absolute; width: 8px; height: 8px;
      background: #D8A75B; border-radius: 50% 0 50% 50%;
      opacity: 0; filter: blur(2px);
      animation: drift-petal linear infinite;
    }
    .hero-firefly {
      position: absolute; width: 4px; height: 4px;
      background: #D8A75B; border-radius: 50%;
      opacity: 0; filter: blur(1px);
      box-shadow: 0 0 6px 2px rgba(216,167,91,0.4);
      animation: firefly ease-in-out infinite;
    }
    .hero-star {
      position: absolute; width: 1.5px; height: 1.5px;
      background: #AEB9C9; border-radius: 50%;
      opacity: 0.08;
      animation: twinkle ease-in-out infinite;
    }
  `}} />
);

/* ─────────────────────────────────────────────
   Pre-compute random positions so they stay
   stable across re-renders (no layout shift)
   ───────────────────────────────────────────── */
function useStableRandom(count: number, seed: number) {
  return useMemo(() => {
    const out: number[] = [];
    let s = seed;
    for (let i = 0; i < count * 4; i++) {
      s = (s * 16807 + 7) % 2147483647;
      out.push((s % 10000) / 10000);
    }
    return out;
  }, [count, seed]);
}

export const Chapter1Arrival: React.FC = () => {
  const { startExperience, currentState } = useCinematic();
  const [isStarting, setIsStarting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  /* Stable random values for particles */
  const starR   = useStableRandom(30, 1);
  const dustR   = useStableRandom(20, 100);
  const petalR  = useStableRandom(8,  200);
  const flyR    = useStableRandom(6,  300);

  // Scroll detection to trigger experience
  useEffect(() => {
    if (currentState !== "Landing" || isStarting) return;

    const handleScroll = (e: WheelEvent | TouchEvent) => {
      if (e instanceof WheelEvent && e.deltaY > 10) {
        handleStart();
      } else if (e instanceof TouchEvent) {
        handleStart();
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [currentState, isStarting]);

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 w-full h-full flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(175deg, #081322 0%, #102344 45%, #0D1B33 70%, #081322 100%)" }}
      >
        <HeroAtmospherics />

        {/* ── LAYER 0: Almost-invisible stars ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {Array.from({ length: 30 }, (_, i) => {
            const j = i * 4;
            return (
              <div
                key={`star-${i}`}
                className="hero-star"
                style={{
                  top:  `${starR[j] * 55}%`,
                  left: `${starR[j+1] * 100}%`,
                  animationDuration:  `${4 + starR[j+2] * 6}s`,
                  animationDelay:     `${starR[j+3] * 4}s`,
                }}
              />
            );
          })}
        </div>

        {/* ── LAYER 1: Soft moonlight vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            boxShadow: "inset 0 0 200px 60px #081322, inset 0 0 80px 30px rgba(8,19,34,0.7)"
          }}
        />

        {/* ── LAYER 2: Large warm glow that extends beyond the image ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]"
        >
          {/* Primary warm halo — extends well beyond the artwork edges */}
          <motion.div
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
            style={{
              width: "90vmin", height: "90vmin",
              maxWidth: 1200, maxHeight: 1200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(216,167,91,0.08) 0%, rgba(216,167,91,0.04) 35%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
          {/* Secondary cool accent — very wide, merges into background */}
          <div
            className="absolute"
            style={{
              width: "110vmin", height: "110vmin",
              maxWidth: 1400, maxHeight: 1400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(42,72,117,0.12) 0%, transparent 60%)",
              filter: "blur(100px)",
            }}
          />
        </motion.div>

        {/* ── LAYER 3: Soft golden bokeh (very sparse, large, blurry) ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
          {[
            { top: "18%", left: "12%", size: 90 },
            { top: "72%", left: "78%", size: 70 },
            { top: "35%", left: "85%", size: 55 },
            { top: "68%", left: "20%", size: 60 },
          ].map((b, i) => (
            <motion.div
              key={`bokeh-${i}`}
              animate={{ opacity: [0.03, 0.07, 0.03] }}
              transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
              className="absolute rounded-full"
              style={{
                top: b.top, left: b.left,
                width: b.size, height: b.size,
                background: `radial-gradient(circle, rgba(216,167,91,0.25) 0%, transparent 70%)`,
                filter: "blur(20px)",
              }}
            />
          ))}
        </div>

        {/* ── LAYER 4: Floating dust particles ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
          {Array.from({ length: 20 }, (_, i) => {
            const j = i * 4;
            return (
              <div
                key={`dust-${i}`}
                className="hero-dust"
                style={{
                  top:  `${20 + dustR[j] * 60}%`,
                  left: `${10 + dustR[j+1] * 80}%`,
                  animationDuration: `${10 + dustR[j+2] * 8}s`,
                  animationDelay:    `${dustR[j+3] * 8}s`,
                }}
              />
            );
          })}
        </div>

        {/* ── LAYER 5: Slow drifting petals ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
          {Array.from({ length: 8 }, (_, i) => {
            const j = i * 4;
            return (
              <div
                key={`petal-${i}`}
                className="hero-petal"
                style={{
                  left: `${petalR[j] * 100}%`,
                  animationDuration: `${25 + petalR[j+1] * 20}s`,
                  animationDelay:    `${petalR[j+2] * 20}s`,
                }}
              />
            );
          })}
        </div>

        {/* ── LAYER 6: Sparse fireflies ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
          {Array.from({ length: 6 }, (_, i) => {
            const j = i * 4;
            return (
              <div
                key={`fly-${i}`}
                className="hero-firefly"
                style={{
                  top:  `${25 + flyR[j] * 50}%`,
                  left: `${15 + flyR[j+1] * 70}%`,
                  animationDuration: `${6 + flyR[j+2] * 6}s`,
                  animationDelay:    `${flyR[j+3] * 6}s`,
                }}
              />
            );
          })}
        </div>

        {/* ═══════════════════════════════════════
            MAIN ARTWORK — Portal into Vrindavan
            No frame. No border. Feathered radial mask.
            ═══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 z-10 w-full h-full pointer-events-none flex items-center justify-center p-1 md:p-4"
        >
          {/* Frameless shrink-wrapped artwork with feathered edges */}
          <div
            className="relative inline-flex items-center justify-center"
            style={{
              /* Radial feathered mask — outer ~120px blends into background */
              WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)",
            }}
          >
            {/* Next.js Image without 'fill' will dictate the exact container size while maintaining its intrinsic aspect ratio. */}
            <Image
              src="/images/hero-bg-vrindavan-final.png"
              alt="Shri Thakurji's 25th Birthday Mahotsav"
              width={1920}
              height={1080}
              priority
              quality={100}
              className={`w-auto h-auto max-w-[99vw] md:max-w-[92vw] max-h-[98vh] md:max-h-[92vh] object-contain object-center transition-all duration-700 ease-out ${
                isHovering ? "brightness-105 drop-shadow-[0_0_35px_rgba(216,167,91,0.3)]" : ""
              }`}
            />

            {/* ── Atmospherics locked to artwork bounds ── */}
            <div className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none">
              {/* Diya glow — extends softly */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.45, 0.2] }}
                transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[35%] h-[35%] mix-blend-screen"
                style={{
                  background: "radial-gradient(circle, rgba(216,167,91,0.3) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />

              {/* Floating motes local to hero */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 2 }}
                className="absolute inset-0"
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`mote-${i}`}
                    animate={{
                      y: [0, -18, 0],
                      x: [0, (i % 2 === 0 ? 8 : -8), 0],
                      opacity: [0, 0.55, 0],
                    }}
                    transition={{
                      duration: 3.5 + (i % 3),
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: "easeInOut"
                    }}
                    className="absolute w-[2px] h-[2px] rounded-full"
                    style={{
                      left: `${38 + (i * 2.5)}%`,
                      bottom: `${18 + (i * 1.8)}%`,
                      background: "#D8A75B",
                      filter: "blur(0.5px)",
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* ── INVISIBLE CTA OVERLAY (Anchored EXACTLY to Artwork Bounds) ── */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              <button
                onClick={handleStart}
                disabled={isStarting}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                aria-label="Enter the Mahotsav"
                title="Enter the Mahotsav"
                /* 
                 * Mobile-optimized touch target (min 48px height, 140px width)
                 * Centered vertically over the painted button.
                 */
                className="absolute left-1/2 -translate-x-1/2 bottom-[14%] translate-y-1/2 w-[16%] h-[7%] min-w-[140px] min-h-[48px] outline-none pointer-events-auto cursor-pointer bg-transparent opacity-0 z-40"
              />
            </div>
          </div>
        </motion.div>

        {/* ── Bottom Left Logo ── */}
        <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{
              border: "1px solid rgba(174,185,201,0.35)",
              background: "rgba(8,19,34,0.6)",
            }}
          >
            <span className="font-cinzel font-bold text-[#AEB9C9] text-lg drop-shadow-md">N</span>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
};
