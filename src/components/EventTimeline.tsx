"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, Sparkles, Heart, Bell, Star, Flame, Utensils, Feather, BookOpen, User } from "lucide-react";

// --- CSS Animations to inject for background atmospheric effects ---
const Atmospherics = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes falling-petal {
      0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
      100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
    }
    @keyframes float-up {
      0% { transform: translateY(10vh) scale(0.8); opacity: 0; }
      50% { opacity: 0.6; }
      100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
    }
    .petal { position: absolute; width: 12px; height: 12px; background: #fbbf24; border-radius: 50% 0 50% 50%; opacity: 0; animation: falling-petal linear infinite; }
    .music-note { position: absolute; font-size: 24px; color: #0284c7; opacity: 0; animation: float-up linear infinite; }
  `}} />
);

export const EventTimeline: React.FC = () => {
  return (
    <div className="w-full relative overflow-hidden py-4 text-[#0a192f] font-inter">
      <Atmospherics />

      {/* ------------------------------------------------------------- */}
      {/* PHASE 1: DIVINE ARRIVAL (6:30 PM)                             */}
      {/* ------------------------------------------------------------- */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ margin: "-20%", once: true }}
        transition={{ duration: 1.5 }}
        className="relative py-12 sm:py-24 mb-8 sm:mb-12 rounded-3xl overflow-hidden shadow-xl border border-amber-300"
        style={{
          background: "linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)"
        }}
      >
        {/* Soft Golden Glow Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.3)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Falling Petals (Simulated using CSS) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
          {[...Array(15)].map((_, i) => (
            <div 
              key={`petal-${i}`} 
              className="petal" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 5}s`
              }} 
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-400 bg-white shadow-[0_0_40px_rgba(251,191,36,0.6)] flex items-center justify-center mb-4 sm:mb-6"
          >
            <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 animate-bounce" style={{ animationDuration: '3s' }} />
          </motion.div>

          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] sm:tracking-[0.3em] text-amber-700 uppercase mb-2">
            6:30 PM
          </span>
          <h3 className="font-cursive text-3xl sm:text-5xl md:text-6xl text-amber-900 drop-shadow-sm mb-3 sm:mb-4">
            Divine Arrival of Shri Thakurji
          </h3>
          <p className="font-cormorant text-lg sm:text-xl md:text-2xl font-bold text-amber-800 italic max-w-2xl">
            The ceremonial commencement. Witness the grand revelation of the altar as temple doors softly open to glowing diyas, conch-shell resonance, and raining flower petals.
          </p>
        </div>
      </motion.section>

      {/* ------------------------------------------------------------- */}
      {/* PHASE 2: DEVOTIONAL PERFORMANCES (6:30 - 8:00 PM)             */}
      {/* ------------------------------------------------------------- */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-20%", once: true }}
        transition={{ duration: 1.2 }}
        className="relative py-12 sm:py-20 px-4 sm:px-6 mb-8 sm:mb-12 rounded-3xl bg-[#fffdf0] border border-slate-300/50 shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
      >
        <div className="text-center mb-8 sm:mb-12">
          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#1e3a8a] uppercase mb-2 block">
            6:30 PM – 8:00 PM
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-[#0a192f] font-bold mb-3 sm:mb-4">
            Devotional Performances
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#1e3a8a] to-transparent mx-auto opacity-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: User, title: "Devotional Dance", desc: "Classical expressions of grace and devotion." },
            { icon: BookOpen, title: "Krishna Leela", desc: "Enchanting storytelling of the Lord's divine pastimes." },
            { icon: Star, title: "Children's Offering", desc: "Innocent and pure spiritual performances by young devotees." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/50 hover:bg-white transition-colors border border-transparent hover:border-slate-300 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-[#fffdf0] border border-slate-300 shadow-inner flex items-center justify-center text-[#1e3a8a] mb-4">
                <item.icon className="w-8 h-8" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-[#0a192f] mb-2">{item.title}</h4>
              <p className="font-inter text-sm font-medium text-slate-700 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ------------------------------------------------------------- */}
      {/* PHASE 3: LIVE BHAJAN SANDHYA (8:00 - 9:30 PM)                 */}
      {/* ------------------------------------------------------------- */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ margin: "-20%", once: true }}
        transition={{ duration: 1.5 }}
        className="relative py-12 sm:py-24 mb-8 sm:mb-12 rounded-3xl overflow-hidden shadow-lg border border-sky-200"
        style={{
          background: "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)"
        }}
      >
        {/* Floating Musical Notes (Simulated using CSS) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {[...Array(10)].map((_, i) => (
            <div 
              key={`note-${i}`} 
              className="music-note" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${8 + Math.random() * 7}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              {i % 2 === 0 ? "♪" : "♫"}
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6">
          <Feather className="w-10 h-10 sm:w-12 sm:h-12 text-sky-500 mb-4 sm:mb-6 drop-shadow-sm" />
          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#1e3a8a] uppercase mb-2">
            8:00 PM – 9:30 PM
          </span>
          <h3 className="font-cursive text-3xl sm:text-5xl md:text-6xl text-[#0a192f] drop-shadow-sm mb-3 sm:mb-4">
            Live Bhajan Sandhya
          </h3>
          <p className="font-cormorant text-lg sm:text-xl md:text-2xl font-bold text-[#0a192f]/80 italic max-w-2xl">
            As the evening deepens, immerse yourself in a serene musical gathering. Soulful kirtans, floating notes, and softly glowing lamps elevate collective devotion.
          </p>
        </div>
      </motion.section>

      {/* ------------------------------------------------------------- */}
      {/* PHASE 4: MAHAPRASADAM (9:30 PM ONWARDS)                       */}
      {/* ------------------------------------------------------------- */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "-20%", once: true }}
        transition={{ duration: 1.2 }}
        className="relative py-12 sm:py-24 mb-10 sm:mb-16 rounded-3xl overflow-hidden shadow-xl border border-amber-200"
        style={{
          background: "linear-gradient(180deg, #fdf8f6 0%, #fff7ed 100%)"
        }}
      >
        {/* Decorative corner mandalas (SVG) */}
        <svg className="absolute top-0 left-0 w-32 h-32 text-amber-500/10 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-32 h-32 text-amber-500/10 transform translate-x-1/2 translate-y-1/2" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center mb-4 sm:mb-6 shadow-sm">
            <Utensils className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
          </div>
          
          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] sm:tracking-[0.3em] text-orange-700 uppercase mb-2">
            9:30 PM Onwards
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-amber-950 font-bold mb-3 sm:mb-4">
            Midnight Mahaprasadam
          </h3>
          <p className="font-inter text-sm md:text-base font-medium text-amber-900 max-w-2xl leading-relaxed">
            The final celebration transitions into warmth and togetherness. Conclude the spiritual journey with a traditional, festive Sattvik banquet served with love in the rich glow of floral accents.
          </p>

          {/* Artistic Feast Motif */}
          <div className="mt-8 flex justify-center items-center space-x-4">
            <Flame className="w-5 h-5 text-amber-500" />
            <div className="h-[1px] w-12 bg-amber-300" />
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div className="h-[1px] w-12 bg-amber-300" />
            <Flame className="w-5 h-5 text-amber-500" />
          </div>
        </div>
      </motion.section>

      {/* ------------------------------------------------------------- */}
      {/* FAMILY MESSAGE BANNER                                         */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#fffdf0] rounded-2xl p-8 text-center relative overflow-hidden mb-12 shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-slate-300/50"
      >
        <Heart className="w-8 h-8 text-amber-500 mx-auto mb-4" />
        <h4 className="font-cinzel text-xl text-[#0a192f] font-bold mb-3">
          A Message from The Kumar Family
        </h4>
        <p className="font-cormorant text-lg md:text-xl text-[#0a192f]/90 italic leading-relaxed max-w-2xl mx-auto font-semibold">
          &ldquo;By the grace of Shri Thakurji, we complete 25 blissful years of love, guidance, and divine protection. Your gracious presence and heartfelt blessings will make this Silver Jubilee Janmashtami celebration truly complete.&rdquo;
        </p>
        <div className="mt-6 font-cinzel text-xs tracking-[0.3em] text-slate-500 uppercase font-bold">
          — WITH WARM REGARDS, THE KUMAR FAMILY
        </div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* DRESS CODE SECTION                                            */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-[#fffdf0] rounded-xl p-6 text-center border border-slate-300/50 max-w-lg mx-auto shadow-md"
      >
        <div className="flex items-center justify-center space-x-2 text-slate-500 font-cinzel text-xs tracking-[0.3em] uppercase mb-3 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>SUGGESTED DRESS CODE</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <p className="font-cinzel text-base text-[#0a192f] font-bold">
          Traditional Ethnic Formals • Midnight Blue, Ivory & Silver
        </p>
      </motion.div>

    </div>
  );
};
