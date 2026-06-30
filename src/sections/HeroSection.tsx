import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/brand-icons";
import { ShadowOverlay } from "@/components/ui/shadow-overlay";

const SKILL_BADGES = [
  { label: "Power BI", x: "-14%", y: "12%", delay: 0.9 },
  { label: "SQL", x: "108%", y: "20%", delay: 1.0 },
  { label: "Python", x: "110%", y: "52%", delay: 1.1 },
  { label: "SAP", x: "-10%", y: "60%", delay: 1.2 },
  { label: "Excel", x: "106%", y: "84%", delay: 1.3 },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-16 isolate"
    >
      <div className="absolute inset-0 z-0">
        <ShadowOverlay
          color="rgba(168, 85, 247, 0.85)"
          animation={{ scale: 65, speed: 55 }}
          noise={{ opacity: 0.35, scale: 1.2 }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-[1.25fr_1fr] gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-[#a3a3a3] mb-3 font-mono tracking-wider uppercase"
          >
            Hey, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-[18vw] md:text-[9rem] lg:text-[11rem] leading-[0.85] tracking-tight text-white"
          >
            ADVAIT
            <br />
            ARORA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-lg md:text-xl text-[#a3a3a3] font-light"
          >
            Business Analyst &mdash; Data, Process & BI
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex items-center gap-4"
          >
            <div className="h-px w-14 bg-[#a855f7]" />
            <p className="text-base md:text-lg text-white/90 italic">
              From Raw Data to Real Decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a href="#contact" className="btn-primary">
              Hire Me <ArrowRight size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/advait-arora"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </motion.div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-[260px] h-[340px] md:w-[320px] md:h-[420px] rounded-3xl overflow-hidden border border-[#262626] animate-pulse-glow bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
              <img
                src="/advait.jpg"
                alt="Advait Arora"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.15),transparent_60%)] pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
            </div>

            {SKILL_BADGES.map((b) => (
              <motion.span
                key={b.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: b.delay }}
                style={{ left: b.x, top: b.y }}
                className="absolute chip backdrop-blur-sm bg-black/60 animate-float-slow"
              >
                {b.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#525252] flex flex-col items-center gap-1 animate-scroll-hint">
        <span className="text-[10px] uppercase tracking-widest font-mono">
          Scroll
        </span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
