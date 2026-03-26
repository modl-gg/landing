import { motion } from "framer-motion";
import BrowserMockup from "../ui/BrowserMockup";

const showcaseItems = [
  { title: "panel.modl.gg/punishments", src: "https://cdn.modl.gg/assets/modl-image-8.png", alt: "Punishments panel" },
  { title: "panel.modl.gg/dashboard", src: "https://cdn.modl.gg/assets/modl-image-3.png", alt: "Dashboard overview" },
  { title: "panel.modl.gg/tickets", src: "https://cdn.modl.gg/assets/modl-image-2.png", alt: "Tickets inbox" },
];

export default function ShowcaseSection() {
  return (
    <section className="py-28 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            See It in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A powerful web panel built for speed, clarity, and total control
          </p>
        </motion.div>

        {/* Top row — 2 large mockups side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrowserMockup tilt title={showcaseItems[0].title} previewSrc={showcaseItems[0].src} previewAlt={showcaseItems[0].alt}>
              <img src={showcaseItems[0].src} alt={showcaseItems[0].alt} className="w-full h-auto block screenshot-sharp" />
            </BrowserMockup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrowserMockup tilt title={showcaseItems[1].title} previewSrc={showcaseItems[1].src} previewAlt={showcaseItems[1].alt}>
              <img src={showcaseItems[1].src} alt={showcaseItems[1].alt} className="w-full h-auto block screenshot-sharp" />
            </BrowserMockup>
          </motion.div>
        </div>

        {/* Bottom row — 1 centered, wider mockup */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrowserMockup tilt title={showcaseItems[2].title} previewSrc={showcaseItems[2].src} previewAlt={showcaseItems[2].alt}>
            <img src={showcaseItems[2].src} alt={showcaseItems[2].alt} className="w-full h-auto block screenshot-sharp" />
          </BrowserMockup>
        </motion.div>
      </div>
    </section>
  );
}
