"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import { Sparkles, Flame } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { InView } from "@/components/motion-primitives/in-view";

export const Chapter8ClosingBlessing: React.FC = () => {
  const { currentState } = useCinematic();

  const isVisible =
    currentState === "ClosingBlessing" ||
    currentState === "ScrollJourney" ||
    currentState === "RSVP";

  if (!isVisible) return null;

  return (
    <div className="w-full py-16 sm:py-28 md:py-36 relative z-20 overflow-hidden">
      {/* Subtle Warm Illumination Halo behind final blessing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.18)_0%,rgba(212,175,55,0.08)_50%,transparent_80%)] blur-3xl pointer-events-none" />

      <InView category="ceremonial" className="w-full max-w-4xl mx-auto px-4 relative z-20 text-center">
        {/* Soft, warm cream / pale marigold yellow card */}
        <div className="bg-[#fffdf0]/95 backdrop-blur-md rounded-[24px] sm:rounded-[40px] p-6 sm:p-10 md:p-16 relative overflow-hidden border-4 sm:border-[6px] border-slate-300/50 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          
          {/* Decorative Inner Border */}
          <div className="absolute inset-2 sm:inset-3 border-2 border-dashed border-slate-400/40 rounded-[18px] sm:rounded-[30px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            
            {/* Centered Flickering Eternal Diya */}
            <InView category="functional" delay={0.1} className="relative flex flex-col items-center mb-8">
              {/* Soft Ambient Diya Halo */}
              <div className="absolute -inset-12 rounded-full bg-[#f59e0b]/30 blur-3xl animate-pulse-glow" />
              
              <div className="relative w-24 h-24 rounded-full bg-white border-[3px] border-[#d4af37] flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                <Flame className="w-12 h-12 text-[#ea580c] animate-diya-flame drop-shadow-md" />
              </div>
            </InView>

            {/* Eagerly Await Message */}
            <div className="flex flex-col items-center">
              {/* High contrast deep navy blue cursive text with ceremonial delay */}
              <h3 className="font-cursive text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0a192f] font-bold tracking-wide py-2 sm:py-4 leading-snug sm:leading-normal drop-shadow-sm text-center">
                <TextEffect per="word" category="ceremonial" delay={0.25}>
                  We eagerly await your gracious presence.
                </TextEffect>
              </h3>
              
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-6 opacity-60" />

              <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-[#1e3a8a] italic font-bold leading-relaxed px-2 sm:px-4 text-center">
                <TextEffect per="word" category="supporting" delay={0.5}>
                  May Shri Thakurji bless you and your family with peace, devotion, and joy. We look forward to celebrating this sacred occasion together.
                </TextEffect>
              </p>
            </div>

            {/* Final Sacred Motto */}
            <InView category="functional" delay={0.7} className="pt-12">
              {/* Royal Blue & Silver Badge */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center space-x-2 sm:space-x-4 px-4 sm:px-8 py-3 sm:py-4 rounded-sm bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] border-[2px] border-slate-300/80 text-[#f8fafc] font-cinzel text-sm sm:text-lg md:text-xl tracking-[0.2em] sm:tracking-[0.4em] uppercase shadow-[0_10px_25px_rgba(0,0,0,0.3)] font-bold cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-slate-300 animate-pulse" />
                <span className="drop-shadow-sm">JAI SHRI KRISHNA</span>
                <Sparkles className="w-5 h-5 text-slate-300 animate-pulse" />
              </motion.div>
            </InView>

          </div>
        </div>
      </InView>
    </div>
  );
};
