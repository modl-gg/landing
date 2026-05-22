import { useEffect } from "react";
import { motion } from "framer-motion";
import FeaturesSection from "@/components/home/FeaturesSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

function SectionDivider() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10">
      <motion.div
        className="section-divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center" }}
      />
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen">
      <main className="relative overflow-hidden">
        <FeaturesSection />
        <SectionDivider />
        <PricingSection />
        <SectionDivider />
        <FAQSection />
        <Footer />
      </main>
    </div>
  );
}
