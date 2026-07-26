"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import Image from "next/image";
import { Sparkles, Diamond } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { BabyKrishnaLineArt } from "@/components/BabyKrishnaLineArt";

export const Chapter1Arrival: React.FC = () => {
  const { startExperience, currentState } = useCinematic();
  const [isStarting, setIsStarting] = useState(false);

  if (currentState !== "Landing") return null;

  const handleStart = () => {
    if (isStarting) return;
    setIsStarting(true);
    setTimeout(() => {
      startExperience();
    }, 1200); // Wait for dissolve transition before unmounting
  };

  return (
    <AnimatePresence>
      <motion.div
        key="live-composition-container"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }} // Container fades last
        className="fixed inset-0 z-50 w-screen h-[100dvh] overflow-y-auto overflow-x-hidden flex flex-col items-center py-[max(2rem,env(safe-area-inset-top))] px-4 bg-[#fffdf0]" // Warm luminous ivory / champagne cream
      >
        {/* ================================================================ */}
        {/* DEPTH PLANE 1: BACKGROUND & MANDALA GEOMETRY                     */}
        {/* ================================================================ */}
        
        {/* Faint paper texture overlay (optional subtlety) */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('/images/paper-texture.png')] bg-repeat" style={{ display: 'none' /* uncomment if texture added */ }} />

        {/* Ambient Champagne Warm Illumination Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isStarting ? 0 : 1 }}
          transition={{ duration: 1.8, delay: 0.2 }}
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(212,175,55,0.06)_0%,rgba(212,175,55,0.01)_50%,transparent_80%)]"
        />

        {/* Extremely faint gold geometric mandala linework */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isStarting ? 0 : 0.3, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }} // 0.2s - 0.7s
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none z-0 opacity-30 flex items-center justify-center"
        >
          <div className="absolute w-[40%] h-[40%] border-[1px] border-[#d4af37]/15 rounded-full" />
          <div className="absolute w-[60%] h-[60%] border-[1px] border-[#d4af37]/10 rounded-full border-dashed" />
          <div className="absolute w-[80%] h-[80%] border-[1px] border-[#d4af37]/5 rounded-full" />
        </motion.div>

        {/* ================================================================ */}
        {/* DEPTH PLANE 2: TYPOGRAPHY HIERARCHY (Z-10)                       */}
        {/* ================================================================ */}
        <motion.div
          animate={{ 
            opacity: isStarting ? 0 : 1, 
            y: isStarting ? -30 : 0, 
            filter: isStarting ? "blur(8px)" : "blur(0px)" 
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl mt-4 md:mt-8 shrink-0"
        >
          {/* Top Decorative Symbol (0.5s) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mb-4 text-[#d4af37]/70"
          >
            <Diamond className="w-3 h-3 fill-current" />
          </motion.div>

          {/* SILVER JUBILEE INVITATION (0.7s) - Small uppercase serif, wide tracking, royal navy */}
          <div className="font-cinzel text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-[#0f172a] font-semibold uppercase drop-shadow-sm mb-6">
            <TextEffect per="line" category="functional" delay={0.7}>
              SILVER JUBILEE INVITATION
            </TextEffect>
          </div>

          {/* Shri Thakurji's (1.0s) - Calligraphic/script, large, royal navy */}
          <h1 className="font-cursive text-5xl sm:text-6xl md:text-8xl text-[#0f172a] tracking-wide leading-tight drop-shadow-sm mb-6">
            <TextEffect per="word" category="ceremonial" delay={1.0}>
              Shri Thakurji's
            </TextEffect>
          </h1>

          {/* 25TH BIRTHDAY (1.35s) - Luxurious high-contrast serif */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35, ease: "easeOut" }}
            className="font-cinzel text-[#0f172a] flex flex-col items-center mb-8"
          >
            <div className="flex items-start">
              <span className="text-6xl sm:text-7xl md:text-[5.5rem] leading-none font-bold">25</span>
              <span className="text-xl sm:text-2xl font-bold mt-1 ml-0.5">TH</span>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl tracking-[0.25em] font-bold mt-2">
              BIRTHDAY
            </div>
          </motion.div>

          {/* Delicate gold ornamental divider (1.7s) */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6 origin-center"
          />

          {/* Silver Jubilee Janmashtami Mahotsav (1.9s) - Elegant italic serif, muted saffron/antique orange */}
          <div className="font-cormorant text-lg sm:text-xl md:text-2xl text-[#c05621] italic font-semibold max-w-xl mx-auto tracking-wide mb-6">
            <TextEffect per="line" category="supporting" delay={1.9}>
              Silver Jubilee Janmashtami Mahotsav
            </TextEffect>
          </div>

          {/* Small ornamental divider (2.15s) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.15, ease: "easeOut" }}
            className="flex items-center space-x-2 mb-6 text-[#d4af37]/60"
          >
            <div className="w-1 h-1 rounded-full bg-current" />
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            <div className="w-1 h-1 rounded-full bg-current" />
          </motion.div>

          {/* Family invitation line (2.3s) - Small uppercase serif, wide tracking, navy */}
          <div className="font-cinzel text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.25em] text-[#0f172a] font-semibold uppercase leading-relaxed max-w-md mx-auto mb-10">
            <TextEffect per="line" category="functional" delay={2.3}>
              WITH THE DIVINE BLESSINGS OF SHRI THAKURJI, THE KUMAR FAMILY LOVINGLY INVITES YOU
            </TextEffect>
          </div>
        </motion.div>

        {/* ================================================================ */}
        {/* DEPTH PLANE 3: ARTWORK - KRISHNA & LOTUS (Z-20)                  */}
        {/* ================================================================ */}
        <motion.div
          animate={{ 
            opacity: isStarting ? 0 : 1, 
            scale: isStarting ? 0.95 : 1,
            filter: isStarting ? "blur(8px)" : "blur(0px)" 
          }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: isStarting ? 0.1 : 0 }}
          className="relative z-20 flex flex-col items-center mt-auto mb-12 shrink-0 w-full max-w-md"
        >
          {/* Krishna Line-Art (2.7s-3.3s) */}
          <BabyKrishnaLineArt isStarting={isStarting} className="mt-2" />
        </motion.div>

        {/* ================================================================ */}
        {/* DEPTH PLANE 4: REAL HTML CTA BUTTON & FOOTER (Z-40)              */}
        {/* ================================================================ */}
        <motion.div
          animate={{ 
            opacity: isStarting ? 0 : 1, 
            y: isStarting ? 20 : 0,
            filter: isStarting ? "blur(4px)" : "blur(0px)" 
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isStarting ? 0 : 0 }}
          className="relative z-40 flex flex-col items-center pb-8 shrink-0"
        >
          {/* CTA Button (3.5s) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.5, ease: "easeOut" }}
          >
            <motion.button
              onClick={handleStart}
              disabled={isStarting}
              aria-label="Enter the Mahotsav"
              whileHover={{ y: -1 }} // desktop hover: translate upward slightly
              whileTap={{ scale: 0.98 }} // press: scale 0.98
              className="relative overflow-hidden w-full min-w-[240px] md:min-w-[280px] py-4 px-8 rounded-full bg-[#0f172a] border-[1px] border-[#d4af37]/80 text-[#fffdf0] font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase shadow-lg transition-all flex items-center justify-center space-x-3 cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0 opacity-80" />
              <span className="drop-shadow-sm whitespace-nowrap pt-0.5">
                {isStarting ? "ENTERING..." : "ENTER THE MAHOTSAV"}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0 opacity-80" />
              
              {/* Subtle gold illumination travelling across the border on hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ring-1 ring-[#d4af37] ring-offset-1 ring-offset-[#0f172a]" />
            </motion.button>
          </motion.div>

          {/* Peacock feather / bottom ornament (3.8s) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 3.8 }}
            className="mt-8 flex flex-col items-center text-[#d4af37]/60"
          >
            <div className="w-[1px] h-8 bg-gradient-to-b from-current to-transparent mb-2" />
            <Sparkles className="w-4 h-4 text-current" />
          </motion.div>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
};
