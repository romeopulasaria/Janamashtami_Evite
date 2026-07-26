"use client";

import React, { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  padZero?: boolean;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  className = "",
  padZero = true,
}) => {
  const animatedValue = useSpring(value, {
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  });

  useEffect(() => {
    animatedValue.set(value);
  }, [value, animatedValue]);

  const displayValue = useTransform(animatedValue, (current) => {
    const rounded = Math.max(0, Math.floor(current));
    return padZero ? String(rounded).padStart(2, "0") : String(rounded);
  });

  return <motion.span className={className}>{displayValue}</motion.span>;
};
