import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

const INTENSITY_MAP = {
  subtle: { opacity: 0.35, count: 10 },
  medium: { opacity: 0.55, count: 14 },
  strong: { opacity: 0.75, count: 18 },
};

// Each beam is a soft gradient element animated with transform/opacity only
// (see `.beams-bg` in index.css), so it runs on the compositor with no
// per-frame JavaScript. Layouts are rolled once per intensity at load.
function createBeams(count: number, opacity: number): CSSProperties[] {
  return Array.from({ length: count }, (_, i) => {
    const base = 0.1 + Math.random() * 0.25;
    return {
      // one beam per slice of the width, jittered, so they never clump
      "--x": `${-10 + ((i + Math.random()) / count) * 120}%`,
      "--w": `${170 + Math.random() * 130}px`,
      "--angle": `${-35 + Math.random() * 10}deg`,
      "--h": Math.round(270 + Math.random() * 50),
      "--o": +(base * opacity * 0.9).toFixed(3),
      "--travel": `${-(20 + Math.random() * 15)}%`,
      "--drift": `${24 + Math.random() * 24}s`,
      "--pulse": `${5 + Math.random() * 6}s`,
      "--delay": `${-Math.random() * 40}s`,
    } as CSSProperties;
  });
}

const BEAMS = Object.fromEntries(
  Object.entries(INTENSITY_MAP).map(([key, { count, opacity }]) => [
    key,
    createBeams(count, opacity),
  ])
) as Record<keyof typeof INTENSITY_MAP, CSSProperties[]>;

export function BeamsBackground({
  className,
  children,
  intensity = "medium",
}: BeamsBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Pause the drift/pulse animations while the section is off-screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        root.dataset.active = String(entry.isIntersecting);
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("beams-bg relative overflow-hidden bg-[#0a0a0a]", className)}
    >
      <div className="absolute inset-0" aria-hidden>
        {BEAMS[intensity].map((style, i) => (
          <div key={i} className="beam" style={style} />
        ))}
      </div>
      <div
        className="absolute inset-0 bg-[#0a0a0a]/20"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
