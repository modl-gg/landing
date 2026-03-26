import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const [, navigate] = useLocation();

  return (
    <section className="py-28 px-6 md:px-10 relative">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Ready to Transform Your Moderation?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join the servers already using modl.gg to streamline their moderation and support workflows. Free forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="group px-8 py-4 bg-primary text-white font-bold rounded-lg text-base hover:shadow-[0_0_50px_hsl(var(--primary)/0.35)] transition-all duration-300 flex items-center gap-2 active:scale-[0.97]"
              onClick={() => navigate("/register")}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <a
              href={import.meta.env.VITE_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/10 text-foreground/90 font-semibold rounded-lg text-base hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300 flex items-center gap-2"
            >
              Read the Docs
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
