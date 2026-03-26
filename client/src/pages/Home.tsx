import { useEffect } from "react";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="section-divider" />
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen grain-bg">
      <Navbar />
      <main className="relative overflow-hidden z-[1]">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[900px] pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-5%] left-[20%] w-[650px] h-[650px] bg-primary/[0.04] rounded-full blur-[180px]" />
          <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px]" />
        </div>

        <HeroSection />
        <SectionDivider />
        <FeaturesSection />
        <SectionDivider />
        <ShowcaseSection />
        <SectionDivider />
        <PricingSection />
        <SectionDivider />
        <FAQSection />
        <Footer />
      </main>
    </div>
  );
}
