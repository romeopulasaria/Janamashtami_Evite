"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematic } from "@/context/CinematicContext";
import confetti from "canvas-confetti";
import { Send, CheckCircle2, Calendar, HeartHandshake, Sparkles, User, Users } from "lucide-react";
import { InView } from "@/components/motion-primitives/in-view";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { BorderTrail } from "@/components/motion-primitives/border-trail";

export const Chapter7ImmersiveRsvp: React.FC = () => {
  const { currentState, setState } = useCinematic();

  const [fullName, setFullName] = useState("");
  const [attendance, setAttendance] = useState<"accept" | "decline">("accept");
  const [guestCount, setGuestCount] = useState("2");
  const [dietary, setDietary] = useState("Standard Sattvik Festive");
  const [message, setMessage] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isVisible =
    currentState === "ScrollJourney" ||
    currentState === "RSVP" ||
    currentState === "ClosingBlessing";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    // Trigger subtle flower petal confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#10b981", "#0284c7", "#d4af37"],
    });

    setIsSubmitted(true);

    setTimeout(() => {
      setState("ClosingBlessing");
    }, 4000);
  };

  const handleDownloadCalendar = () => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Shri Thakurji Janmashtami//EN",
      "BEGIN:VEVENT",
      "SUMMARY:Shri Thakurji's 25th Birthday - Silver Jubilee Janmashtami Mahotsav",
      "DESCRIPTION:Attendance Confirmed. The Kumar Family lovingly invites you to celebrate Shri Thakurji's 25th Birthday Mahotsav.",
      "LOCATION:Arcadia Hall, Grand Temple Road, Borivali West, Mumbai",
      "DTSTART:20260829T100000Z",
      "DTEND:20260830T000000Z",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Shri-Thakurji-RSVP-Confirmation.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isVisible) return null;

  return (
    <InView id="rsvp-section" variant="blur-fade" duration={0.9} className="w-full max-w-4xl mx-auto px-4 py-12 relative z-20">
      <div className="parchment-scroll parchment-border-royal rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[#0a192f] font-cinzel text-xs tracking-[0.3em] uppercase mb-4 font-bold shadow-sm">
            <HeartHandshake className="w-4 h-4 text-amber-500" />
            <span>RESPONDEZ S&apos;IL VOUS PLAIT</span>
          </div>

          <h2 className="font-cursive text-2xl sm:text-4xl md:text-5xl font-bold text-[#0a192f] tracking-wide">
            <TextEffect per="word" preset="fade-in-blur">
              Accept The Sacred Invitation
            </TextEffect>
          </h2>
          <p className="font-cormorant text-lg text-slate-700 italic mt-2 font-bold">
            Please respond by August 15, 2026 to help us prepare your Mahaprasadam
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="rsvp-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto space-y-6"
            >
              {/* Guest Full Name */}
              <div>
                <label className="block font-cinzel text-xs tracking-wider text-[#0a192f] font-bold mb-2">
                  FULL NAME(S) *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Mr. & Mrs. Sharma & Family"
                    className="w-full pl-11 pr-4 min-h-[48px] py-3.5 rounded-xl bg-white border border-slate-300 focus:border-[#1e3a8a] focus:outline-none text-[#0a192f] font-bold text-base sm:text-sm font-inter placeholder:text-slate-400 shadow-sm"
                  />
                </div>
              </div>

              {/* Attendance Choice Buttons */}
              <div>
                <label className="block font-cinzel text-xs tracking-wider text-[#0a192f] font-bold mb-2">
                  ATTENDANCE CONFIRMATION *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setAttendance("accept")}
                    className={`min-h-[48px] py-3 px-3 sm:px-4 rounded-xl font-cinzel text-[11px] sm:text-xs font-bold tracking-wider border transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 ${
                      attendance === "accept"
                        ? "bg-amber-100 border-amber-400 text-amber-900 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>🪷 Joyfully Accept</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setAttendance("decline")}
                    className={`min-h-[48px] py-3 px-3 sm:px-4 rounded-xl font-cinzel text-[11px] sm:text-xs font-bold tracking-wider border transition-all flex items-center justify-center space-x-1.5 sm:space-x-2 ${
                      attendance === "decline"
                        ? "bg-slate-200 border-slate-400 text-slate-800 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>🙏 Regretfully Decline</span>
                  </motion.button>
                </div>
              </div>

              {/* Number of Guests */}
              {attendance === "accept" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block font-cinzel text-xs tracking-wider text-[#0a192f] font-bold mb-2">
                      NUMBER OF GUESTS ATTENDING
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-slate-300 focus:border-[#1e3a8a] focus:outline-none text-[#0a192f] font-bold text-sm font-inter shadow-sm"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4+">4+ Family Members</option>
                      </select>
                    </div>
                  </div>

                  {/* Dietary Preferences */}
                  <div>
                    <label className="block font-cinzel text-xs tracking-wider text-[#0a192f] font-bold mb-2">
                      DIETARY PREFERENCE
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["Standard Sattvik Festive", "Pure Jain Sattvik (No onion/garlic)"].map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setDietary(pref)}
                          className={`p-3 rounded-xl font-inter text-xs font-bold border text-left transition-all ${
                            dietary === pref
                              ? "bg-slate-100 border-[#1e3a8a] text-[#0a192f] shadow-sm"
                              : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Personal Blessing Message */}
              <div>
                <label className="block font-cinzel text-xs tracking-wider text-[#0a192f] font-bold mb-2">
                  BLESSINGS & MESSAGE FOR SHRI THAKURJI
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a heartfelt prayer, message or blessing..."
                  className="w-full p-4 rounded-xl bg-white border border-slate-300 focus:border-[#1e3a8a] focus:outline-none text-[#0a192f] font-bold text-sm font-inter placeholder:text-slate-400 shadow-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden w-full min-h-[48px] py-4 rounded-sm outline-none transition-all flex items-center justify-center bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-[2px] border-slate-300/80 hover:brightness-110 cursor-pointer group"
              >
                <BorderTrail duration={4} size={60} />
                <span className="relative z-10 font-cinzel font-bold text-xs tracking-[0.2em] sm:tracking-[0.25em] text-[#f8fafc] uppercase flex items-center space-x-2.5 sm:space-x-3 drop-shadow-sm">
                  <span>CONFIRM SACRED ATTENDANCE</span>
                  <Send className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
                </span>
              </motion.button>
            </motion.form>
          ) : (
            /* Confirmation Screen */
            <motion.div
              key="rsvp-confirmation"
              initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-8 space-y-6 max-w-lg mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-[#1e3a8a] flex items-center justify-center text-[#1e3a8a] mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div>
                <span className="font-cinzel text-xs tracking-[0.35em] text-slate-500 uppercase font-bold">
                  RSVP CONFIRMED
                </span>
                <h3 className="font-cursive text-2xl sm:text-4xl text-[#0a192f] font-bold mt-2">
                  <TextEffect per="word" preset="fade-in-blur">
                    {`Thank You, ${fullName}!`}
                  </TextEffect>
                </h3>
                <p className="font-cormorant text-lg text-[#0a192f] italic font-bold mt-3">
                  &ldquo;Your gracious presence will illuminate Shri Thakurji&apos;s 25th Birthday Silver Jubilee Janmashtami Mahotsav.&rdquo;
                </p>
              </div>

              <div className="pt-4">
                <motion.button
                  onClick={handleDownloadCalendar}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-3 min-h-[44px] rounded-sm bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] text-[#f8fafc] font-cinzel text-xs tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 mx-auto font-bold border-[2px] border-slate-300/80 hover:brightness-110 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-slate-300" />
                  <span>DOWNLOAD CALENDAR REMINDER (.ICS)</span>
                </motion.button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-slate-500 font-cinzel text-[10px] tracking-widest uppercase font-bold mt-6">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>JAI SHRI KRISHNA</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </InView>
  );
};
