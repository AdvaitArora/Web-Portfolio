import {
  Home,
  User,
  Sparkles,
  Layers,
  Briefcase,
  Compass,
  Mail,
  Download,
} from "lucide-react";
import { GlassDock, type DockItem } from "@/components/ui/glass-dock";

function downloadCV() {
  const a = document.createElement("a");
  a.href = "/Advait_Arora_BA_Resume.pdf";
  a.download = "Advait_Arora_BA_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Our existing nav items — same destinations as the old Navbar, now rendered
// with the glass-dock effects. `morphType` reuses a built-in morph animation
// where one fits the item (Home -> house, Contact -> envelope).
const DOCK_ITEMS: DockItem[] = [
  { title: "Home", icon: Home, href: "#top", morphType: "home" },
  { title: "About", icon: User, href: "#about" },
  { title: "Skills", icon: Sparkles, href: "#skills" },
  { title: "Projects", icon: Layers, href: "#projects" },
  { title: "Experience", icon: Briefcase, href: "#experience" },
  { title: "Beyond", icon: Compass, href: "#beyond" },
  { title: "Contact", icon: Mail, href: "#contact", morphType: "email" },
  { title: "Download CV", icon: Download, onClick: downloadCV },
];

export function Dock() {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 origin-bottom scale-[0.8] sm:scale-100">
      <GlassDock items={DOCK_ITEMS} />
    </div>
  );
}

export default Dock;
