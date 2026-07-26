import { Variants } from "framer-motion";

/**
 * Silver Jubilee Janmashtami Motion Tokens
 * Character: Elegant, Devotional, Luxurious, Slow, Organic, Restrained
 */

export const MOTION_DURATIONS = {
  FAST: 0.25,
  NORMAL: 0.5,
  CEREMONIAL: 1.2,
  HERO_SEQUENCE: 2.2,
};

export const MOTION_SPRINGS = {
  DEVOTIONAL_LUXURY: { stiffness: 140, damping: 22, mass: 0.9 },
  TACTLLE_BUTTON: { stiffness: 300, damping: 20 },
  DIGIT_ROLL: { stiffness: 160, damping: 18, mass: 0.8 },
  SCROLL_UNFURL: { stiffness: 90, damping: 16, mass: 1.1 },
};

export const MOTION_EASINGS = {
  CEREMONIAL_CURVE: [0.22, 1, 0.36, 1] as const,
  SMOOTH_OUT: [0.25, 0.1, 0.25, 1.0] as const,
  GENTLE_ENTER: [0.16, 1, 0.3, 1] as const,
};

// Reusable choreography variants
export const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerChildren = 0.15) => ({
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: 0.1,
    },
  }),
};

export const BLUR_REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.NORMAL,
      ease: MOTION_EASINGS.CEREMONIAL_CURVE,
    },
  },
};
