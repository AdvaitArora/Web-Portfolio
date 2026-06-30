import { lazy, Suspense } from "react";
import { Dock } from "@/sections/Dock";
import { HeroSection } from "@/sections/HeroSection";

// Below-fold sections are code-split and only downloaded when the browser
// reaches them in the render tree. The hero and dock load immediately.
const AboutSection = lazy(() =>
  import("@/sections/AboutSection").then((m) => ({ default: m.AboutSection }))
);
const SkillsSection = lazy(() =>
  import("@/sections/SkillsSection").then((m) => ({ default: m.SkillsSection }))
);
const ProjectsSection = lazy(() =>
  import("@/sections/ProjectsSection").then((m) => ({
    default: m.ProjectsSection,
  }))
);
const ExperienceSection = lazy(() =>
  import("@/sections/ExperienceSection").then((m) => ({
    default: m.ExperienceSection,
  }))
);
const BeyondDashboardSection = lazy(() =>
  import("@/sections/BeyondDashboardSection").then((m) => ({
    default: m.BeyondDashboardSection,
  }))
);
const ContactSection = lazy(() =>
  import("@/sections/ContactSection").then((m) => ({
    default: m.ContactSection,
  }))
);
const Footer = lazy(() =>
  import("@/sections/Footer").then((m) => ({ default: m.Footer }))
);

export default function Portfolio() {
  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5]">
      <Dock />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <BeyondDashboardSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
