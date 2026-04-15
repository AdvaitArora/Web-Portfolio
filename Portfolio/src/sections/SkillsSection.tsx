import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { BorderGlow } from "@/components/ui/border-glow";

const SKILLS = [
  {
    category: "Business Analysis",
    icon: "📊",
    items: [
      "Requirements Gathering",
      "Gap Analysis (As-Is/To-Be)",
      "Process Mapping",
      "SOP Development",
      "Stakeholder Management",
      "Business Documentation",
      "Cross-functional Coordination",
    ],
  },
  {
    category: "Analytics & BI",
    icon: "📈",
    items: [
      "Power BI",
      "Tableau",
      "Advanced Excel",
      "Pivot Tables",
      "VLOOKUP",
      "Macros",
      "KPI Reporting",
      "Data-Driven Decision Support",
    ],
  },
  {
    category: "Programming & Data",
    icon: "💻",
    items: ["Python", "Pandas", "NumPy", "SQL", "MySQL"],
  },
  {
    category: "Enterprise Tools",
    icon: "🔧",
    items: ["SAP S/4HANA", "ERP Systems", "Microsoft Office Suite", "HTML", "CSS"],
  },
];

const STATS = [
  { value: 80, suffix: "%", label: "Manual Reporting\nReduced" },
  { value: 60, suffix: "%", label: "Onboarding\nQueries Reduced" },
  { value: 47, suffix: "", label: "Vendors\nAnalysed" },
  { value: 29.85, suffix: "Cr", prefix: "₹", label: "Spend\nAnalysed", decimals: 2 },
];

function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#a855f7] mb-3">
            ― What I Bring
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight">
            SKILLS <span className="gradient-text">& IMPACT</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <BorderGlow className="h-full">
                <div className="p-6 md:p-8 text-center">
                  <div className="font-display text-4xl md:text-6xl gradient-text leading-none">
                    <CountUp
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals ?? 0}
                    />
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-[#a3a3a3] whitespace-pre-line leading-snug">
                    {s.label}
                  </p>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

        <div className="space-y-10">
          {SKILLS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: gi * 0.05 }}
              className="grid md:grid-cols-[260px_1fr] gap-6 py-6 border-t border-[#1a1a1a]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{group.icon}</span>
                <h3 className="font-display text-2xl md:text-3xl tracking-wide">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {group.items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                    className="chip"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
