import { Github } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { SiModrinth, SiSpigotmc } from "react-icons/si";

const linkClasses = "text-sm text-muted-foreground/40 hover:text-foreground/70 transition-colors";

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 md:px-10 pt-8 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="h-px w-full mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.15), transparent)" }} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <span className="font-brand text-xl">
              <span className="text-primary">modl</span>
              <span className="text-foreground/50">.gg</span>
            </span>
            <span className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-4">
              <a href={import.meta.env.VITE_DOCS_URL} target="_blank" rel="noopener noreferrer" className={linkClasses}>Documentation</a>
              <a href="/privacy" className={linkClasses}>Privacy</a>
              <a href="/terms" className={linkClasses}>Terms</a>
              <a href="/dpa" className={linkClasses}>DPA</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://modl.gg/discord" target="_blank" rel="noopener noreferrer" aria-label="Join modl on Discord" className="text-muted-foreground/30 hover:text-primary transition-colors">
              <FaDiscord className="w-5 h-5" />
            </a>
            <a href="https://github.com/modl-gg" target="_blank" rel="noopener noreferrer" aria-label="View modl on GitHub" className="text-muted-foreground/30 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.spigotmc.org/resources/modl-support-moderation-reimagined.127780/" target="_blank" rel="noopener noreferrer" aria-label="View modl on SpigotMC" className="text-muted-foreground/30 hover:text-primary transition-colors">
              <SiSpigotmc className="w-5 h-5" />
            </a>
            <a href="https://modrinth.com/plugin/modl" target="_blank" rel="noopener noreferrer" aria-label="View modl on Modrinth" className="text-muted-foreground/30 hover:text-primary transition-colors">
              <SiModrinth className="w-5 h-5" />
            </a>
          </div>
        </div>

        <p className="text-muted-foreground/25 text-xs mt-5">
          &copy; 2025-2026 byteful studios LLC. Not affiliated with Mojang Studios or Microsoft.
        </p>
      </div>
    </footer>
  );
}
