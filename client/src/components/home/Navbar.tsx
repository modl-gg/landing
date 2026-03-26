import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";

const navLinks = [
  { label: "Features", href: "#features", section: "features" },
  { label: "Pricing", href: "#pricing", section: "pricing" },
  { label: "FAQ", href: "#faq", section: "faq" },
  { label: "Docs", href: "", external: true, envKey: true },
  { label: "Discord", href: "https://modl.gg/discord", external: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goToRegistration = () => {
    setMobileOpen(false);
    navigate("/register");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.05]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Logo clickCallback={() => scrollToSection("top")} />

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.envKey ? import.meta.env.VITE_DOCS_URL : link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-foreground transition-colors duration-200"
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.section!); }}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="hidden md:block px-5 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:shadow-[0_0_24px_hsl(var(--primary)/0.3)] transition-all duration-200 active:scale-95"
              onClick={goToRegistration}
            >
              Register Free
            </button>
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.envKey ? import.meta.env.VITE_DOCS_URL : link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/30"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="py-3.5 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/30"
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.section!); }}
                  >
                    {link.label}
                  </a>
                )
              )}
              <button
                className="mt-6 w-full py-3.5 bg-primary text-white font-bold rounded-lg hover:shadow-[0_0_24px_hsl(var(--primary)/0.3)] transition-all"
                onClick={goToRegistration}
              >
                Register Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
