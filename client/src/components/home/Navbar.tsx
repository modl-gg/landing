import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "modl-shared-web/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToRegistration = () => {
    navigate("/register");
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 border-b border-gray-800 backdrop-blur shadow-lg' : ''}`}>
      <div className="bg-background/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="flex items-center" onClick={(e) => { e.preventDefault(); scrollToSection("top"); }}>
                <span className="text-2xl font-bold text-primary font-['Audiowide',cursive]">modl</span>
                <span className="ml-2 text-xs text-muted-foreground mt-1">BETA</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}>Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={(e) => { e.preventDefault(); scrollToSection("pricing"); }}>Pricing</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors duration-200" onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }}>FAQ</a>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={goToRegistration}>
                Register for Free
              </Button>
            </div>
            <div className="md:hidden flex items-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={goToRegistration}>
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
