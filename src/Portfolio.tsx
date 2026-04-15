import { Navbar } from "@/sections/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { BeyondDashboardSection } from "@/sections/BeyondDashboardSection";
import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/sections/Footer";

export default function Portfolio() {
  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5]">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <BeyondDashboardSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
