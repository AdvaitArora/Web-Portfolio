import { motion } from "motion/react";
import {
  Bike,
  MapPin,
  Music2,
  Play,
  SkipBack,
  SkipForward,
  TrendingUp,
} from "lucide-react";
import { BorderGlow } from "@/components/ui/border-glow";

export function BeyondDashboardSection() {
  return (
    <section id="beyond" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#a855f7] mb-4">
            ― When I'm Off the Clock
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight">
            BEYOND THE
            <br />
            <span className="gradient-text">DASHBOARD.</span>
          </h2>
          <div className="mx-auto w-16 h-px bg-[#a855f7] my-8" />
          <p className="text-[#a3a3a3] max-w-xl mx-auto">
            The other graphs I read — pitches, candles, playlists, roadmaps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CricketCard />
          <TradingCard />
          <BikesCard />
          <MusicCard />
          <TravelCard />
        </div>
      </div>
    </section>
  );
}

function CricketCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-2"
    >
      <BorderGlow className="h-full min-h-[280px]" glowColor="142 71 45">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f0a] via-[#0a0a0a] to-[#0a0a0a]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 36px, rgba(34,197,94,0.05) 36px, rgba(34,197,94,0.05) 37px)",
            }}
          />
          <svg
            className="absolute inset-0 w-full h-full opacity-25"
            preserveAspectRatio="none"
            viewBox="0 0 400 280"
          >
            <ellipse cx="200" cy="280" rx="320" ry="170" fill="none" stroke="#22c55e" strokeWidth="1" />
            <ellipse cx="200" cy="280" rx="180" ry="100" fill="none" stroke="#22c55e" strokeWidth="1" />
            <rect x="190" y="200" width="20" height="80" fill="none" stroke="#22c55e" strokeWidth="1" />
          </svg>

          <div className="relative p-7 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">🏏</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#22c55e]">
                Cricket · Player Profile
              </span>
            </div>

            <h3 className="font-display text-5xl md:text-6xl text-white leading-[0.9]">
              OUT ON
              <br />
              <span className="text-[#22c55e]">THE PITCH.</span>
            </h3>

            <div className="mt-auto pt-8 grid grid-cols-3 gap-4">
              <div className="border-l-2 border-[#22c55e] pl-3">
                <p className="text-[10px] font-mono uppercase text-[#525252] tracking-wider">
                  Matches Led
                </p>
                <p className="font-display text-3xl md:text-4xl text-white leading-none mt-1">
                  30<span className="text-[#22c55e]">+</span>
                </p>
              </div>
              <div className="border-l-2 border-[#22c55e] pl-3">
                <p className="text-[10px] font-mono uppercase text-[#525252] tracking-wider">
                  Level
                </p>
                <p className="font-display text-2xl md:text-3xl text-white leading-none mt-1">
                  U-16
                </p>
                <p className="text-[10px] font-mono text-[#a3a3a3] mt-0.5">
                  National
                </p>
              </div>
              <div className="border-l-2 border-[#22c55e] pl-3">
                <p className="text-[10px] font-mono uppercase text-[#525252] tracking-wider">
                  Role
                </p>
                <p className="font-display text-2xl md:text-3xl text-white leading-none mt-1">
                  Batsman
                </p>
              </div>
            </div>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

function TradingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="h-full"
    >
      <BorderGlow className="h-full" glowColor="142 71 45">
        <div className="p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-[#22c55e]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#22c55e]">
            NIFTY 50
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#525252]">1W</span>
      </div>
      <p className="font-display text-3xl text-white mt-1 leading-none">
        22,847.50
      </p>
      <p className="text-xs text-[#22c55e] font-mono mt-1">
        ▲ 283.15 (+1.25%)
      </p>

      <svg viewBox="0 0 200 80" className="w-full h-24 mt-4" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,58 L20,52 L40,60 L60,44 L80,50 L100,38 L120,46 L140,30 L160,35 L180,20 L200,14 L200,80 L0,80 Z"
          fill="url(#chartGrad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.path
          d="M0,58 L20,52 L40,60 L60,44 L80,50 L100,38 L120,46 L140,30 L160,35 L180,20 L200,14"
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>

      <p className="text-xs text-[#a3a3a3] italic mt-auto pt-3 border-t border-[#1a1a1a]">
        "I read candles as well as I read dashboards."
      </p>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

function BikesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="h-full"
    >
      <BorderGlow className="h-full group">
        <div className="p-6 flex flex-col h-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a1a] via-[#0a0a0a] to-[#0a0a0a]" />

      <div className="relative flex items-center gap-2 mb-4">
        <Bike size={16} className="text-[#a855f7]" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#a855f7]">
          On Two Wheels
        </span>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-2">
        <svg viewBox="0 0 200 130" className="w-full max-w-[200px]">
          <defs>
            <linearGradient id="speedGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="55%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path
            d="M25,105 A80,80 0 0,1 175,105"
            fill="none"
            stroke="#262626"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <motion.path
            d="M25,105 A80,80 0 0,1 175,105"
            fill="none"
            stroke="url(#speedGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.78 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          />
          {[0, 25, 50, 75, 100].map((mark, i) => {
            const angle = -180 + (mark / 100) * 180;
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + Math.cos(rad) * 70;
            const y1 = 105 + Math.sin(rad) * 70;
            const x2 = 100 + Math.cos(rad) * 60;
            const y2 = 105 + Math.sin(rad) * 60;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#525252"
                strokeWidth="1.5"
              />
            );
          })}
          <motion.g
            initial={{ rotate: -90 }}
            whileInView={{ rotate: 50 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
            style={{ transformOrigin: "100px 105px" }}
          >
            <line
              x1="100"
              y1="105"
              x2="100"
              y2="40"
              stroke="#a855f7"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
          <circle cx="100" cy="105" r="6" fill="#a855f7" />
          <circle cx="100" cy="105" r="2" fill="#0a0a0a" />
          <text
            x="100"
            y="125"
            textAnchor="middle"
            fill="#a3a3a3"
            fontSize="9"
            fontFamily="monospace"
          >
            KM/H
          </text>
        </svg>
      </div>

      <p className="relative text-sm text-white/85 italic mt-2">
        "Miles clear the mind that spreadsheets can't."
      </p>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

function MusicCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="h-full"
    >
      <BorderGlow className="h-full" glowColor="330 81 60">
        <div className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Music2 size={16} className="text-[#ec4899]" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#ec4899]">
          Now Playing
        </span>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative w-16 h-16 rounded-lg bg-gradient-to-br from-[#ec4899] via-[#a855f7] to-[#6366f1] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-9 h-9 rounded-full bg-black/80 flex items-center justify-center border border-white/20"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">Wonderful</p>
          <p className="text-xs text-[#a3a3a3] truncate">
            Travis Scott
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-1 bg-[#262626] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#ec4899] to-[#a855f7]"
            initial={{ width: "0%" }}
            whileInView={{ width: "64%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] font-mono text-[#525252]">
          <span>2:27</span>
          <span>3:50</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 mt-4 text-[#a3a3a3]">
        <SkipBack size={16} />
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_20px_rgba(236,72,153,0.4)]">
          <Play size={14} fill="black" className="ml-0.5" />
        </div>
        <SkipForward size={16} />
      </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

const TRAVEL_PINS = [
  { x: 14, y: 32, label: "London" },
  { x: 32, y: 48, label: "Dubai" },
  { x: 44, y: 54, label: "Mumbai" },
  { x: 55, y: 66, label: "Singapore" },
  { x: 66, y: 32, label: "Tokyo" },
  { x: 82, y: 28, label: "Sydney" },
];

function TravelCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="h-full"
    >
      <BorderGlow className="h-full">
        <div className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={16} className="text-[#a855f7]" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#a855f7]">
          Travel Log
        </span>
      </div>

      <div className="relative w-full aspect-[16/9] bg-black/40 rounded-lg overflow-hidden border border-[#1a1a1a]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, #404040 1px, transparent 1px)",
            backgroundSize: "7px 7px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_70%)]" />

        {TRAVEL_PINS.map((pin, i) => (
          <motion.div
            key={pin.label}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#a855f7] animate-ping opacity-60" />
              <div className="relative w-3 h-3 rounded-full bg-[#a855f7] shadow-[0_0_12px_rgba(168,85,247,0.9)] border border-white/40" />
            </div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black border border-[#a855f7]/50 rounded text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
              {pin.label}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-[#a3a3a3] mt-3">
        <span className="text-white font-semibold">6 cities</span> logged · always counting
      </p>
        </div>
      </BorderGlow>
    </motion.div>
  );
}
