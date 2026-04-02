import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import minecraftLogo from "@assets/Minecraft.webp";

const orchestrator = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
};

const lineReveal = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroContent() {
  const [, navigate] = useLocation();

  return (
    <motion.div variants={orchestrator} initial="hidden" animate="visible">
      <motion.h1
        className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.08] tracking-tight mb-8"
        variants={lineReveal}
      >
        <span className="block font-light text-foreground/60">First-class</span>
        <span className="block font-extrabold gradient-text-shimmer mt-1">
          Moderation &amp; Support
        </span>
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
        variants={lineReveal}
      >
        Streamline moderation and support through seamless integration.
        Everything you need to keep your community safe, engaged, and supported.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        variants={lineReveal}
      >
        <button
          className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-primary text-white font-bold rounded-lg text-sm sm:text-base hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.97] overflow-hidden"
          onClick={() => navigate("/register")}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative flex items-center gap-2">
            Get Started Free
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </button>
        <a
          href={import.meta.env.VITE_DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 sm:px-8 py-3.5 sm:py-4 border border-white/10 text-foreground/90 font-semibold rounded-lg text-sm sm:text-base hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300 flex items-center justify-center gap-2"
        >
          Learn More
          <BookOpen className="w-4 h-4" />
        </a>
      </motion.div>
    </motion.div>
  );
}
