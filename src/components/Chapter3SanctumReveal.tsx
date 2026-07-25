"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import { ChevronDown, Sparkles } from "lucide-react";

export const Chapter3SanctumReveal: React.FC = () => {
  const { currentState, setState } = useCinematic();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isActive = currentState === "SanctumReveal" || currentState === "Invitation";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleProceedToScroll = () => {
    setState("ScrollJourney");
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8 }}
      className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-emerald-50/80 backdrop-blur-sm px-4 py-8 overflow-y-auto text-center"
    >
      {/* Soft Light Halo */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-radial from-amber-400/20 via-emerald-400/10 to-transparent blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      />

      <div className="relative z-10 max-w-3xl flex flex-col items-center my-auto">
        
        {/* Sacred Radha-Krishna Visual Centerpiece */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative mb-8 group"
          style={{
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          }}
        >
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-300/40 via-emerald-200/40 to-amber-300/40 blur-xl animate-pulse-glow" />

          {/* Golden Frame */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-amber-500/60 p-3 bg-white/95 shadow-[0_0_50px_rgba(5,150,105,0.15)] flex items-center justify-center overflow-hidden">
            
            {/* SVG Radha-Krishna & Flute Silhouette Artwork */}
            <svg viewBox="0 0 200 200" className="w-full h-full text-emerald-900">
              <defs>
                <linearGradient id="peacockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#075985" />
                  <stop offset="50%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
                <filter id="glowLight">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Glowing Lotus Base */}
              <path
                d="M 40 150 Q 100 175 160 150 Q 140 185 100 185 Q 60 185 40 150 Z"
                fill="url(#goldGrad)"
                opacity="0.9"
                filter="url(#glowLight)"
              />
              <path
                d="M 60 145 Q 100 165 140 145 Q 125 175 100 175 Q 75 175 60 145 Z"
                fill="#f59e0b"
                opacity="0.95"
              />

              {/* Bansuri Flute & Peacock Feather Motif */}
              <g filter="url(#glowLight)">
                {/* Flute */}
                <rect x="25" y="95" width="150" height="8" rx="4" fill="url(#goldGrad)" transform="rotate(-15 100 100)" />
                <circle cx="60" cy="104" r="2" fill="#fff" transform="rotate(-15 100 100)" />
                <circle cx="80" cy="99" r="2" fill="#fff" transform="rotate(-15 100 100)" />
                <circle cx="100" cy="94" r="2" fill="#fff" transform="rotate(-15 100 100)" />
                <circle cx="120" cy="89" r="2" fill="#fff" transform="rotate(-15 100 100)" />

                {/* Peacock Feather */}
                <path
                  d="M 145 65 C 160 40 175 45 170 70 C 165 85 145 75 145 65 Z"
                  fill="url(#peacockGrad)"
                />
                <ellipse cx="160" cy="58" rx="6" ry="9" fill="#0ea5e9" />
                <circle cx="160" cy="58" r="3" fill="#f59e0b" />
              </g>

              {/* Divine Aura Rays */}
              <circle cx="100" cy="100" r="85" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.8" />
            </svg>
          </div>
        </motion.div>

        {/* Graceful Typography Fade-Up Sequence */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="space-y-4"
        >
          {/* Main Motto */}
          <div className="flex items-center justify-center space-x-3 text-emerald-800 font-cinzel text-xs md:text-sm tracking-[0.4em] uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>COMPASSION IS KRISHNA</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          {/* Main Headline */}
          <h1 className="font-cursive text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-peacock-gradient leading-tight py-2">
            With the Divine Blessings
          </h1>

          <p className="font-cormorant text-xl md:text-2xl text-emerald-900 font-medium italic max-w-xl mx-auto">
            The Kumar Family lovingly invites you to celebrate
          </p>

          {/* Event Title Banner */}
          <div className="py-4">
            <h2 className="font-cinzel text-xl md:text-3xl text-emerald-950 tracking-widest font-bold uppercase drop-shadow-sm">
              Shri Thakurji&apos;s 25th Birthday
            </h2>
            <p className="mt-2 font-cinzel text-xs md:text-sm tracking-[0.3em] text-emerald-800 uppercase font-semibold">
              Silver Jubilee Janmashtami Celebration
            </p>
          </div>
        </motion.div>

        {/* Scroll Action Button */}
        <motion.button
          onClick={handleProceedToScroll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          whileHover={{ y: 5 }}
          className="mt-8 px-8 py-3 rounded-full glass-panel-peacock border border-emerald-300 text-emerald-950 font-cinzel text-xs tracking-[0.25em] font-bold flex items-center space-x-3 hover:border-emerald-500 transition-all shadow-lg"
        >
          <span>UNFURL INVITATION SCROLL</span>
          <ChevronDown className="w-4 h-4 text-emerald-700 animate-bounce" />
        </motion.button>
      </div>
    </motion.div>
  );
};
