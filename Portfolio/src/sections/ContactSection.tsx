import { BeamsBackground } from "@/components/ui/beams-background";
import { BorderGlow } from "@/components/ui/border-glow";
import { LinkedinIcon, InstagramIcon } from "@/components/ui/brand-icons";
import { Mail, Phone } from "lucide-react";
import type { ComponentType } from "react";

const CONTACTS: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  handle: string;
  href: string;
}[] = [
  {
    icon: Mail,
    label: "Email",
    handle: "advaitarora13@gmail.com",
    href: "mailto:advaitarora13@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    handle: "+91 97258 75222",
    href: "tel:+919725875222",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    handle: "/in/advait-arora",
    href: "https://www.linkedin.com/in/advait-arora",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    handle: "@advait_arora",
    href: "https://www.instagram.com/advait_arora/",
  },
];

export function ContactSection() {
  return (
    <BeamsBackground intensity="medium" className="py-32">
      <section id="contact" className="relative max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#a855f7] mb-4">
          ― Get In Touch
        </p>
        <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-4">
          LET'S WORK
          <br />
          <span className="gradient-text">TOGETHER.</span>
        </h2>
        <div className="mx-auto w-16 h-px bg-[#a855f7] my-8" />
        <p className="text-lg text-[#a3a3a3] max-w-xl mx-auto">
          I'm currently open to{" "}
          <span className="text-white">Business Analyst</span> and{" "}
          <span className="text-white">Operations Analyst</span> internships and placements.
        </p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACTS.map(({ icon: Icon, label, handle, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group block hover:-translate-y-1 transition-transform duration-300"
            >
              <BorderGlow className="h-full">
                <div className="p-6 flex flex-col items-center gap-3 h-full">
                  <Icon
                    size={24}
                    className="text-[#a3a3a3] group-hover:text-[#a855f7] transition-colors"
                  />
                  <p className="text-sm text-white font-medium">{label}</p>
                  <p className="text-xs text-[#525252] font-mono break-all text-center">
                    {handle}
                  </p>
                </div>
              </BorderGlow>
            </a>
          ))}
        </div>
      </section>
    </BeamsBackground>
  );
}
