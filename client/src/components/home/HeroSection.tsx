import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroContent from "./HeroContent";
import HeroScreenshot from "./HeroScreenshot";
import FloatingStats from "./FloatingStats";

const HeroBackground = lazy(() => import("./HeroBackground"));

export default function HeroSection() {
  const [showScroll, setShowScroll] = useState(true);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.innerWidth < 1024;
    setShowBackground(!prefersReducedMotion && !isMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY < 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {showBackground && (
        <Suspense fallback={null}>
          <HeroBackground />
        </Suspense>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background z-[1] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />

      <div className="relative z-[2] max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center py-28 lg:py-0 px-6 md:px-10">
        <HeroContent />

        <div className="relative">
          <HeroScreenshot />
          <FloatingStats />
        </div>
      </div>

      <AnimatePresence>
        {showScroll && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex z-[2]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-mono text-[10px] text-muted-foreground/30 tracking-[0.25em] uppercase">
              scroll
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground/20 animate-scroll-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
