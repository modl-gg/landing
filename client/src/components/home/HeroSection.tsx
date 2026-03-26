import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import BrowserMockup from "../ui/BrowserMockup";
import minecraftLogo from "@assets/Minecraft.webp";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const [, navigate] = useLocation();
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY < 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex items-center px-6 md:px-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center py-28 lg:py-0">
        {/* Text */}
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.h1
            className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.08] tracking-tight mb-8"
            variants={slideUp}
          >
            <span className="block font-light text-foreground/60">First-class</span>
            <span className="block font-extrabold gradient-text mt-1">Moderation &amp; Support</span>
            <span className="flex items-center gap-3 sm:gap-4 mt-2 flex-wrap">
              <span className="font-light text-foreground/60">Suite for</span>
              <img
                src={minecraftLogo}
                alt="Minecraft"
                className="h-[0.7em] sm:h-[0.85em] inline-block relative top-[0.05em] brightness-90 opacity-90"
                draggable={false}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            variants={slideUp}
          >
            Streamline moderation and support through seamless integration. Everything you need to keep your community safe, engaged, and supported.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4" variants={slideUp}>
            <button
              className="group px-7 sm:px-8 py-3.5 sm:py-4 bg-primary text-white font-bold rounded-lg text-sm sm:text-base hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.97]"
              onClick={() => navigate("/register")}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <a
              href={import.meta.env.VITE_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 sm:px-8 py-3.5 sm:py-4 border border-white/10 text-foreground/90 font-semibold rounded-lg text-sm sm:text-base hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Learn More <BookOpen className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Browser mockup — visible on all sizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrowserMockup tilt previewSrc="https://cdn.modl.gg/assets/modl-image-7.png" previewAlt="modl.gg dashboard">
            <img
              src="https://cdn.modl.gg/assets/modl-image-7.png"
              alt="modl.gg dashboard"
              className="w-full h-auto block screenshot-sharp"
            />
          </BrowserMockup>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden lg:flex"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-mono text-[10px] text-muted-foreground/30 tracking-[0.25em] uppercase">scroll</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground/20 animate-scroll-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
