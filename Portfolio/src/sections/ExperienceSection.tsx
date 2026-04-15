import { motion } from "motion/react";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { BorderGlow } from "@/components/ui/border-glow";

const EXPERIENCES = [
  {
    company: "Larsen & Toubro (L&T)",
    department: "Logistics Management Centre",
    role: "Business Analyst Intern",
    period: "May – Sep 2024",
    location: "Mumbai",
    bullets: [
      "Built Power BI dashboards cutting manual reporting from 10 hrs to 2 hrs/week (80% reduction)",
      "Mapped full purchase-to-payment workflow across multiple business units; improved first-pass accuracy",
      "Authored role-based SOP consolidating 8+ documents, reducing onboarding queries by ~60%",
      "Conducted As-Is warehouse assessment; led ERP training saving ~2 hrs/day in external support",
      "Analysed ₹2,985 lakhs spend across 47 vendors and 6 BUs; presented gap analysis to management",
      "Validated 150+ invoices; built exception log with error codes accelerating approval turnaround",
    ],
  },
  {
    company: "Enjay IT Solutions Ltd.",
    role: "Web Developer Intern",
    period: "2023",
    location: "Mumbai",
    bullets: [
      "Designed database schema for food-waste management platform (HTML/CSS + MySQL)",
      "End-to-end delivery from requirements gathering to working relational backend",
    ],
  },
  {
    company: "Indian Women Scientists' Association (IWSA)",
    role: "NGO Intern — Outreach & Coordination",
    period: "2022 – 2023",
    location: "Mumbai",
    bullets: [
      "Coordinated science workshops for 80–100 students",
      "Co-managed logistics for Golden Jubilee event with 100+ participants",
    ],
  },
];

const EDUCATION = [
  {
    institution: "ITM Skills University",
    degree: "MBA — Business Analytics",
    period: "Aug 2024 – May 2026",
    location: "Navi Mumbai",
    status: "In Progress",
    courses: [
      "Business Analytics",
      "Data Visualisation",
      "Operations Management",
      "Decision Sciences",
    ],
  },
  {
    institution: "NMIMS University (Mukesh Patel School of Technology)",
    degree: "B.Tech — Computer Engineering",
    period: "Aug 2020 – May 2024",
    location: "Mumbai",
    grade: "69.25%",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#a855f7] mb-3">
            ― My Journey
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight">
            EXPERIENCE
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#a855f7] via-[#262626] to-transparent" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <TimelineEntry key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-28">
          <div className="mb-12 text-center">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#a855f7] mb-3">
              ― Education
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              ACADEMIC BACKGROUND
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <BorderGlow className="h-full">
                  <div className="p-6 md:p-7">
                    <div className="flex items-start gap-3 mb-3">
                      <GraduationCap size={22} className="text-[#a855f7] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-display text-xl md:text-2xl tracking-wide leading-tight">
                          {edu.institution}
                        </h3>
                        <p className="text-sm text-[#a3a3a3] mt-1">{edu.degree}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#525252] font-mono mb-3">
                      <span>{edu.period}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {edu.location}
                      </span>
                      {edu.status && (
                        <span className="text-[#a855f7]">{edu.status}</span>
                      )}
                      {edu.grade && <span>Grade: {edu.grade}</span>}
                    </div>
                    {edu.courses && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {edu.courses.map((c) => (
                          <span key={c} className="chip text-[10px] py-0.5">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className={`relative grid md:grid-cols-2 gap-8 ${
        isLeft ? "" : "md:[&>*:first-child]:col-start-2"
      }`}
    >
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.5)]" />

      <div
        className={`ml-10 md:ml-0 ${isLeft ? "md:mr-8" : "md:ml-8"}`}
      >
        <BorderGlow>
          <div className="p-6 md:p-7">
            <div className="flex items-start gap-3 mb-3">
              <Briefcase size={20} className="text-[#a855f7] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-2xl tracking-wide leading-tight">
                  {exp.company}
                </h3>
                {exp.department && (
                  <p className="text-xs text-[#525252] mt-0.5">{exp.department}</p>
                )}
                <p className="text-sm text-white/90 mt-1">{exp.role}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#525252] font-mono mb-4">
              <span>{exp.period}</span>
              <span className="flex items-center gap-1">
                <MapPin size={11} /> {exp.location}
              </span>
            </div>
            <ul className="space-y-2">
              {exp.bullets.map((b, i) => (
                <li
                  key={i}
                  className="text-sm text-[#a3a3a3] flex gap-2 leading-relaxed"
                >
                  <span className="text-[#a855f7] flex-shrink-0 mt-1.5">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </BorderGlow>
      </div>
    </motion.div>
  );
}
