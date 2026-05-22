import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

export default function SectionReveal({ children, className }: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 60, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
