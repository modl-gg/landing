import { Github } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import Logo from "../ui/Logo";

export default function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative pt-16 pb-10 px-6 md:px-10 border-t border-border/30 overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-['Audiowide',cursive] text-[20vw] leading-none text-white/[0.012] whitespace-nowrap">
          modl
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
          <div className="flex flex-col gap-3">
            <Logo clickCallback={() => scrollToSection("top")} />
            <p className="text-muted-foreground/40 text-sm max-w-xs">
              First-class moderation and support tools for Minecraft servers.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground/40">
            <a href="#features" className="hover:text-foreground transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}>Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection("pricing"); }}>Pricing</a>
            <a href="https://modl.gg/discord" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Discord</a>
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-muted-foreground/25 text-xs">
            &copy; 2025-2026 byteful studios LLC. All rights reserved.     -     Not affiliated with Mojang Studios or Microsoft.
          </p>
          <div className="flex items-center gap-5">
            <a href="https://modl.gg/discord" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/25 hover:text-primary transition-colors">
              <FaDiscord className="w-5 h-5" />
            </a>
            <a href="https://github.com/modl-gg" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/25 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
