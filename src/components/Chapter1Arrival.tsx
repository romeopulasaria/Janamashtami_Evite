"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import Image from "next/image";
import { Sparkles, Send } from "lucide-react";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { TextEffect } from "@/components/motion-primitives/text-effect";

export const Chapter1Arrival: React.FC = () => {
  const { startExperience, currentState } = useCinematic();
  const [isStarting, setIsStarting] = useState(false);

  if (currentState !== "Landing") return null;

  const handleStart = () => {
    if (isStarting) return;
    setIsStarting(true);
    setTimeout(() => {
      startExperience();
    }, 1200); // 1.2s dissolve before unmounting
  };

  return (
    <AnimatePresence>
      <motion.div
        key="live-composition-container"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }} // Container fades last if needed
        className="fixed inset-0 z-50 w-screen h-[100dvh] overflow-hidden flex flex-col items-center justify-center bg-[#ecd6b3]"
      >
        {/* ================================================================ */}
        {/* DEPTH PLANE 1: BACKGROUND & MANDALA GEOMETRY                     */}
        {/* ================================================================ */}
        {/* Ambient Candlelight Warm Illumination Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isStarting ? 0 : 1 }}
          transition={{ duration: 1.8, delay: 0.4 }}
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.15)_0%,rgba(212,175,55,0.05)_50%,transparent_80%)]"
        />

        {/* Subtle CSS Mandala Geometry (Abstract Rings) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isStarting ? 0 : 0.4, scale: 1 }}
          transition={{ duration: 2.0, delay: 0.4, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 opacity-40 flex items-center justify-center"
        >
          <div className="absolute w-[60%] h-[60%] border-[1px] border-amber-700/20 rounded-full" />
          <div className="absolute w-[80%] h-[80%] border-[1px] border-amber-700/10 rounded-full border-dashed" />
          <div className="absolute w-[100%] h-[100%] border-[1px] border-amber-700/5 rounded-full" />
        </motion.div>

        {/* ================================================================ */}
        {/* DEPTH PLANE 2: TYPOGRAPHY HIERARCHY (Z-10)                       */}
        {/* ================================================================ */}
        <motion.div
          animate={{ 
            opacity: isStarting ? 0 : 1, 
            y: isStarting ? -40 : 0, 
            filter: isStarting ? "blur(12px)" : "blur(0px)" 
          }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl px-4 mt-[-10vh] md:mt-[-15vh]"
        >
          {/* Top Emblem & Silver Jubilee Invitation */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center mb-6"
          >
            <Sparkles className="w-6 h-6 text-[#1e3a8a] mb-3 opacity-80" />
            <div className="w-12 h-[1px] bg-amber-500/40 mb-3" />
            <span className="font-cinzel text-xs md:text-sm tracking-[0.4em] text-[#1e3a8a] font-bold uppercase drop-shadow-sm">
              SILVER JUBILEE INVITATION
            </span>
          </motion.div>

          {/* Shri Thakurji's (Ceremonial Cursive) */}
          <h2 className="font-cursive text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#0a192f] tracking-wide leading-tight drop-shadow-sm mb-4">
            <TextEffect per="word" category="ceremonial" delay={1.1}>
              Shri Thakurji's
            </TextEffect>
          </h2>

          {/* 25TH BIRTHDAY (Cinzel Serif) */}
          <div className="font-cinzel text-2xl sm:text-4xl md:text-5xl text-amber-600 font-bold tracking-[0.15em] mb-4">
            <TextEffect per="word" category="ceremonial" delay={1.5}>
              25TH BIRTHDAY
            </TextEffect>
          </div>

          {/* Subtitle / Blessing */}
          <div className="font-cormorant text-base sm:text-lg md:text-xl text-[#1e3a8a] italic font-semibold max-w-2xl mx-auto tracking-wide">
            <TextEffect per="line" category="supporting" delay={1.8}>
              Silver Jubilee Janmashtami Mahotsav
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
            filter: isStarting ? "blur(10px)" : "blur(0px)" 
          }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: isStarting ? 0.1 : 0 }}
          className="absolute bottom-[15vh] md:bottom-[8vh] left-1/2 -translate-x-1/2 w-[280px] h-[280px] md:w-[450px] md:h-[450px] z-20 pointer-events-none flex items-center justify-center"
        >
          {/* Subtle Warm Halo behind Krishna */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isStarting ? 0 : 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 2.0 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,transparent_70%)] blur-2xl z-0"
          />

          {/* Krishna Asset */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10"
            style={{ mixBlendMode: "multiply" }} // Strips pure white background from generated placeholder
          >
            <Image
              src="/images/krishna.png"
              alt="Baby Krishna"
              fill
              priority
              style={{ objectFit: "contain", objectPosition: "center bottom" }}
            />
          </motion.div>

          {/* Lotus / Floral Asset */}
          <motion.div
            initial={{ opacity: 0, y: 8, filter: "blur(4px)", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.9, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 md:-bottom-16 w-[120%] h-[150px] md:h-[220px] z-20"
            style={{ mixBlendMode: "multiply" }}
          >
            <Image
              src="/images/lotus.png"
              alt="Lotus Flowers"
              fill
              priority
              style={{ objectFit: "contain", objectPosition: "center bottom" }}
            />
          </motion.div>
        </motion.div>

        {/* ================================================================ */}
        {/* DEPTH PLANE 4: REAL HTML CTA BUTTON (Z-40)                       */}
        {/* ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isStarting ? 0 : 1, 
            y: isStarting ? 10 : 0 
          }}
          transition={{ 
            duration: 0.8, 
            delay: isStarting ? 0 : 2.8, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="absolute bottom-6 md:bottom-12 left-0 right-0 z-40 flex flex-col items-center justify-center px-6"
        >
          {/* Subtle CTA Glow */}
          {isStarting && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 1.0 }}
              className="absolute inset-0 bg-amber-200/20 blur-2xl pointer-events-none rounded-full"
            />
          )}

          <motion.button
            onClick={handleStart}
            disabled={isStarting}
            aria-label="Enter the Mahotsav"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden w-full max-w-[320px] min-w-[240px] min-h-[56px] py-4 px-8 rounded-full bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] border-[2px] border-amber-300/80 text-[#f8fafc] font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(245,158,11,0.2)] transition-all flex items-center justify-center space-x-3 cursor-pointer group hover:brightness-110"
          >
            <BorderTrail duration={isStarting ? 1.2 : 4} size={80} />
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0 relative z-10" />
            <span className="drop-shadow-sm whitespace-nowrap relative z-10 group-hover:text-amber-100 transition-colors">
              {isStarting ? "ENTERING..." : "ENTER THE MAHOTSAV"}
            </span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0 relative z-10" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
