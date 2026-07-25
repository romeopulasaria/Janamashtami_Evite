"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

interface StarParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
}

export const BackgroundCanvas: React.FC<{ activeState?: string }> = ({ activeState }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize Marigold & Gold Petals
    const petalColors = [
      "rgba(251, 191, 36, 0.8)",  // amber-400
      "rgba(245, 158, 11, 0.7)",  // amber-500
      "rgba(212, 175, 55, 0.6)",  // metallic gold
      "rgba(252, 211, 77, 0.8)",  // amber-300
    ];

    // Heavy optimization for mobile to ensure buttery smooth scrolling
    const isMobile = width < 768;
    const petalCount = isMobile ? 12 : 35;
    
    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: Math.sin(Math.random() * Math.PI) * 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.4,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    // Initialize Glowing Golden Motes (resembling light of diyas)
    const starCount = isMobile ? 30 : 70;
    const stars: StarParticle[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 0.3 + 0.1),
      opacity: Math.random() * 0.6 + 0.2,
      maxOpacity: Math.random() * 0.8 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Draw single marigold petal shape
    const drawPetal = (ctx: CanvasRenderingContext2D, p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.beginPath();
      // Slightly rounder petal shape for marigold
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size, -p.size * 0.5, p.size, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size, p.size * 0.5, -p.size, -p.size * 0.5, 0, -p.size);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    };

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Render Ambient Glow at Bottom
      const glowGradient = ctx.createLinearGradient(0, height * 0.6, 0, height);
      glowGradient.addColorStop(0, "rgba(3, 105, 161, 0)"); // transparent sky
      glowGradient.addColorStop(1, "rgba(212, 175, 55, 0.15)"); // subtle gold reflection at bottom
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, height * 0.6, width, height * 0.4);

      // Render Glowing Golden Motes
      stars.forEach((star) => {
        star.y += star.speedY;
        star.opacity += Math.sin(time * 5) * star.pulseSpeed;

        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        // Golden color for motes
        ctx.fillStyle = "rgba(253, 230, 138, " + Math.max(0.1, Math.min(0.9, star.opacity)) + ")";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(212, 175, 55, 0.8)";
        ctx.fill();
        ctx.restore();
      });

      // Render Marigold Petals
      petals.forEach((petal) => {
        petal.y += petal.speedY;
        petal.x += Math.sin(time + petal.y * 0.01) * 0.6 + petal.speedX;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }

        drawPetal(ctx, petal);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeState]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
