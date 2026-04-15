import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Beyond", href: "#beyond" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/50 backdrop-blur-md border-b border-[#1a1a1a]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="text-xl font-bold tracking-tight">
          advait<span className="text-[#a855f7]">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-[#a3a3a3]">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/Advait_Arora_BA_Resume.pdf"
          download
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#a855f7]/50 text-[#f5f5f5] text-sm hover:bg-[#a855f7]/10 hover:border-[#a855f7] transition-all"
        >
          <Download size={14} /> Download CV
        </a>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-[#1a1a1a]">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[#a3a3a3] hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Advait_Arora_BA_Resume.pdf"
                download
                className="inline-flex items-center gap-2 text-[#a855f7]"
              >
                <Download size={14} /> Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
