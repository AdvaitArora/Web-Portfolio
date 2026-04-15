import { LinkedinIcon, InstagramIcon } from "@/components/ui/brand-icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#525252]">
        <div className="font-bold text-sm text-white">
          advait<span className="text-[#a855f7]">.</span>
        </div>
        <p className="font-mono">
          Built with React & <span className="text-[#ec4899]">♥</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/advait-arora"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href="https://www.instagram.com/advait_arora/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon size={16} />
          </a>
          <a
            href="mailto:advaitarora13@gmail.com"
            className="hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <span>© 2026 Advait Arora</span>
        </div>
      </div>
    </footer>
  );
}
