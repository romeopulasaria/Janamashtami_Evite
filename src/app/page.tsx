"use client";

import React from "react";
import { CinematicProvider, useCinematic } from "@/context/CinematicContext";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";
import { AudioEngine } from "@/components/AudioEngine";
import { TopControlsNav } from "@/components/TopControlsNav";
import { Chapter1Arrival } from "@/components/Chapter1Arrival";
import { Chapter2TempleEntrance } from "@/components/Chapter2TempleEntrance";
import { Chapter3SanctumReveal } from "@/components/Chapter3SanctumReveal";
import { Chapter4InvitationScroll } from "@/components/Chapter4InvitationScroll";
import { Chapter6VenueCard } from "@/components/Chapter6VenueCard";
import { Chapter7ImmersiveRsvp } from "@/components/Chapter7ImmersiveRsvp";
import { Chapter8ClosingBlessing } from "@/components/Chapter8ClosingBlessing";

function MainContent() {
  const { currentState } = useCinematic();

  return (
    <main className="relative min-h-screen bg-[#fffdf0] overflow-x-hidden text-[#0a192f] selection:bg-amber-500/30 selection:text-amber-900">
      {/* Cinematic Deep Blue Vignette framing the parchment */}
      <div className="fixed inset-0 pointer-events-none z-[1] shadow-[inset_0_0_150px_rgba(5,11,20,0.4),inset_0_0_50px_rgba(5,11,20,0.2)]" />
      
      {/* Fixed Parallax Background Motifs (Oversized subtle gold mandalas) */}
      <div className="fixed inset-0 pointer-events-none z-[0] opacity-[0.25]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mandala-pattern" x="0" y="0" width="500" height="500" patternUnits="userSpaceOnUse">
              <circle cx="250" cy="250" r="200" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="15 25" />
              <circle cx="250" cy="250" r="160" fill="none" stroke="#d4af37" strokeWidth="1" />
              <path d="M 250 50 Q 300 150 250 250 Q 200 150 250 50 Z" fill="none" stroke="#d4af37" strokeWidth="1" />
              <path d="M 250 450 Q 300 350 250 250 Q 200 350 250 450 Z" fill="none" stroke="#d4af37" strokeWidth="1" />
              <path d="M 50 250 Q 150 200 250 250 Q 150 300 50 250 Z" fill="none" stroke="#d4af37" strokeWidth="1" />
              <path d="M 450 250 Q 350 200 250 250 Q 350 300 450 250 Z" fill="none" stroke="#d4af37" strokeWidth="1" />
              <circle cx="250" cy="250" r="50" fill="none" stroke="#d4af37" strokeWidth="3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mandala-pattern)" />
        </svg>
      </div>

      {/* Lightweight 60 FPS Particle Canvas */}
      <BackgroundCanvas activeState={currentState} />

      {/* Ambient Audio System */}
      <AudioEngine />

      {/* Top Floating Controls */}
      <TopControlsNav />

      {/* Chapter 1: Arrival & Diya Lighting */}
      <Chapter1Arrival />

      {/* Chapter 2: 2.5D Temple & Door Opening */}
      <Chapter2TempleEntrance />

      {/* Chapter 3: Sanctum Reveal & Radha-Krishna Artwork */}
      <Chapter3SanctumReveal />

      {/* Chapter 4 & 5: Unfurling Silver Parchment Scroll, Plaque Countdown & Event Schedule */}
      <Chapter4InvitationScroll />

      {/* Chapter 6: Premium Venue Card & Directions */}
      <Chapter6VenueCard />

      {/* Chapter 7: Immersive In-Page RSVP */}
      <Chapter7ImmersiveRsvp />

      {/* Chapter 8: Moonlit Idle Sanctuary & Closing Blessing */}
      <Chapter8ClosingBlessing />
    </main>
  );
}

export default function Home() {
  return (
    <CinematicProvider>
      <MainContent />
    </CinematicProvider>
  );
}
