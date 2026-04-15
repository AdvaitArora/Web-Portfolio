import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let i = 0; i < 4; i++) {
        const radius = 60 + i * 30 + Math.sin(t + i) * 6;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.35 - i * 0.07})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Stick figure — head
      const bob = Math.sin(t * 2) * 2;
      ctx.strokeStyle = "#f5f5f5";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy - 40 + bob, 14, 0, Math.PI * 2);
      ctx.stroke();
      // body
      ctx.beginPath();
      ctx.moveTo(cx, cy - 26 + bob);
      ctx.lineTo(cx, cy + 20 + bob);
      ctx.stroke();
      // arms
      ctx.beginPath();
      ctx.moveTo(cx - 18, cy - 5 + bob + Math.sin(t * 3) * 3);
      ctx.lineTo(cx, cy - 10 + bob);
      ctx.lineTo(cx + 18, cy - 5 + bob - Math.sin(t * 3) * 3);
      ctx.stroke();
      // legs
      ctx.beginPath();
      ctx.moveTo(cx - 12, cy + 40 + bob);
      ctx.lineTo(cx, cy + 20 + bob);
      ctx.lineTo(cx + 12, cy + 40 + bob);
      ctx.stroke();

      t += 0.04;
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex flex-col items-center justify-center px-6 py-24">
      <div className="relative mb-12">
        <canvas
          ref={canvasRef}
          className="w-[260px] h-[260px]"
          aria-hidden
        />
      </div>

      <h1 className="font-display text-[120px] leading-none md:text-[180px] tracking-tight">
        4<span className="gradient-text">0</span>4
      </h1>
      <p className="mt-2 text-lg text-[#a3a3a3] max-w-md text-center">
        This page got lost in the data lake. Let's head back to somewhere that exists.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button onClick={() => navigate(-1)} className="btn-ghost">
          <ArrowLeft size={18} /> Go Back
        </button>
        <button onClick={() => navigate("/")} className="btn-primary">
          <Home size={18} /> Home
        </button>
      </div>
    </main>
  );
}
