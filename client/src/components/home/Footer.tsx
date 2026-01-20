import { Github } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-20 px-6 border-t border-slate-200/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="text-2xl font-extrabold tracking-tight"
              onClick={(e) => { e.preventDefault(); scrollToSection("top"); }}
            >
              <span className="text-primary">modl</span>
              <span className="text-white">.gg</span>
            </a>
            <p className="text-slate-500 text-sm max-w-xs">
              First-class moderation and support tools for Minecraft servers.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h5 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-400">Product</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                    onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                    onClick={(e) => { e.preventDefault(); scrollToSection("pricing"); }}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="https://modl.gg/discord"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-400">Legal</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200/5">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} modl.gg. All rights reserved. Not an official Minecraft product.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://modl.gg/discord"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <FaDiscord className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/modl-gg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
