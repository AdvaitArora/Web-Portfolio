import { BeamsBackground } from "@/components/ui/beams-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <BeamsBackground intensity="subtle" className="py-32">
      <section id="about" className="relative max-w-4xl mx-auto px-6">
        <div className="relative text-center mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#a855f7] mb-4">
            ― About Me
          </p>
          <h2 className="font-display text-[18vw] md:text-[11rem] leading-[0.85] tracking-tight inline-block gradient-text">
            ABOUT ME
          </h2>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            textClassName="text-white"
          >
            Engineer by training. Analyst by choice. Builder by instinct.
          </ScrollReveal>

          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            textClassName="text-white/90"
          >
            I spent 4.5 months inside L&T automating what used to take hours — Power BI dashboards, SAP pipelines, data that finally made sense to the people who needed it.
          </ScrollReveal>

          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            textClassName="text-white"
          >
            I don't just work with data. I translate it.
          </ScrollReveal>
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-medium hover:scale-[1.04] transition-transform shadow-[0_0_40px_rgba(168,85,247,0.35)]"
          >
            Contact Me <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </BeamsBackground>
  );
}
