"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useCinematic } from "@/context/CinematicContext";
import { Bell } from "lucide-react";

export const Chapter2TempleEntrance: React.FC = () => {
  const { currentState, setState } = useCinematic();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftDoorRef = useRef<HTMLDivElement | null>(null);
  const rightDoorRef = useRef<HTMLDivElement | null>(null);
  const lightRayRef = useRef<HTMLDivElement | null>(null);
  const bellSoundRef = useRef<HTMLAudioElement | null>(null);

  const [waitingForInteraction, setWaitingForInteraction] = useState(false);
  const [interactionComplete, setInteractionComplete] = useState(false);

  const isActive = currentState === "TempleReveal" || currentState === "DoorOpening";

  // Skip the old diya lighting state instantly
  useEffect(() => {
    if (currentState === "LightingDiya") {
      setState("TempleReveal");
    }
  }, [currentState, setState]);

  useEffect(() => {
    if (currentState === "TempleReveal" && !interactionComplete) {
      // Slight scale-in approach to the majestic doors
      const tl = gsap.timeline({
        onComplete: () => {
          setWaitingForInteraction(true);
        },
      });

      tl.to(containerRef.current, {
        scale: 1.05,
        duration: 3,
        ease: "power2.out",
      });

      return () => {
        tl.kill();
      };
    }
  }, [currentState, interactionComplete]);

  const handleDoorClick = () => {
    if (!waitingForInteraction) return;
    
    setWaitingForInteraction(false);
    setInteractionComplete(true);
    setState("DoorOpening");

    if (bellSoundRef.current) {
      bellSoundRef.current.currentTime = 0;
      bellSoundRef.current.play().catch(() => {});
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setState("SanctumReveal");
      },
    });

    // Swing massive doors open
    tl.to(leftDoorRef.current, {
      rotateY: -105,
      duration: 3.5,
      ease: "power3.inOut",
    }, "doors");

    tl.to(rightDoorRef.current, {
      rotateY: 105,
      duration: 3.5,
      ease: "power3.inOut",
    }, "doors");

    // Divine light spills out
    tl.to(lightRayRef.current, {
      opacity: 1,
      scale: 1.2,
      duration: 2.5,
      ease: "power2.out",
    }, "doors+=0.5");

    tl.to({}, { duration: 1.5 });
  };

  if (!isActive && currentState !== "LightingDiya") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-40 overflow-hidden bg-emerald-950"
    >
      <audio ref={bellSoundRef} src="https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3" preload="auto" />

      <div
        ref={containerRef}
        className="relative w-full h-full origin-center"
        style={{ perspective: "1500px" }}
      >
        {/* Layer 1: Palace Background */}
        <div className="absolute inset-0 bg-emerald-950" />

        {/* Majestic Full-Screen Palace Doors Container */}
        <div className="absolute inset-0 flex z-20">
          
          {/* Divine Light Ray Behind Doors */}
          <div
            ref={lightRayRef}
            className="absolute inset-0 z-10 pointer-events-none opacity-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(254,252,232,1)_0%,rgba(234,179,8,0.7)_40%,transparent_100%)]"
          />

          {/* LEFT DOOR */}
          <div
            ref={leftDoorRef}
            onClick={handleDoorClick}
            className={`relative w-1/2 h-full bg-gradient-to-r from-[#1a0a03] via-[#3a1a0b] to-[#5c2d16] border-r-[3px] border-[#1a0a03] origin-left shadow-[20px_0_50px_rgba(0,0,0,0.8)] z-20 overflow-hidden flex flex-col justify-center ${waitingForInteraction ? 'cursor-pointer' : 'cursor-default'}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Wooden Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 mix-blend-multiply pointer-events-none" />
            
            {/* Door Panel Framing */}
            <div className="absolute inset-4 md:inset-8 border-4 border-amber-600/40 border-double rounded-sm pointer-events-none" />
            <div className="absolute inset-8 md:inset-12 border border-amber-700/30 rounded-sm pointer-events-none bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.1)_0%,transparent_100%)]" />

            {/* Massive Brass Carvings */}
            <div className="z-10 flex flex-col items-center justify-around h-2/3 pointer-events-none">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-amber-500/80 bg-gradient-to-br from-amber-300 via-amber-600 to-amber-800 flex items-center justify-center shadow-2xl">
                <span className="text-4xl md:text-5xl text-amber-100 drop-shadow-md">🦚</span>
              </div>
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[6px] border-amber-500/80 bg-gradient-to-br from-amber-300 via-amber-600 to-amber-800 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <span className="text-6xl md:text-8xl text-amber-100 drop-shadow-lg">🪷</span>
              </div>
            </div>

            {/* Heavy Brass Door Handle & Plate */}
            <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-8 md:w-12 h-40 md:h-64 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-800 border-2 border-amber-900 shadow-[10px_10px_30px_rgba(0,0,0,0.6)] z-30" />
            
            {/* Decorative Hanging Bell */}
            <div className="absolute top-0 right-1/4 w-1 h-32 bg-amber-600 shadow-md">
              <div className="absolute bottom-[-20px] left-[-18px] w-10 h-10 rounded-full border-2 border-amber-400 bg-amber-600 flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-amber-200" />
              </div>
            </div>
          </div>

          {/* RIGHT DOOR */}
          <div
            ref={rightDoorRef}
            onClick={handleDoorClick}
            className={`relative w-1/2 h-full bg-gradient-to-l from-[#1a0a03] via-[#3a1a0b] to-[#5c2d16] border-l-[3px] border-[#1a0a03] origin-right shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-20 overflow-hidden flex flex-col justify-center ${waitingForInteraction ? 'cursor-pointer' : 'cursor-default'}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Wooden Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 mix-blend-multiply pointer-events-none" />
            
            {/* Door Panel Framing */}
            <div className="absolute inset-4 md:inset-8 border-4 border-amber-600/40 border-double rounded-sm pointer-events-none" />
            <div className="absolute inset-8 md:inset-12 border border-amber-700/30 rounded-sm pointer-events-none bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.1)_0%,transparent_100%)]" />

            {/* Massive Brass Carvings */}
            <div className="z-10 flex flex-col items-center justify-around h-2/3 pointer-events-none">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-amber-500/80 bg-gradient-to-br from-amber-300 via-amber-600 to-amber-800 flex items-center justify-center shadow-2xl">
                <span className="text-4xl md:text-5xl text-amber-100 drop-shadow-md">🦚</span>
              </div>
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[6px] border-amber-500/80 bg-gradient-to-br from-amber-300 via-amber-600 to-amber-800 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <span className="text-6xl md:text-8xl text-amber-100 drop-shadow-lg">🪷</span>
              </div>
            </div>

            {/* Heavy Brass Door Handle & Plate */}
            <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-8 md:w-12 h-40 md:h-64 rounded-full bg-gradient-to-l from-amber-300 via-amber-500 to-amber-800 border-2 border-amber-900 shadow-[-10px_10px_30px_rgba(0,0,0,0.6)] z-30" />
            
            {/* Decorative Hanging Bell */}
            <div className="absolute top-0 left-1/4 w-1 h-32 bg-amber-600 shadow-md">
              <div className="absolute bottom-[-20px] left-[-18px] w-10 h-10 rounded-full border-2 border-amber-400 bg-amber-600 flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-amber-200" />
              </div>
            </div>
          </div>

          {/* Central Seam Gold Strip */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-amber-600 to-amber-900 -translate-x-1/2 z-20 pointer-events-none" />

          {/* Interaction Prompt overlaying the doors */}
          <AnimatePresence>
            {waitingForInteraction && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-emerald-950/70 px-8 py-4 rounded-xl border border-amber-500/50 text-amber-300 font-cinzel text-xl md:text-3xl tracking-widest uppercase animate-pulse-glow backdrop-blur-md shadow-[0_0_50px_rgba(5,150,105,0.4)]">
                  Push to Enter
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
};
