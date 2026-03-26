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

function FeatureItem({ children, checkColor, index, baseDelay }: { children: ReactNode; checkColor: string; index: number; baseDelay: number }) {
  return (
    <motion.div
      className="flex items-start gap-3 text-sm text-muted-foreground"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: baseDelay + (index * 0.04) }}
    >
      <Check className={`${checkColor} w-4 h-4 shrink-0 mt-0.5`} />
      <span>{children}</span>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg">Free forever for hobbyists, fair forever when you get serious.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {/* Free */}
          <motion.div
            className="card-surface p-7 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>

          {/* Premium — elevated */}
          <motion.div
            className="relative card-surface-glow p-8 flex flex-col lg:-translate-y-3 lg:scale-[1.02]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-7">
              <h3 className="font-display text-lg font-bold mb-1">Premium Plan</h3>
              <p className="text-muted-foreground text-sm">For large communities turning a profit.</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-tight">$9.99</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
            </div>
            <div className="flex-grow space-y-3.5">
              {premiumPlanFeatures.map((f, i) => (
                <FeatureItem key={i} checkColor="text-primary" index={i} baseDelay={0.2}>{f}</FeatureItem>
              ))}
            </div>
          </motion.div>

          {/* Enterprise */}
          <motion.div
            className="card-surface p-7 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-7">
              <h3 className="font-display text-lg font-bold mb-1">Enterprise</h3>
              <p className="text-muted-foreground text-sm">All premium features, tailored to your needs.</p>
            </div>
            <div className="flex-grow space-y-3.5">
              {enterprisePlanFeatures.map((f, i) => (
                <FeatureItem key={i} checkColor="text-accent" index={i} baseDelay={0.3}>{f}</FeatureItem>
              ))}
            </div>
            <a
              href="mailto:support@modl.gg"
              className="mt-7 block w-full text-center py-3 px-6 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-sm font-medium text-foreground/70 transition-colors"
            >
              Contact for Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
