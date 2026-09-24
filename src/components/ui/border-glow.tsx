import type { ReactNode } from "react";
import "./border-glow.css";

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
}

export function BorderGlow({ children, className = "" }: BorderGlowProps) {
  return (
    <div className={`border-glow-card ${className}`}>
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
