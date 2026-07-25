"use client";

import React, { useEffect, useRef } from "react";

type FlowerVariant = "jasmine" | "lotus" | "marigold" | "blossom";
type DepthLayer = "bg" | "mid" | "fg";

interface FlowerParticle {
  x: number;
  y: number;
  variant: FlowerVariant;
  layer: DepthLayer;
  size: number;
  baseSpeedY: number;
  driftAmplitude: number;
  driftFrequency: number;
  driftPhase: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  scaleX: number;
  flipSpeed: number;
}

/**
 * Global continuous flower rain particle engine.
 *
 * CRITICAL: The useEffect dependency array is EMPTY [] so the particle
 * system is created exactly ONCE and never torn down during page state
 * transitions (Landing → ScrollJourney → RSVP etc.). This guarantees
 * petals survive seamlessly across every screen.
 */
export const BackgroundCanvas: React.FC<{ activeState?: string }> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
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

    // Responsive particle counts:
    // Desktop (≥1024): 35 petals | Tablet (640–1023): 22 petals | Mobile (<640): 12 petals
    const w = window.innerWidth;
    const isMobile = w < 640;
    const targetCount = isMobile ? 12 : w < 1024 ? 22 : 35;

    const createParticle = (initialY?: number): FlowerParticle => {
      // Equal distribution across 4 flower types
      const variants: FlowerVariant[] = ["jasmine", "lotus", "marigold", "blossom"];
      const variant = variants[Math.floor(Math.random() * variants.length)];

      // Layer distribution: 30% bg, 50% mid, 20% fg
      let layer: DepthLayer = "mid";
      const lr = Math.random();
      if (lr < 0.3) layer = "bg";
      else if (lr > 0.8) layer = "fg";

      // Depth-dependent scale, speed, opacity
      const depthConfig = {
        bg:  { scale: 0.6,  speedMult: 0.6,  opacityMult: 0.45 },
        mid: { scale: 1.0,  speedMult: 1.0,  opacityMult: 0.75 },
        fg:  { scale: 1.4,  speedMult: 1.35, opacityMult: 0.95 },
      };
      const dc = depthConfig[layer];

      // Fall duration 8–18 seconds → pixels per frame at 60fps
      const fallSec = 8 + Math.random() * 10;
      const baseSpeedY = ((height + 80) / (fallSec * 60)) * dc.speedMult;

      // Reduced size on mobile (0.65 scale) for non-cluttered portrait viewport
      const mobileSizeScale = isMobile ? 0.65 : 1.0;
      const baseSize = (variant === "blossom" ? 9 : 13) * mobileSizeScale;

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : -30 - Math.random() * 80,
        variant,
        layer,
        size: (baseSize + Math.random() * (isMobile ? 4 : 6)) * dc.scale,
        baseSpeedY,
        driftAmplitude: (isMobile ? 0.2 : 0.3) + Math.random() * (isMobile ? 0.4 : 0.7),
        driftFrequency: 0.006 + Math.random() * 0.014,
        driftPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.018,
        opacity: (0.55 + Math.random() * 0.4) * dc.opacityMult,
        scaleX: 1,
        flipSpeed: 0.008 + Math.random() * 0.018,
      };
    };

    // Spread particles across the full viewport height on init so rain is
    // immediately visible rather than waiting 8+ seconds for the first wave.
    const particles: FlowerParticle[] = Array.from({ length: targetCount }, (_, i) => {
      const ySpread = Math.random() * (height + 60) - 30;
      return createParticle(ySpread);
    });

    /* ── PROCEDURAL PETAL DRAWING ─────────────────────────────────── */

    const drawJasmine = (ctx: CanvasRenderingContext2D, s: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.5, -s * 0.4, s * 0.6, s * 0.4, 0, s);
      ctx.bezierCurveTo(-s * 0.6, s * 0.4, -s * 0.5, -s * 0.4, 0, -s);
      ctx.fillStyle = "rgba(255,255,245,0.92)";
      ctx.fill();
      // Central rib
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.7);
      ctx.lineTo(0, s * 0.5);
      ctx.strokeStyle = "rgba(212,195,150,0.35)";
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    const drawLotus = (ctx: CanvasRenderingContext2D, s: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.1);
      ctx.bezierCurveTo(s * 0.75, -s * 0.3, s * 0.7, s * 0.5, 0, s);
      ctx.bezierCurveTo(-s * 0.7, s * 0.5, -s * 0.75, -s * 0.3, 0, -s * 1.1);
      ctx.fillStyle = "rgba(244,140,186,0.88)";
      ctx.fill();
    };

    const drawMarigold = (ctx: CanvasRenderingContext2D, s: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.9);
      ctx.bezierCurveTo(s * 0.85, -s * 0.55, s * 0.75, s * 0.65, 0, s * 0.8);
      ctx.bezierCurveTo(-s * 0.75, s * 0.65, -s * 0.85, -s * 0.55, 0, -s * 0.9);
      ctx.fillStyle = "rgba(251,191,36,0.9)";
      ctx.fill();
    };

    const drawBlossom = (ctx: CanvasRenderingContext2D, s: number) => {
      const pr = s * 0.4;
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * s * 0.35, Math.sin(a) * s * 0.35, pr, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,248,0.88)";
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245,158,11,0.9)";
      ctx.fill();
    };

    const drawFns: Record<FlowerVariant, (ctx: CanvasRenderingContext2D, s: number) => void> = {
      jasmine: drawJasmine,
      lotus: drawLotus,
      marigold: drawMarigold,
      blossom: drawBlossom,
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Physics — gentle Vrindavan breeze
        p.y += p.baseSpeedY;
        p.x += Math.sin(tick * p.driftFrequency + p.driftPhase) * p.driftAmplitude;
        p.rotation += p.rotationSpeed;
        p.scaleX = Math.cos(tick * p.flipSpeed);

        // Respawn above viewport when past bottom
        if (p.y > height + 40) {
          const fresh = createParticle(-30 - Math.random() * 40);
          particles[i] = fresh;
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.scaleX, 1);
        ctx.globalAlpha = p.opacity;

        // NO ctx.filter usage — it destroys perf on mobile.
        // Depth is conveyed through size + opacity alone.

        drawFns[p.variant](ctx, p.size);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause when tab hidden, resume when visible
    const onVisChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", onVisChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVisChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // ← EMPTY dependency: particle system is created ONCE, never torn down

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none w-full h-full"
      style={{ zIndex: 60 }}
    />
  );
};
