"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import { MapPin, Calendar } from "lucide-react";
import { InView } from "@/components/motion-primitives/in-view";
import { TextEffect } from "@/components/motion-primitives/text-effect";

export const Chapter6VenueCard: React.FC = () => {
  const { currentState } = useCinematic();

  const isVisible =
    currentState === "ScrollJourney" ||
    currentState === "RSVP" ||
    currentState === "ClosingBlessing";

  const googleMapsUrl = "https://maps.google.com/?q=Arcadia+Hall,+Grand+Temple+Road,+Borivali+West,+Mumbai";

  const handleDownloadCalendar = () => {
    // 6:30 PM IST = 13:00 UTC. 10:00 PM IST = 16:30 UTC.
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Shri Thakurji Janmashtami//EN",
      "BEGIN:VEVENT",
      "SUMMARY:Shri Thakurji's 25th Birthday Mahotsav",
      "DESCRIPTION:Silver Jubilee Janmashtami Celebration\\nHosted by the Kumar Family.",
      "LOCATION:Arcadia Hall\\, Grand Temple Road\\, Borivali West\\, Mumbai",
      "DTSTART:20260829T130000Z",
      "DTEND:20260829T163000Z",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Shri-Thakurji-Janmashtami-25th.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isVisible) return null;

  return (
    <InView variant="scale-in" duration={0.9} className="w-full max-w-3xl mx-auto px-4 py-12 relative z-20">
      <div className="glass-panel rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden border border-amber-200/50 shadow-xl bg-[#fffdf0]/95 backdrop-blur-md">
        
        {/* Core Venue Information */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="font-cinzel text-xs tracking-[0.35em] text-[#1e3a8a] uppercase font-bold flex items-center justify-center space-x-2 opacity-80">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sacred Venue</span>
          </span>
          
          <h3 className="font-cinzel text-2xl sm:text-4xl md:text-5xl text-[#0a192f] font-bold mt-3 sm:mt-5 tracking-wide drop-shadow-sm">
            <TextEffect per="word" preset="fade-in-blur">
              Arcadia Hall
            </TextEffect>
          </h3>
          
          <p className="font-inter text-sm md:text-base text-slate-700 mt-4 max-w-sm mx-auto font-medium leading-relaxed opacity-90">
            Grand Temple Road,<br/>Borivali West, Mumbai
          </p>
        </div>

        {/* Action Button Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 max-w-xl mx-auto w-full">
          <motion.a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.96 }}
            className="w-full flex items-center justify-center space-x-3 px-6 min-h-[48px] py-3.5 rounded-sm bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] text-[#f8fafc] font-cinzel text-xs sm:text-sm tracking-wider transition-all shadow-md hover:shadow-lg group font-bold border-[2px] border-slate-300/80 hover:brightness-110"
          >
            <MapPin className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
            <span>Open in Google Maps</span>
          </motion.a>

          <motion.button
            onClick={handleDownloadCalendar}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.96 }}
            className="w-full flex items-center justify-center space-x-3 px-6 min-h-[48px] py-3.5 rounded-sm bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] text-[#f8fafc] font-cinzel text-xs sm:text-sm tracking-wider transition-all shadow-md hover:shadow-lg group font-bold border-[2px] border-slate-300/80 hover:brightness-110 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
            <span>Add to Calendar</span>
          </motion.button>
        </div>

      </div>
    </InView>
  );
};
