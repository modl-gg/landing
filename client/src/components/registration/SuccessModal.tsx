import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "modl-shared-web/components/ui/button";

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
  customDomain?: string; // Make customDomain optional
}

export default function SuccessModal({ show, onClose, customDomain }: SuccessModalProps) {
  const [, navigate] = useLocation();

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && show) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [show, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          ></motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-card rounded-xl p-8 max-w-md w-full mx-4 relative z-10 border border-gray-800"
          >
            <div className="flex justify-center mb-6">
              <motion.div 
                className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
              >
                <Check className="h-8 w-8 text-green-500" />
              </motion.div>
            </div>
            
            <motion.h3 
              className="text-2xl font-bold text-center mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Registration Successful!
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground text-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Your modl account has been created. Check your email for verification and next steps.
            </motion.p>
            
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={() => {
                  onClose();
                  navigate("/");
                }}
                variant="default"
                className="w-full"
              >
                Close
              </Button>
            </motion.div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
