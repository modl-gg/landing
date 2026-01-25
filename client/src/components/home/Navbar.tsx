import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Logo from "../ui/Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToRegistration = () => {
    navigate("/register");
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-200/10 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo clickCallback={() => scrollToSection("top")} />

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a
            href="#features"
            className="hover:text-primary transition-colors"
            onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-primary transition-colors"
            onClick={(e) => { e.preventDefault(); scrollToSection("pricing"); }}
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="hover:text-primary transition-colors"
            onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }}
          >
            FAQ
          </a>
          <a
            href="https://modl.gg/discord"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Discord
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="px-5 py-2.5 bg-primary text-white font-semibold rounded-2xl hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all active:scale-95"
            onClick={goToRegistration}
          >
            Register Free
          </button>
        </div>
      </div>
    </nav>
  );
}
