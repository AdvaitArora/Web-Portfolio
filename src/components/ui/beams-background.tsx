import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

const INTENSITY_MAP = {
  subtle: { opacity: 0.35, count: 14 },
  medium: { opacity: 0.55, count: 20 },
  strong: { opacity: 0.75, count: 28 },
};

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.4 + Math.random() * 0.9,
    opacity: 0.1 + Math.random() * 0.25,
    hue: 270 + Math.random() * 50,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.015 + Math.random() * 0.025,
  };
}

export function BeamsBackground({
  className,
  children,
  intensity = "medium",
}: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>(0);
  const cfg = INTENSITY_MAP[intensity];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      beamsRef.current = Array.from({ length: cfg.count }, () =>
        createBeam(rect.width, rect.height)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const drawBeam = (beam: Beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);
      const pulse = (Math.sin(beam.pulse) + 1) / 2;
      const o = beam.opacity * (0.6 + pulse * 0.4) * cfg.opacity;

      const grad = ctx.createLinearGradient(0, 0, 0, beam.length);
      grad.addColorStop(0, `hsla(${beam.hue}, 90%, 65%, 0)`);
      grad.addColorStop(0.15, `hsla(${beam.hue}, 90%, 65%, ${o * 0.6})`);
      grad.addColorStop(0.5, `hsla(${beam.hue}, 90%, 65%, ${o})`);
      grad.addColorStop(0.85, `hsla(${beam.hue}, 90%, 65%, ${o * 0.6})`);
      grad.addColorStop(1, `hsla(${beam.hue}, 90%, 65%, 0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.filter = "blur(30px)";

      beamsRef.current.forEach((beam) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -200) {
          Object.assign(beam, createBeam(rect.width, rect.height));
          beam.y = rect.height + 200;
        }
        drawBeam(beam);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cfg.count, cfg.opacity]);

  return (
    <div className={cn("relative overflow-hidden bg-[#0a0a0a]", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[#0a0a0a]/20"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
