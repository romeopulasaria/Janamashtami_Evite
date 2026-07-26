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
 * Global continuous dual-layered flower rain particle engine.
 *
 * Canvas 1 (bgCanvasRef): z-index 5 (Petals behind cards)
 * Canvas 2 (fgCanvasRef): z-index 30 (Petals in front of cards, pointer-events: none)
 */
export const BackgroundCanvas: React.FC<{ activeState?: string }> = () => {
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const fgCanvas = fgCanvasRef.current;
    if (!bgCanvas || !fgCanvas) return;

    const bgCtx = bgCanvas.getContext("2d", { alpha: true });
    const fgCtx = fgCanvas.getContext("2d", { alpha: true });
    if (!bgCtx || !fgCtx) return;

    let animationFrameId: number;
    let width = (bgCanvas.width = fgCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = fgCanvas.height = window.innerHeight);

    const handleResize = () => {
      if (!bgCanvas || !fgCanvas) return;
      width = bgCanvas.width = fgCanvas.width = window.innerWidth;
      height = bgCanvas.height = fgCanvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const w = window.innerWidth;
    const isMobile = w < 640;
    const targetCount = isMobile ? 12 : w < 1024 ? 22 : 35;

    const createParticle = (initialY?: number): FlowerParticle => {
      const variants: FlowerVariant[] = ["jasmine", "lotus", "marigold", "blossom"];
      const variant = variants[Math.floor(Math.random() * variants.length)];

      let layer: DepthLayer = "mid";
      const lr = Math.random();
      if (lr < 0.35) layer = "bg";
      else if (lr > 0.8) layer = "fg";

      const depthConfig = {
        bg:  { scale: 0.65, speedMult: 0.6,  opacityMult: 0.5 },
        mid: { scale: 1.0,  speedMult: 1.0,  opacityMult: 0.75 },
        fg:  { scale: 1.35, speedMult: 1.35, opacityMult: 0.9 },
      };
      const dc = depthConfig[layer];

      const fallSec = 8 + Math.random() * 10;
      const baseSpeedY = ((height + 80) / (fallSec * 60)) * dc.speedMult;
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
      ctx.bezierCurveTo(-s * 0.85, s * 0.65, -s * 0.85, -s * 0.55, 0, -s * 0.9);
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
      bgCtx.clearRect(0, 0, width, height);
      fgCtx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.baseSpeedY;
        p.x += Math.sin(tick * p.driftFrequency + p.driftPhase) * p.driftAmplitude;
        p.rotation += p.rotationSpeed;
        p.scaleX = Math.cos(tick * p.flipSpeed);

        if (p.y > height + 40) {
          const fresh = createParticle(-30 - Math.random() * 40);
          particles[i] = fresh;
          continue;
        }

        // Target background canvas for 'bg' layer, foreground canvas for 'mid' and 'fg'
        const targetCtx = p.layer === "bg" ? bgCtx : fgCtx;

        targetCtx.save();
        targetCtx.translate(p.x, p.y);
        targetCtx.rotate(p.rotation);
        targetCtx.scale(p.scaleX, 1);
        targetCtx.globalAlpha = p.opacity;

        drawFns[p.variant](targetCtx, p.size);

        targetCtx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

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
  }, []);

  return (
    <>
      {/* Background Canvas Layer (Behind Cards) */}
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 pointer-events-none w-full h-full"
        style={{ zIndex: 5 }}
      />
      {/* Foreground Canvas Layer (In Front of Cards) */}
      <canvas
        ref={fgCanvasRef}
        className="fixed inset-0 pointer-events-none w-full h-full"
        style={{ zIndex: 30 }}
      />
    </>
  );
};
