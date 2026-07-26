"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/motion-primitives/animated-number";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const LuxuryCountdownPlaque: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Target date: August 29, 2026 00:00:00
    const targetDate = new Date("2026-08-29T00:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return null; // Prevents hydration mismatch bugs
  }

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full my-8">
      <div className="text-center mb-6">
        <span className="font-cinzel text-xs tracking-[0.35em] text-[#0a192f] uppercase font-bold">
          COUNTDOWN TO MAHOTSAV
        </span>
        <h3 className="font-cinzel text-xl text-[#b45309] tracking-wider font-bold mt-1 drop-shadow-sm">
          29 August 2026
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-2xl mx-auto px-1 sm:px-2">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -3, transition: { duration: 0.3 } }}
            className="rounded-lg p-3 sm:p-5 flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_5px_15px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-slate-400 bg-gradient-to-br from-slate-100 via-slate-300 to-slate-400"
          >
            {/* Soft highlight for metallic shine */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.6)_0%,transparent_50%)] pointer-events-none" />

            {/* Number Display - Engraved Effect with AnimatedNumber */}
            <AnimatedNumber
              value={unit.value}
              className="relative z-10 font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight drop-shadow-[1px_1px_1px_rgba(255,255,255,0.9)]"
            />

            {/* Unit Label */}
            <span className="relative z-10 mt-1 sm:mt-2 font-inter text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] text-slate-700 font-bold uppercase drop-shadow-[1px_1px_1px_rgba(255,255,255,0.9)]">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
