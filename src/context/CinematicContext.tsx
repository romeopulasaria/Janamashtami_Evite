"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CinematicState =
  | "Landing"
  | "LightingDiya"
  | "TempleReveal"
  | "DoorOpening"
  | "SanctumReveal"
  | "Invitation"
  | "ScrollJourney"
  | "RSVP"
  | "ClosingBlessing";

interface CinematicContextType {
  currentState: CinematicState;
  setState: (state: CinematicState) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  toggleAudio: () => void;
  toggleMute: () => void;
  skipIntro: () => void;
  replayIntro: () => void;
  hasStartedInteraction: boolean;
  startExperience: () => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
}

const CinematicContext = createContext<CinematicContextType | undefined>(undefined);

export const CinematicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentState, setCurrentState] = useState<CinematicState>("Landing");
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStartedInteraction, setHasStartedInteraction] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Check system prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const startExperience = () => {
    setHasStartedInteraction(true);
    setIsAudioPlaying(true);
    setCurrentState("ScrollJourney");
  };

  const skipIntro = () => {
    setHasStartedInteraction(true);
    setIsAudioPlaying(true);
    setCurrentState("ScrollJourney");
  };

  const replayIntro = () => {
    setCurrentState("Landing");
  };

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <CinematicContext.Provider
      value={{
        currentState,
        setState: setCurrentState,
        isAudioPlaying,
        setIsAudioPlaying,
        isMuted,
        setIsMuted,
        toggleAudio,
        toggleMute,
        skipIntro,
        replayIntro,
        hasStartedInteraction,
        startExperience,
        reducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </CinematicContext.Provider>
  );
};

export const useCinematic = () => {
  const context = useContext(CinematicContext);
  if (!context) {
    throw new Error("useCinematic must be used within a CinematicProvider");
  }
  return context;
};
