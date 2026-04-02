import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import BrowserMockup from "@/components/ui/BrowserMockup";

const showcaseItems = [
  { title: "panel.modl.gg/punishments", src: "https://cdn.modl.gg/assets/modl-image-8.png", alt: "Punishments panel" },
  { title: "panel.modl.gg/dashboard", src: "https://cdn.modl.gg/assets/modl-image-3.png", alt: "Dashboard overview" },
  { title: "panel.modl.gg/tickets", src: "https://cdn.modl.gg/assets/modl-image-2.png", alt: "Tickets inbox" },
];

const ease = [0.22, 1, 0.36, 1];

function useTilt3D(maxDeg = 5) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) scale(1.02)`;
    },
    [maxDeg],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

function ShowcaseCard({
  item,
  motionProps,
}: {
  item: (typeof showcaseItems)[number];
  motionProps: Record<string, unknown>;
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D(5);

  return (
    <motion.div {...motionProps}>
      <div
        className="screenshot-glow"
        style={{ perspective: "1200px" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div ref={ref} style={{ transition: "transform 0.15s ease-out" }}>
          <BrowserMockup tilt={false} title={item.title} previewSrc={item.src} previewAlt={item.alt}>
            <img src={item.src} alt={item.alt} className="w-full h-auto block screenshot-sharp" />
          </BrowserMockup>
        </div>
        <div className="absolute -bottom-4 left-[15%] right-[15%] h-12 bg-primary/[0.04] rounded-full blur-xl" />
      </div>
    </motion.div>
  );
}

export default function ShowcaseSection() {
  return (
    <section className="py-28 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Showcase</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            See It in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A powerful web panel built for speed, clarity, and total control
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ShowcaseCard
            item={showcaseItems[0]}
            motionProps={{
              initial: { opacity: 0, x: -40 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true, margin: "-60px" },
              transition: { duration: 0.7, delay: 0.1, ease },
            }}
          />
          <ShowcaseCard
            item={showcaseItems[1]}
            motionProps={{
              initial: { opacity: 0, x: 40 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true, margin: "-60px" },
              transition: { duration: 0.7, delay: 0.2, ease },
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <ShowcaseCard
            item={showcaseItems[2]}
            motionProps={{
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-60px" },
              transition: { duration: 0.7, delay: 0.3, ease },
            }}
          />
        </div>
      </div>
    </section>
  );
}
