import { useLocation } from "wouter";
import { Button } from "modl-shared-web/components/ui/button";
import { motion } from "framer-motion";
import { Check, ArrowDown } from "lucide-react";

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
    <section id="top" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background gradients */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              <span>First-class </span>
              <br></br>
              <span className="bg-gradient-to-r from-primary via-accent to-green-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
                 Moderation & Support
              </span>
              <br></br>
              <span> Suite For Minecraft</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline moderation and support through seamless integration.
            </p>
            <div className="flex flex-wrap gap-4 pt-3 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform" 
                onClick={goToRegistration}
              >
                Sign Up Free, Forever
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={scrollToFeatures}
              >
                <span>Learn More</span>
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="pt-3 flex items-center gap-2 text-muted-foreground justify-center">
              <Check className="text-green-500" />
              <span>Free forever, no card or gimmicks</span>
            </div>
          </div>
        </motion.div>
        
        
        {/* Mission statement section */}
        <motion.div 
          className="mt-20 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative py-10 px-8 rounded-2xl border border-gray-800 bg-card/60 backdrop-blur-sm">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 px-4 py-1 rounded-full text-sm font-semibold text-primary">
              OUR MISSION
            </div>
            <h3 className="text-2xl font-bold mb-4">For server owners, by server owners</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Coming from a Minecraft server owner background, we built MODL to streamline
               the numerous inefficiencies that hold back effective moderation and support
                at scale for gaming communities. Utilizing fully dynamic punishments, AI
                 integration, and a beautiful web panel, we aim to make moderation and support painless
                  for your team and your players.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
