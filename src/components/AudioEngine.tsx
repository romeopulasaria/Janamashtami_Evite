"use client";

import React, { useEffect, useRef } from "react";
import { useCinematic } from "@/context/CinematicContext";

const START_TIME = 14.5; // seconds

export const AudioEngine: React.FC = () => {
  const { isAudioPlaying, isMuted, hasStartedInteraction } = useCinematic();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeAnimationRef = useRef<number | null>(null);
  const hasSetInitialTime = useRef(false);

  // Listen for metadata to set the starting timestamp accurately exactly once
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (!hasSetInitialTime.current) {
        audio.currentTime = START_TIME;
        hasSetInitialTime.current = true;
      }
    };

    if (audio.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Requirement: Music should play at approximately 20–25% volume.
  const targetVolume = isMuted ? 0 : 0.22; 
  const fadeDuration = 3000; // 3 seconds fade

  useEffect(() => {
    if (!hasStartedInteraction) return;

    const audio = audioRef.current;
    if (!audio) return;

    if (fadeAnimationRef.current) {
      cancelAnimationFrame(fadeAnimationRef.current);
    }

    if (isAudioPlaying) {
      if (audio.paused) {
        // Fallback in case metadata event missed, set timestamp on first play
        if (!hasSetInitialTime.current && audio.readyState >= 1) {
          audio.currentTime = START_TIME;
          hasSetInitialTime.current = true;
        }

        // Start at 0 for fade in
        audio.volume = 0;
        audio.play().catch((error) => {
          // Graceful handling if play fails (e.g. file missing or autoplay blocked)
          console.warn("Krishna flute audio not found. Place krishna-flute.mp3 inside /public/audio/.");
        });
      }
      
      const startVolume = audio.volume;
      const startTime = performance.now();

      const fadeIn = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / fadeDuration, 1);
        
        // Sine easing for a natural fade
        const easeProgress = -(Math.cos(Math.PI * progress) - 1) / 2;
        
        audio.volume = startVolume + (targetVolume - startVolume) * easeProgress;

        if (progress < 1) {
          fadeAnimationRef.current = requestAnimationFrame(fadeIn);
        }
      };
      
      fadeAnimationRef.current = requestAnimationFrame(fadeIn);
      
    } else {
      // Fade out then pause
      const startVolume = audio.volume;
      const startTime = performance.now();

      const fadeOut = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / fadeDuration, 1);
        
        const easeProgress = -(Math.cos(Math.PI * progress) - 1) / 2;
        
        audio.volume = Math.max(0, startVolume - startVolume * easeProgress);

        if (progress < 1) {
          fadeAnimationRef.current = requestAnimationFrame(fadeOut);
        } else {
          audio.pause();
        }
      };

      fadeAnimationRef.current = requestAnimationFrame(fadeOut);
    }

  }, [isAudioPlaying, isMuted, hasStartedInteraction, targetVolume]);

  const handleError = () => {
    // Requirement: Display console warning if file is missing. Do not crash.
    console.warn("Krishna flute audio not found. Place krishna-flute.mp3 inside /public/audio/.");
  };

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      onError={handleError}
      // Expects local file: /public/audio/krishna-flute.mp3
      src="/audio/krishna-flute.mp3"
    />
  );
};
