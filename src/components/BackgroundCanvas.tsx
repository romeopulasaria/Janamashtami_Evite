"use client";

import React, { useEffect, useRef } from "react";

type FlowerVariant = "jasmine" | "lotus" | "marigold" | "blossom" | "peacock";
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
  scaleX: number; // For subtle 3D flip effect while falling
  flipSpeed: number;
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

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    // Particle Density: Desktop (40 petals), Tablet (28 petals), Mobile (20 petals)
    const targetCount = isMobile ? 20 : isTablet ? 28 : 40;

    const createParticle = (initialYOverride?: number): FlowerParticle => {
      // 5% chance of peacock feather, equal distribution of jasmine, lotus, marigold, blossom
      const rand = Math.random();
      let variant: FlowerVariant = "jasmine";
      if (rand < 0.05) variant = "peacock";
      else if (rand < 0.28) variant = "lotus";
      else if (rand < 0.52) variant = "marigold";
      else if (rand < 0.76) variant = "blossom";

      // Layer distribution: 30% bg, 50% mid, 20% fg
      let layer: DepthLayer = "mid";
      const layerRand = Math.random();
      if (layerRand < 0.3) layer = "bg";
      else if (layerRand > 0.8) layer = "fg";

      // Depth parameters
      let layerScale = 1;
      let layerSpeedMult = 1;
      let layerOpacityMult = 1;

      if (layer === "bg") {
        layerScale = 0.55;
        layerSpeedMult = 0.65;
        layerOpacityMult = 0.5;
      } else if (layer === "fg") {
        layerScale = 1.35;
        layerSpeedMult = 1.3;
        layerOpacityMult = 0.95;
      } else {
        layerScale = 0.95;
        layerSpeedMult = 1.0;
        layerOpacityMult = 0.8;
      }

      // Fall duration: 8 to 18 seconds -> pixels per frame
      const fallDurationSeconds = 8 + Math.random() * 10;
      const baseSpeedY = ((height + 100) / (fallDurationSeconds * 60)) * layerSpeedMult;

      return {
        x: Math.random() * width,
        y: initialYOverride !== undefined ? initialYOverride : -40 - Math.random() * 100,
        variant,
        layer,
        size: (variant === "peacock" ? 22 : variant === "blossom" ? 12 : 16) * layerScale,
        baseSpeedY,
        driftAmplitude: 0.4 + Math.random() * 0.8,
        driftFrequency: 0.008 + Math.random() * 0.012,
        driftPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        opacity: (0.6 + Math.random() * 0.35) * layerOpacityMult,
        scaleX: 1,
        flipSpeed: 0.01 + Math.random() * 0.02,
      };
    };

    // Initialize particles spread evenly across height on load so rain is continuous
    const particles: FlowerParticle[] = Array.from({ length: targetCount }, (_, i) => {
      const ySpread = (height / targetCount) * i - Math.random() * 50;
      return createParticle(ySpread);
    });

    /* ── PROCEDURAL DRAWING ROUTINES ── */

    // 1. Ivory Jasmine Petal
    const drawJasmine = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.5, -size * 0.4, size * 0.6, size * 0.4, 0, size);
      ctx.bezierCurveTo(-size * 0.6, size * 0.4, -size * 0.5, -size * 0.4, 0, -size);
      
      const grad = ctx.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, "rgba(255, 255, 248, 0.95)");
      grad.addColorStop(0.7, "rgba(247, 243, 222, 0.9)");
      grad.addColorStop(1, "rgba(230, 220, 190, 0.75)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Delicate central rib
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.lineTo(0, size * 0.6);
      ctx.strokeStyle = "rgba(212, 195, 150, 0.4)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    // 2. Soft Pink Lotus Petal
    const drawLotus = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.1);
      ctx.bezierCurveTo(size * 0.75, -size * 0.3, size * 0.7, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size * 0.7, size * 0.5, -size * 0.75, -size * 0.3, 0, -size * 1.1);
      
      const grad = ctx.createLinearGradient(0, -size * 1.1, 0, size);
      grad.addColorStop(0, "rgba(244, 114, 182, 0.95)"); // Soft Lotus Pink
      grad.addColorStop(0.5, "rgba(251, 207, 232, 0.9)");
      grad.addColorStop(1, "rgba(255, 241, 242, 0.75)");
      ctx.fillStyle = grad;
      ctx.fill();
    };

    // 3. Pale Marigold Petal
    const drawMarigold = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.9);
      ctx.bezierCurveTo(size * 0.9, -size * 0.6, size * 0.8, size * 0.7, 0, size * 0.8);
      ctx.bezierCurveTo(-size * 0.8, size * 0.7, -size * 0.9, -size * 0.6, 0, -size * 0.9);
      
      const grad = ctx.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, "rgba(251, 191, 36, 0.95)"); // Warm Marigold Amber
      grad.addColorStop(0.6, "rgba(245, 158, 11, 0.85)");
      grad.addColorStop(1, "rgba(217, 119, 6, 0.7)");
      ctx.fillStyle = grad;
      ctx.fill();
    };

    // 4. Tiny White Blossom (5-petaled miniature flower)
    const drawBlossom = (ctx: CanvasRenderingContext2D, size: number) => {
      const petalRadius = size * 0.45;
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const px = Math.cos(angle) * (size * 0.4);
        const py = Math.sin(angle) * (size * 0.4);
        
        ctx.beginPath();
        ctx.arc(px, py, petalRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 250, 0.9)";
        ctx.fill();
      }
      // Yellow stamen center
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245, 158, 11, 0.95)";
      ctx.fill();
    };

    // 5. Rare Peacock Feather
    const drawPeacockFeather = (ctx: CanvasRenderingContext2D, size: number) => {
      // Shaft
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.2);
      ctx.quadraticCurveTo(size * 0.2, 0, 0, size * 1.2);
      ctx.strokeStyle = "rgba(180, 210, 200, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Outer green plume eye
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.6, size * 0.5, size * 0.65, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(16, 185, 129, 0.75)"; // Emerald
      ctx.fill();

      // Cyan inner ring
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.6, size * 0.32, size * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(14, 165, 233, 0.85)"; // Peacock Blue/Cyan
      ctx.fill();

      // Deep Royal Blue Center
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.55, size * 0.18, size * 0.22, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
      ctx.fill();
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // VRINDAVAN BREEZE DRIFT
        p.y += p.baseSpeedY;
        const drift = Math.sin(tick * p.driftFrequency + p.driftPhase) * p.driftAmplitude;
        p.x += drift;
        p.rotation += p.rotationSpeed;
        p.scaleX = Math.cos(tick * p.flipSpeed);

        // Respawn when exiting bottom of screen
        if (p.y > height + 40) {
          Object.assign(p, createParticle(-40));
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(p.scaleX, 1);
        ctx.globalAlpha = p.opacity;

        // Apply layer-specific blur for background depth
        if (p.layer === "bg") {
          ctx.filter = "blur(1.5px)";
        } else {
          ctx.filter = "none";
        }

        switch (p.variant) {
          case "jasmine":
            drawJasmine(ctx, p.size);
            break;
          case "lotus":
            drawLotus(ctx, p.size);
            break;
          case "marigold":
            drawMarigold(ctx, p.size);
            break;
          case "blossom":
            drawBlossom(ctx, p.size);
            break;
          case "peacock":
            drawPeacockFeather(ctx, p.size);
            break;
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause animation when browser tab is inactive to preserve performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
