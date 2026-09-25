import { useEffect, useRef } from "react";

const TRAIL_COLORS = ["#a855f7", "#ec4899", "#f5f5f5"];

type Star = { x: number; y: number; r: number; phase: number; speed: number };
type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
};

export function ShootingStars({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let meteors: Meteor[] = [];

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.floor((w * h) / 9000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let raf = 0;
    let nextMeteor = 90;

    const drawStars = () => {
      for (const s of stars) {
        const twinkle = reduceMotion
          ? 0.7
          : 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
        ctx.globalAlpha = 0.25 + twinkle * 0.55;
        ctx.fillStyle = "#f5f5f5";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (reduceMotion) {
      drawStars();
      return () => window.removeEventListener("resize", resize);
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      drawStars();

      if (--nextMeteor <= 0) {
        // Cadence, speed, and directions match the 21st.dev ShootingStars
        // reference: a star every 1.2-4.2s, 10-30 px/frame, entering from a
        // random edge on that edge's 45° diagonal.
        nextMeteor = 72 + Math.random() * 180;
        const side = (Math.random() * 4) | 0;
        const angle = ([45, 135, 225, 315][side] * Math.PI) / 180;
        const speed = 10 + Math.random() * 20;
        meteors.push({
          x: side === 1 ? w + 20 : side === 3 ? -20 : Math.random() * w,
          y: side === 0 ? -20 : side === 2 ? h + 20 : Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 70 + Math.random() * 40,
          color: TRAIL_COLORS[(Math.random() * TRAIL_COLORS.length) | 0],
        });
      }

      // Cull margin covers the longest trail so tails never pop mid-screen.
      meteors = meteors.filter(
        (m) =>
          m.life < m.maxLife &&
          m.x > -340 &&
          m.x < w + 340 &&
          m.y > -340 &&
          m.y < h + 340
      );
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        const fade = 1 - m.life / m.maxLife;
        const tailX = m.x - m.vx * 10;
        const tailY = m.y - m.vy * 10;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, m.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.strokeStyle = grad;
        ctx.globalAlpha = 0.9 * fade;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      t += 0.02;
      raf = requestAnimationFrame(frame);
    };

    // Only run the loop while the canvas is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) frame();
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
