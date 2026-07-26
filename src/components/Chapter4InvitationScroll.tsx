"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import { LuxuryCountdownPlaque } from "./LuxuryCountdownPlaque";
import { EventTimeline } from "./EventTimeline";
import { Sparkles, Calendar, Heart } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { InView } from "@/components/motion-primitives/in-view";

export const Chapter4InvitationScroll: React.FC = () => {
  const { currentState } = useCinematic();
  const invitationHeadingGradientClass =
    "[&_span]:bg-gradient-to-r [&_span]:from-[#0a192f] [&_span]:via-[#1e3a8a] [&_span]:to-[#0a192f] [&_span]:bg-clip-text [&_span]:[-webkit-background-clip:text] [&_span]:text-transparent [&_span]:[-webkit-text-fill-color:transparent]";

  const isVisible =
    currentState === "Invitation" ||
    currentState === "ScrollJourney" ||
    currentState === "RSVP" ||
    currentState === "ClosingBlessing";

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 w-full max-w-4xl mx-auto px-4 py-12"
    >
      {/* Main Content Body - Illuminated Parchment */}
      <div className="bg-[#fffdf0] border-l-2 border-r-2 border-slate-300/30 p-6 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Subtle Warm Glow Watermark Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_80%)] pointer-events-none" />
        
        {/* Top Header Crest inside Parchment */}
        <div className="text-center pb-8 border-b border-amber-900/10">
          <InView category="functional" delay={0.1}>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[#0a192f] font-cinzel text-xs tracking-[0.3em] uppercase mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <TextEffect per="word" category="functional" delay={0.1}>
                SILVER JUBILEE INVITATION
              </TextEffect>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
          </InView>

          <h2 className="font-cursive text-[clamp(2.35rem,11vw,5.5rem)] tracking-wide leading-[0.95] sm:leading-tight drop-shadow-sm text-center w-full max-w-full mx-auto px-2 sm:px-0 text-[#0a192f]">
            <span className={`block ${invitationHeadingGradientClass}`}>
              <TextEffect per="word" category="ceremonial" delay={0.25} triggerMode="animate">
                Shri Thakurji&apos;s 25th
              </TextEffect>
            </span>
            <span className={`block -mt-1 sm:-mt-2 md:-mt-4 ${invitationHeadingGradientClass}`}>
              <TextEffect per="word" category="ceremonial" delay={0.35} triggerMode="animate">
                Birthday
              </TextEffect>
            </span>
          </h2>

          <p className="font-cormorant text-xl sm:text-2xl text-amber-600 italic mt-4 sm:mt-6 font-semibold tracking-wide w-full text-center">
            <TextEffect per="word" category="supporting" delay={0.45}>
              Silver Jubilee Janmashtami Mahotsav
            </TextEffect>
          </p>

          <InView category="supporting" delay={0.65} className="w-full">
            <div className="mt-8 flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-4 text-xs font-cinzel text-[#0a192f] tracking-widest font-bold w-full mx-auto max-w-2xl">
              <span className="w-full md:flex-1 flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-3.5 rounded-lg border border-amber-100 shadow-sm text-center">
                <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                <span>SATURDAY, 29 AUGUST 2026</span>
              </span>
              <span className="w-full md:flex-1 flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-sm px-4 py-3.5 rounded-lg border border-amber-100 shadow-sm text-center">
                <Heart className="w-4 h-4 text-amber-600 shrink-0" />
                <span>ARCADIA HALL, BORIVALI WEST</span>
              </span>
            </div>
          </InView>
        </div>

        {/* Countdown Section */}
        <InView category="supporting" delay={0.2} className="mt-8 relative z-10">
          <LuxuryCountdownPlaque />
        </InView>

        {/* Schedule & Highlights */}
        <InView category="supporting" delay={0.3} className="mt-12 relative z-10">
          <EventTimeline />
        </InView>

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
