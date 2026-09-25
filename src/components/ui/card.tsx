import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`card ${className}`}>
      <div className="card-inner">{children}</div>
    </div>
  );
}
