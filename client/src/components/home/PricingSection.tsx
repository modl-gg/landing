import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { type ReactNode } from "react";

const freePlanFeatures: ReactNode[] = [
  <>Up to <b>5</b> staff members</>,
  <><b>Full-feature</b> moderation & support suite</>,
  <>1GB <b>CDN</b> Storage</>,
  <>No ads, <b>no gimmicks</b></>,
  <><b>Community</b> & developer support</>
];

const premiumPlanFeatures: ReactNode[] = [
  <><b>Unlimited</b> staff members</>,
  <><b>Full-feature</b> moderation & support suite</>,
  <>200GB <b>CDN</b> Storage ($0.08/GB/month past 200GB)</>,
  <>Beta <b>AI</b> chat moderation & tickets access</>,
  <><b>Priority</b> developer support</>
];

const enterprisePlanFeatures: ReactNode[] = [
  <><b>Dedicated</b> machine in preferable region (isolated data)</>,
  <>Emails sent from <b>your domain</b></>,
  <>We sign an <b>NDA</b> contract</>,
  <><b>Negotiable</b> rates on storage/AI overage</>,
  <><b>99% SLA</b> contract (+ longer term agreements)</>,
  <>Custom features, <b>tailored theme</b> and UI</>
];

const ease = [0.22, 1, 0.36, 1];

function useTilt3D(maxDeg = 4) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) scale(1.02)`;
    },
    [maxDeg],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

function FeatureItem({ children, checkColor, index, baseDelay }: { children: ReactNode; checkColor: string; index: number; baseDelay: number }) {
  return (
    <motion.div
      className="flex items-start gap-3 text-sm text-muted-foreground"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: baseDelay + index * 0.04 }}
    >
      <Check className={`${checkColor} w-4 h-4 shrink-0 mt-0.5`} />
      <span>{children}</span>
    </motion.div>
  );
}

function FreePlanCard() {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: "800px" }}
    >
      <div ref={ref} className="card-surface p-7 flex flex-col" style={{ transition: "transform 0.15s ease-out" }}>
        <div className="mb-7">
          <h3 className="font-display text-lg font-bold mb-1">Free Plan</h3>
          <p className="text-muted-foreground text-sm">Free forever for growing communities.</p>
          <div className="mt-5 flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold tracking-tight">$0</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
        </div>
        <div className="flex-grow space-y-3.5">
          {freePlanFeatures.map((f, i) => (
            <FeatureItem key={i} checkColor="text-emerald-400" index={i} baseDelay={0.1}>{f}</FeatureItem>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PremiumPlanCard() {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D();

  return (
    <motion.div
      className="relative lg:-translate-y-4 lg:scale-[1.04]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: "800px" }}
    >
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 text-xs font-bold uppercase tracking-widest bg-primary text-white rounded-full shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
        Recommended
      </span>
      <div ref={ref} className="card-premium-glow" style={{ transition: "transform 0.15s ease-out" }}>
        <div className="bg-card p-8 rounded-[calc(var(--radius-card)-2px)] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/[0.03] rounded-full blur-2xl" />
          <div className="relative">
            <div className="mb-7">
              <h3 className="font-display text-lg font-bold mb-1">Premium Plan</h3>
              <p className="text-muted-foreground text-sm">For large communities turning a profit.</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold gradient-text">$9.99</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
            </div>
            <div className="flex-grow space-y-3.5 mb-7">
              {premiumPlanFeatures.map((f, i) => (
                <FeatureItem key={i} checkColor="text-primary" index={i} baseDelay={0.2}>{f}</FeatureItem>
              ))}
            </div>
            <a
              href="https://panel.modl.gg"
              className="block text-center bg-primary text-white font-bold rounded-lg py-3.5 w-full hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-shadow"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EnterprisePlanCard() {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: "800px" }}
    >
      <div ref={ref} className="card-surface p-7 flex flex-col relative overflow-hidden" style={{ transition: "transform 0.15s ease-out" }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="mb-7">
          <h3 className="font-display text-lg font-bold mb-1">Enterprise</h3>
          <p className="text-muted-foreground text-sm">All premium features, tailored to your needs.</p>
          <div className="mt-5">
            <span className="font-display text-2xl font-bold text-foreground/70">Custom Pricing</span>
          </div>
        </div>
        <div className="flex-grow space-y-3.5">
          {enterprisePlanFeatures.map((f, i) => (
            <FeatureItem key={i} checkColor="text-sky-400" index={i} baseDelay={0.3}>{f}</FeatureItem>
          ))}
        </div>
        <a
          href="mailto:support@modl.gg"
          className="mt-7 block w-full text-center py-3 px-6 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-accent/20 hover:border-accent/40 text-sm font-medium text-foreground/70 transition-colors"
        >
          Contact for Quote
        </a>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Free forever for hobbyists, fair forever when you get serious.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          <FreePlanCard />
          <PremiumPlanCard />
          <EnterprisePlanCard />
        </div>
      </div>
    </section>
  );
}
