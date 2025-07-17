import { useEffect } from "react";
import RegistrationForm from "@/components/registration/RegistrationForm";
import { Particles } from "modl-shared-web/components/ui/particles";

export default function Registration() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <Particles className="absolute inset-0" quantity={20} />
      </div>
      <RegistrationForm />
    </div>
  );
}
