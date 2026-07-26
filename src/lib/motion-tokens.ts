import { Variants } from "framer-motion";

/**
 * Unified Motion Tokens for Shri Thakurji Silver Jubilee Invitation
 * 
 * Governing Metaphor: "An elegant printed invitation gradually revealing itself."
 * Primary Reveal Language: SOFT MASK REVEAL + OPACITY + MINIMAL VERTICAL MOVEMENT
 */

export const MOTION_TOKENS = {
  // Motion Durations (Seconds)
  duration: {
    ceremonial: 0.85,
    supporting: 0.6,
    functional: 0.4,
    staggerSmall: 0.08,
    staggerMajor: 0.18,
    enterTransition: 1.4,
  },
  
  // Motion Vertical Offsets (Pixels)
  offsetY: {
    ceremonialDesktop: 14,
    ceremonialMobile: 8,
    supportingDesktop: 8,
    supportingMobile: 5,
    functionalDesktop: 6,
    functionalMobile: 4,
  },

  // Motion Blurs (Pixels)
  blur: {
    ceremonial: "blur(4px)",
    none: "blur(0px)",
  },

  // Easing Curves (Refined Ease-Outs - NO BOUNCE)
  easing: {
    ceremonial: [0.22, 1, 0.36, 1] as const, // Smooth premium ease-out
    supporting: [0.25, 0.1, 0.25, 1.0] as const,
    functional: [0.16, 1, 0.3, 1] as const,
  },
};

/**
 * 1. CEREMONIAL REVEAL VARIANTS
 * For major headlines ("Shri Thakurji's 25th Birthday", chapter titles, final blessing)
 */
export const CEREMONIAL_REVEAL_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offsetY.ceremonialDesktop,
    filter: MOTION_TOKENS.blur.ceremonial,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: MOTION_TOKENS.blur.none,
    transition: {
      duration: MOTION_TOKENS.duration.ceremonial,
      delay,
      ease: MOTION_TOKENS.easing.ceremonial,
    },
  }),
};

/**
 * 2. SUPPORTING REVEAL VARIANTS
 * For subtitles, dates, venue names, timeline descriptions, family message
 */
export const SUPPORTING_REVEAL_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offsetY.supportingDesktop,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.supporting,
      delay,
      ease: MOTION_TOKENS.easing.supporting,
    },
  }),
};

/**
 * 3. FUNCTIONAL REVEAL VARIANTS
 * For buttons, UI badges, input controls, action links
 */
export const FUNCTIONAL_REVEAL_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.offsetY.functionalDesktop,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.functional,
      delay,
      ease: MOTION_TOKENS.easing.functional,
    },
  }),
};

/**
 * 4. CARD SURFACE POPULATION STAGGER
 */
export const CARD_SURFACE_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: MOTION_TOKENS.easing.ceremonial,
      staggerChildren: MOTION_TOKENS.duration.staggerSmall,
      delayChildren: 0.1,
    },
  },
};
