import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CTASection() {
  const [, navigate] = useLocation();

  return (
    <section className="py-28 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary/[0.08] rounded-full blur-[100px]"
          style={{ animation: "cta-drift-1 8s ease-in-out infinite alternate" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[120px]"
          style={{ animation: "cta-drift-2 10s ease-in-out infinite alternate" }}
        />
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.h2
          className="gradient-text font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          variants={itemVariants}
        >
          Ready to Transform Your Moderation?
        </motion.h2>

        <motion.p
          className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
          variants={itemVariants}
        >
          Join the servers already using modl.gg to streamline their moderation and support workflows. Free forever.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <div className="relative group">
            <div
              className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-primary via-accent to-primary opacity-50 group-hover:opacity-100 blur-[2px] transition-opacity duration-500"
              style={{ backgroundSize: "200% 100%", animation: "border-flow 3s linear infinite" }}
            />
            <button
              className="relative bg-primary text-white font-bold rounded-xl text-base px-8 py-4 hover:shadow-[0_0_40px_hsl(var(--primary)/0.35)] transition-all duration-300 flex items-center gap-2 active:scale-[0.97]"
              onClick={() => navigate("/register")}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          <a
            href={import.meta.env.VITE_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/10 text-foreground/90 font-semibold rounded-xl text-base px-8 py-4 hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300 flex items-center gap-2"
          >
            Read the Docs
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
