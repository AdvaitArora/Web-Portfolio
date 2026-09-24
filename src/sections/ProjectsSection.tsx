import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { BorderGlow } from "@/components/ui/border-glow";

const PROJECTS: {
  title: string;
  company: string;
  tech: string[];
  description: string;
  highlight: string;
  icon: string;
  color: string;
  scribble?: string;
}[] = [
  {
    title: "Logistics KPI Automation Dashboard",
    company: "L&T · 2024",
    scribble: "my favourite one!",
    tech: ["Power BI", "Advanced Excel", "ERP Data"],
    description:
      "Replaced 10 hrs/week of manual Excel reporting with real-time Power BI dashboards. Defined KPI requirements with stakeholders and mapped ERP data fields.",
    highlight: "80% reduction in manual reporting time",
    icon: "📊",
    color: "#a855f7",
  },
  {
    title: "Vendor Performance & Spend Analysis",
    company: "L&T · 2024",
    tech: ["Excel", "Power BI"],
    description:
      "Structured analysis of 47 vendors across 6 business units (₹2,985 lakhs total spend). Produced gap analysis and consolidation recommendations adopted by management.",
    highlight: "₹2,985 lakhs spend structured & analysed",
    icon: "📦",
    color: "#ec4899",
  },
  {
    title: "Food Waste Management Platform",
    company: "Enjay IT Solutions · 2023",
    tech: ["HTML", "CSS", "MySQL"],
    description:
      "Full-stack donor-receiver matching platform. Gathered requirements, modelled relational database, and built business logic for end-to-end matching.",
    highlight: "End-to-end delivery: requirements → working product",
    icon: "🌱",
    color: "#22c55e",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#a855f7] mb-3">
            ― Selected Work
          </p>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight">
            PROJECTS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative h-full"
            >
              {p.scribble && (
                <span className="absolute -top-4 right-6 z-10 font-hand font-semibold text-2xl text-[#ec4899] rotate-3 pointer-events-none">
                  {p.scribble}
                </span>
              )}
              <BorderGlow className="group h-full">
                <article className="relative p-7 h-full flex flex-col">
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
                    style={{ backgroundColor: p.color }}
                  />
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-3xl">{p.icon}</span>
                    <ArrowUpRight
                      size={20}
                      className="text-[#525252] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>

                  <h3 className="font-display text-base md:text-lg leading-snug tracking-wide mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#525252] font-mono uppercase tracking-wider mb-5">
                    {p.company}
                  </p>

                  <p className="text-sm text-[#a3a3a3] leading-relaxed mb-5">
                    {p.description}
                  </p>

                  <div
                    className="flex items-start gap-2 text-sm mb-6 p-3 rounded-lg"
                    style={{
                      backgroundColor: `${p.color}12`,
                      border: `1px solid ${p.color}30`,
                    }}
                  >
                    <Sparkles
                      size={14}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: p.color }}
                    />
                    <span className="text-white/90 text-xs leading-snug">
                      {p.highlight}
                    </span>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
