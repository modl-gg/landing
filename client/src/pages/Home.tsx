import { useEffect } from "react";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AIFeaturesSection from "@/components/home/AIFeaturesSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";
import { Particles } from "modl-shared-web/components/ui/particles";

export default function Home() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen relative overflow-x-hidden">
      {/* <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <Particles className="absolute inset-0" quantity={30} />
      </div> */}
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
