import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import BrowserMockup from "@/components/ui/BrowserMockup";

export default function HeroScreenshot() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(nx * 3 - 3);
      mouseY.set(-ny * 3 + 8);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} style={{ perspective: 1200 }}>
      <motion.div
        className="screenshot-glow"
        initial={{ opacity: 0, y: 60, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 8 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <BrowserMockup
          tilt={false}
          previewSrc="https://cdn.modl.gg/assets/modl-image-7.png"
          previewAlt="modl.gg dashboard"
        >
          <img
            src="https://cdn.modl.gg/assets/modl-image-7.png"
            alt="modl.gg dashboard"
            className="w-full h-auto block screenshot-sharp"
          />
        </BrowserMockup>
      </motion.div>

      <div className="mx-auto mt-[-2rem] w-3/4 h-24 bg-primary/[0.04] rounded-full blur-2xl" />
    </div>
  );
}
