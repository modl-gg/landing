import { motion } from "framer-motion";
import { Check } from "lucide-react";

const freePlanFeatures = [
  { text: "Up to <b>5</b> staff members" },
  { text: "<b>Full-feature</b> moderation & support suite" },
  { text: "1GB <b>CDN</b> Storage" },
  { text: "No ads, <b>no gimmicks</b>" },
  { text: "<b>Community</b> & developer support" }
];

const premiumPlanFeatures = [
  { text: "<b>Unlimited</b> staff members" },
  { text: "<b>Full-feature</b> moderation & support suite" },
  { text: "200GB <b>CDN</b> Storage ($0.08/GB/month past 200GB)" },
  { text: "Beta <b>AI</b> chat moderation & tickets access" },
  { text: "<b>Priority</b> developer support" }
];

const enterprisePlanFeatures = [
  { text: "<b>Dedicated</b> machine in preferable region (isolated data)" },
  { text: "Emails sent from <b>your domain</b>" },
  { text: "We sign an <b>NDA</b> contract" },
  { text: "<b>Negotiable</b> rates on storage/AI overage" },
  { text: "<b>99% SLA</b> contract (+ longer term agreements)" },
  { text: "Custom features, <b>tailored theme</b> and UI" }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-slate-400">Free forever for hobbyists, fair forever when you get serious.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Free Plan */}
          <motion.div
            className="glass rounded-[2rem] p-8 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Free Plan</h3>
              <p className="text-slate-400 text-sm">Free forever for growing communities.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">$0</span>
                <span className="text-slate-500 font-medium text-sm">/month</span>
              </div>
            </div>
            <div className="flex-grow space-y-4">
              {freePlanFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 text-sm text-slate-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                >
                  <Check className="text-emerald-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: feature.text }} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            className="glass rounded-[2rem] p-8 flex flex-col border-primary/40 shadow-[0_0_30px_rgba(14,165,233,0.05)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Premium Plan</h3>
              <p className="text-slate-400 text-sm">For large communities turning a profit.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">$9.99</span>
                <span className="text-slate-500 font-medium text-sm">/month</span>
              </div>
            </div>
            <div className="flex-grow space-y-4">
              {premiumPlanFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 text-sm text-slate-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                >
                  <Check className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: feature.text }} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            className="glass rounded-[2rem] p-8 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-slate-400 text-sm">For networks that need dedicated infrastructure.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">Custom</span>
              </div>
            </div>
            <div className="flex-grow space-y-4">
              {enterprisePlanFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 text-sm text-slate-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                >
                  <Check className="text-amber-400 w-5 h-5 shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: feature.text }} />
                </motion.div>
              ))}
            </div>
            <a
              href="mailto:support@modl.gg"
              className="mt-8 block w-full text-center py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-slate-200 transition-colors"
            >
              Contact for Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
