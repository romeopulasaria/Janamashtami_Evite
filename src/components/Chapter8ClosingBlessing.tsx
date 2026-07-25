"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import { Sparkles, Flame } from "lucide-react";

export const Chapter8ClosingBlessing: React.FC = () => {
  const { currentState } = useCinematic();

  const isVisible =
    currentState === "ClosingBlessing" ||
    currentState === "ScrollJourney" ||
    currentState === "RSVP";

  if (!isVisible) return null;

  return (
    <div className="w-full py-24 md:py-32 relative z-20">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl mx-auto px-4 relative z-20 text-center"
      >
        {/* Soft, warm cream / pale marigold yellow card */}
        <div className="bg-[#fffdf0] rounded-[40px] p-8 md:p-16 relative overflow-hidden border-[6px] border-slate-300/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Decorative Inner Border */}
          <div className="absolute inset-3 border-2 border-dashed border-slate-400/40 rounded-[30px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            
            {/* Centered Flickering Eternal Diya */}
            <div className="relative flex flex-col items-center mb-8">
              {/* Soft Ambient Diya Halo */}
              <div className="absolute -inset-12 rounded-full bg-[#f59e0b]/30 blur-3xl animate-pulse-glow" />
              
              <div className="relative w-24 h-24 rounded-full bg-white border-[3px] border-[#d4af37] flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                <Flame className="w-12 h-12 text-[#ea580c] animate-diya-flame drop-shadow-md" />
              </div>
            </div>

            {/* Eagerly Await Message */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              {/* High contrast deep navy blue cursive text */}
              <h3 className="font-cursive text-5xl md:text-6xl text-[#0a192f] font-bold tracking-wide py-4 leading-normal drop-shadow-sm text-center">
                We eagerly await your gracious presence.
              </h3>
              
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-6" />

              <p className="font-cormorant text-xl md:text-2xl text-[#1e3a8a] italic font-bold leading-relaxed px-4 text-center">
                May Shri Thakurji bless you and your family with peace, devotion, and joy. We look forward to celebrating this sacred occasion together.
              </p>
            </motion.div>

            {/* Final Sacred Motto */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="pt-12"
            >
              {/* Royal Blue & Silver Badge */}
              <div className="inline-flex items-center space-x-4 px-8 py-4 rounded-sm bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] border-[2px] border-slate-300/80 text-[#f8fafc] font-cinzel text-lg md:text-xl tracking-[0.4em] uppercase shadow-[0_10px_25px_rgba(0,0,0,0.3)] font-bold">
                <Sparkles className="w-5 h-5 text-slate-300" />
                <span className="drop-shadow-sm">JAI SHRI KRISHNA</span>
                <Sparkles className="w-5 h-5 text-slate-300" />
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
