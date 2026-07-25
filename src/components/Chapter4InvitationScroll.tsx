"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import { LuxuryCountdownPlaque } from "./LuxuryCountdownPlaque";
import { EventTimeline } from "./EventTimeline";
import { Sparkles, Calendar, Heart } from "lucide-react";

export const Chapter4InvitationScroll: React.FC = () => {
  const { currentState } = useCinematic();

  const isVisible =
    currentState === "Invitation" ||
    currentState === "ScrollJourney" ||
    currentState === "RSVP" ||
    currentState === "ClosingBlessing";

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative z-20 w-full max-w-4xl mx-auto px-4 py-12"
    >
      {/* Top Royal Blue & Silver Scroll Handle Roller */}
      <div className="relative w-full h-10 bg-gradient-to-r from-[#050b14] via-[#1e3a8a] to-[#050b14] rounded-t-full border-2 border-slate-300/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between px-6 z-30">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border-[2px] border-[#0a192f] shadow-inner" />
        <div className="font-cinzel text-[10px] md:text-xs tracking-[0.4em] text-slate-200 font-bold uppercase drop-shadow-md">
          ✦ SHRI THAKURJI MAHOTSAV INVITATION ✦
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border-[2px] border-[#0a192f] shadow-inner" />
      </div>

      {/* Main Content Body - Illuminated Parchment */}
      <div className="bg-[#fffdf0] border-l-2 border-r-2 border-slate-300/30 p-6 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Subtle Warm Glow Watermark Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_80%)] pointer-events-none" />
        
        {/* Top Header Crest inside Parchment */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center pb-8 border-b border-amber-900/10"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[#0a192f] font-cinzel text-xs tracking-[0.3em] uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold opacity-80">SILVER JUBILEE INVITATION</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          <h2 className="font-cursive text-3xl sm:text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#0a192f] via-[#1e3a8a] to-[#0a192f] tracking-wide leading-tight drop-shadow-sm">
            Shri Thakurji&apos;s 25th Birthday
          </h2>
          <p className="font-cormorant text-xl sm:text-2xl text-amber-600 italic mt-2 sm:mt-3 font-semibold tracking-wide">
            Silver Jubilee Janmashtami Mahotsav
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-cinzel text-[#0a192f] tracking-widest font-bold">
            <span className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-amber-100 shadow-sm">
              <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
              <span>SATURDAY, 29 AUGUST 2026</span>
            </span>
            <span className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-amber-100 shadow-sm">
              <Heart className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Arcadia Hall, Borivali West</span>
            </span>
          </div>
        </motion.div>

        {/* Countdown Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 relative z-10"
        >
          <LuxuryCountdownPlaque />
        </motion.div>

        {/* Schedule & Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 relative z-10"
        >
          <EventTimeline />
        </motion.div>

      </div>

      {/* Bottom Royal Blue & Silver Scroll Handle Roller */}
      <div className="relative w-full h-10 bg-gradient-to-r from-[#050b14] via-[#1e3a8a] to-[#050b14] rounded-b-full border-2 border-slate-300/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between px-6 z-30 mt-[-2px]">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border-[2px] border-[#0a192f] shadow-inner" />
        <div className="font-cinzel text-[10px] md:text-xs tracking-[0.4em] text-slate-200 font-bold uppercase drop-shadow-md">
          JAI SHRI KRISHNA
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border-[2px] border-[#0a192f] shadow-inner" />
      </div>

    </motion.div>
  );
};
