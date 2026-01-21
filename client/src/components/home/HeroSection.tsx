import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

export default function HeroSection() {
  const [, navigate] = useLocation();

  const scrollToFeatures = () => {
    const featuresElement = document.getElementById("features");
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToRegistration = () => {
    navigate("/register");
  };

  return (
    <section id="top" className="relative pt-32 pb-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight">
            First-class <span className="gradient-text">Moderation & Support</span> Suite for Minecraft
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Streamline moderation and support through seamless integration. Everything you need to keep your community safe, engaged, and supported.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-2xl text-lg hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
              onClick={goToRegistration}
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </button>
            <button
              className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-2xl text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              onClick={scrollToFeatures}
            >
              Learn More <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
