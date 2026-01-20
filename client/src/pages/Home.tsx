import { useEffect } from "react";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

export default function Home() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen">
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 grid-pattern opacity-40"></div>
        </div>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <Footer />
      </main>
    </div>
  );
}
