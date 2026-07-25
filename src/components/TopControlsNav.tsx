"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import { Volume2, VolumeX, FastForward, RotateCcw, Play, Pause } from "lucide-react";

export const TopControlsNav: React.FC = () => {
  const {
    currentState,
    isAudioPlaying,
    toggleAudio,
    isMuted,
    toggleMute,
    skipIntro,
    replayIntro,
    hasStartedInteraction,
  } = useCinematic();

  if (!hasStartedInteraction) return null;

  const isIntroActive =
    currentState === "LightingDiya" ||
    currentState === "TempleReveal" ||
    currentState === "DoorOpening" ||
    currentState === "SanctumReveal";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 pointer-events-none"
    >
      {/* Left: Brand Badge */}
      <div className="pointer-events-auto flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 min-h-[44px] rounded-full glass-panel border border-slate-400/30 shadow-lg">
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 animate-ping" />
        <span className="font-cinzel text-[9px] sm:text-[10px] md:text-xs tracking-[0.18em] sm:tracking-[0.25em] text-slate-200 uppercase font-bold whitespace-nowrap">
          SHRI THAKURJI 25TH
        </span>
      </div>

      {/* Right: Audio & Navigation Controls */}
      <div className="pointer-events-auto flex items-center space-x-1.5 sm:space-x-3">
        
        {/* Equalizer Visualizer & Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="flex items-center space-x-1.5 sm:space-x-2 px-3 py-2.5 min-h-[44px] rounded-full glass-panel border border-slate-400/30 hover:border-amber-300/50 text-slate-200 text-xs transition-colors cursor-pointer"
          title={isAudioPlaying ? "Pause Audio" : "Play Ambient Bansuri"}
        >
          {isAudioPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-amber-300" />
              {/* Animated Sound Equalizer Bars */}
              <div className="flex items-end space-x-0.5 h-3">
                <span className="w-0.5 bg-amber-300 animate-bounce" style={{ animationDuration: "0.6s" }} />
                <span className="w-0.5 bg-amber-300 animate-bounce" style={{ animationDuration: "0.9s" }} />
                <span className="w-0.5 bg-amber-300 animate-bounce" style={{ animationDuration: "0.4s" }} />
              </div>
            </>
          ) : (
            <Play className="w-3.5 h-3.5 text-slate-300" />
          )}
        </button>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full glass-panel border border-slate-400/30 hover:border-amber-300/50 text-slate-200 transition-colors cursor-pointer"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
          )}
        </button>

        {/* Skip Intro Button (Visible during intro) */}
        {isIntroActive && (
          <button
            onClick={skipIntro}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full glass-panel border border-amber-300/40 hover:bg-amber-400/20 text-amber-200 font-cinzel text-[10px] tracking-widest transition-all shadow-md"
          >
            <span>SKIP INTRO</span>
            <FastForward className="w-3 h-3" />
          </button>
        )}

        {/* Replay Intro (Visible after intro) */}
        {!isIntroActive && (
          <button
            onClick={replayIntro}
            className="p-2.5 rounded-full glass-panel border border-slate-400/30 hover:border-amber-300/50 text-slate-200 transition-colors"
            title="Replay Cinematic Intro"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}

      </div>
    </motion.div>
  );
};
