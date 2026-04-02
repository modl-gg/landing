import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import Logo from "@/components/ui/Logo";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const linkClasses = "text-sm text-muted-foreground/50 hover:text-foreground transition-colors duration-200";
const headingClasses = "text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-4";

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10 px-6 md:px-10 overflow-hidden">
      <div
        className="h-px w-full mb-16"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.3), hsl(var(--accent)/0.2), transparent)",
          backgroundSize: "200% 100%",
          animation: "border-flow 4s linear infinite",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-brand text-[20vw] leading-none text-white/[0.015] whitespace-nowrap">
          modl
        </span>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="flex flex-col gap-3">
            <Logo clickCallback={() => scrollToSection("top")} />
            <p className="text-muted-foreground/40 text-sm max-w-xs">
              First-class moderation and support tools for Minecraft servers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className={headingClasses}>Product</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }} className={linkClasses}>
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection("pricing"); }} className={linkClasses}>
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }} className={linkClasses}>
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className={headingClasses}>Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href={import.meta.env.VITE_DOCS_URL} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    Docs
                  </a>
                </li>
                <li>
                  <a href="https://modl.gg/discord" target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h4 className={headingClasses}>Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/privacy" className={linkClasses}>Privacy</a>
                </li>
                <li>
                  <a href="/terms" className={linkClasses}>Terms</a>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://modl.gg/discord" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/30 hover:text-primary transition-colors duration-200">
                <FaDiscord className="w-5 h-5" />
              </a>
              <a href="https://github.com/modl-gg" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/30 hover:text-primary transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/30 text-xs">
            &copy; 2025-2026 byteful studios LLC. All rights reserved.
          </p>
          <p className="text-muted-foreground/30 text-xs">
            Not affiliated with Mojang Studios or Microsoft.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
