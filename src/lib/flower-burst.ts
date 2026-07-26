export const triggerFlowerBurst = (
  originElement: HTMLElement | null,
  prefersReducedMotion: boolean
) => {
  if (!originElement || typeof document === "undefined") return;

  const rect = originElement.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const isMobile = window.innerWidth < 768;
  const particleCount = prefersReducedMotion ? 6 : (isMobile ? 30 : 45);

  const colors = [
    { bg: "#f472b6", type: "petal" }, // Pink rose
    { bg: "#fbbf24", type: "petal" }, // Marigold yellow
    { bg: "#ea580c", type: "petal" }, // Saffron orange
    { bg: "#fef08a", type: "petal" }, // Soft yellow
    { bg: "#fffdf0", type: "jasmine" }, // Jasmine white
    { bg: "#d4af37", type: "gold" }, // Antique gold fragment
  ];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    
    // Choose color and shape
    const colorObj = colors[Math.floor(Math.random() * colors.length)];
    
    // Base styles
    particle.style.position = "fixed";
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";
    particle.style.background = colorObj.bg;
    
    // Size and shape
    const size = colorObj.type === "gold" ? 4 + Math.random() * 3 : 8 + Math.random() * 8;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    if (colorObj.type === "jasmine") {
      particle.style.borderRadius = "40% 60% 60% 40%";
      particle.style.boxShadow = "inset -1px -1px 2px rgba(0,0,0,0.1)";
    } else if (colorObj.type === "gold") {
      particle.style.borderRadius = "1px";
      particle.style.boxShadow = "0 0 6px rgba(212,175,55,0.6)";
    } else {
      particle.style.borderRadius = "0% 50% 50% 50%"; // Classic petal shape
    }

    document.body.appendChild(particle);

    // Physics Initialization
    const angleFull = Math.random() * Math.PI * 2;
    const speed = prefersReducedMotion ? 50 + Math.random() * 100 : 150 + Math.random() * 450;
    
    let vx = Math.cos(angleFull) * speed;
    let vy = Math.sin(angleFull) * speed;
    
    // Bias the burst strongly upward and slightly outward
    if (!prefersReducedMotion) {
      vy -= 300 + Math.random() * 200; // Strong upward bias
      vx *= 1.2; // Widen the horizontal spread
    } else {
      vy = Math.abs(vy); // Only fall down for reduced motion
    }

    const duration = prefersReducedMotion 
      ? 1500 + Math.random() * 1000 
      : 3000 + Math.random() * 2000;
      
    const initialRotation = Math.random() * 360;
    const rotationSpeed = (Math.random() - 0.5) * 1000;
    
    // Physics Simulation for Keyframes
    const keyframes = [];
    const steps = 20;
    let currX = 0;
    let currY = 0;
    let currentVx = vx;
    let currentVy = vy;
    const drag = prefersReducedMotion ? 0.95 : 0.92;
    const gravity = 700; // Gravity pull

    for (let j = 0; j <= steps; j++) {
      const progress = j / steps; 
      const timeStep = (duration / 1000) / steps;
      
      let scale = 1;
      let opacity = 1;
      
      // Pop in
      if (progress < 0.05) {
        scale = progress * 20;
      }
      
      // Fade out naturally
      if (progress > 0.75) {
        opacity = 1 - ((progress - 0.75) * 4);
      }
      
      // Horizontal organic flutter/sway for petals
      const flutterX = colorObj.type === "petal" ? Math.sin(progress * Math.PI * 4 + initialRotation) * 15 : 0;
      
      keyframes.push({
        transform: `translate(-50%, -50%) translate(${currX + flutterX}px, ${currY}px) rotate(${initialRotation + rotationSpeed * progress}deg) scale(${scale})`,
        opacity: opacity,
        offset: progress
      });

      currX += currentVx * timeStep;
      currY += currentVy * timeStep;
      
      currentVx *= drag;
      currentVy += gravity * timeStep;
    }

    const animation = particle.animate(keyframes, {
      duration,
      easing: 'linear',
      fill: 'forwards'
    });

    animation.onfinish = () => {
      particle.remove();
    };
  }
};
