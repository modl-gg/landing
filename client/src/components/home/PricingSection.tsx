import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocation } from "wouter";
import { type ReactNode } from "react";

const freePlanFeatures: ReactNode[] = [
  <>Up to <b>5</b> staff members</>,
  <><b>Full-feature</b> moderation & support suite</>,
  <>1GB <b>CDN</b> Storage</>,
  <>Free <b>server.modl.gg</b> domain name</>,
  <>No ads, <b>no gimmicks</b></>,
  <><b>Community</b> & developer support</>,
];

const premiumPlanFeatures: ReactNode[] = [
  <><b>Unlimited</b> staff members</>,
  <><b>Full-feature</b> moderation & support suite</>,
  <>200GB <b>CDN</b> Storage ($0.08/GB/month past 200GB)</>,
  <>Use a <b>custom domain</b> name</>,
  <>Beta <b>AI</b> chat moderation & tickets access</>,
  <><b>Priority</b> developer support</>,
];

const enterprisePlanFeatures: ReactNode[] = [
  <><b>Dedicated</b> machine in preferable region (isolated data)</>,
  <>Emails sent from <b>your domain</b></>,
  <>We sign an <b>NDA</b> contract</>,
  <><b>Negotiable</b> rates on storage/AI overage</>,
  <><b>99% SLA</b> contract (+ longer term agreements)</>,
  <>Custom features, <b>tailored theme</b> and UI</>,
];

function FeatureItem({ children, checkColor }: { children: ReactNode; checkColor: string }) {
  return (
    <div className="flex items-start gap-2 text-xs text-muted-foreground">
      <Check className={`${checkColor} w-3.5 h-3.5 shrink-0 mt-0.5`} />
      <span>{children}</span>
    </div>
  );
}

export default function PricingSection() {
  const [, navigate] = useLocation();

  return (
    <section id="pricing" className="py-12 px-4 sm:px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold tracking-tight">Pricing</h2>
          <p className="text-sm text-muted-foreground">Free forever. Fair when you scale.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Free */}
          <motion.div
            className="card-surface p-5 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <h3 className="font-display text-sm font-bold">Free Plan</h3>
                <p className="text-xs text-muted-foreground/60 mt-0.5">Free forever for growing communities.</p>
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">$0</span>
            </div>
            <div className="space-y-2.5 mb-5">
              {freePlanFeatures.map((f, i) => (
                <FeatureItem key={i} checkColor="text-emerald-400">{f}</FeatureItem>
              ))}
            </div>
            <button
              onClick={() => navigate("/register")}
              className="mt-auto block w-full text-center bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-bold rounded-lg py-2.5 transition-colors"
            >
              Register Free
            </button>
          </motion.div>

          {/* Premium */}
          <motion.div
            className="card-surface border-primary/30 p-5 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <h3 className="font-display text-sm font-bold">Premium Plan</h3>
                <p className="text-xs text-muted-foreground/60 mt-0.5">For large communities turning a profit.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-2xl font-bold tracking-tight text-primary">$9.99</span>
                <span className="text-xs text-muted-foreground">/mo</span>
              </div>
            </div>
            <div className="space-y-2.5 mb-5">
              {premiumPlanFeatures.map((f, i) => (
                <FeatureItem key={i} checkColor="text-primary">{f}</FeatureItem>
              ))}
            </div>
            <p className="mt-auto text-center text-[10px] text-muted-foreground/50 py-2.5">
              Purchase in-panel after registering
            </p>
          </motion.div>

          {/* Enterprise */}
          <motion.div
            className="card-surface p-5 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <h3 className="font-display text-sm font-bold">Enterprise</h3>
                <p className="text-xs text-muted-foreground/60 mt-0.5">All premium features, tailored to your needs.</p>
              </div>
              <span className="font-display text-sm font-bold text-foreground/50">Custom</span>
            </div>
            <div className="space-y-2.5 mb-5">
              {enterprisePlanFeatures.map((f, i) => (
                <FeatureItem key={i} checkColor="text-sky-400">{f}</FeatureItem>
              ))}
            </div>
            <a
              href="mailto:support@modl.gg"
              className="mt-auto block w-full text-center py-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 text-xs font-medium text-foreground/70 transition-colors"
            >
              Contact for Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
