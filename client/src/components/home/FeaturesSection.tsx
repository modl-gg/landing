import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Plus, ShieldCheck, Link, Headphones, Bot, Globe, LayoutDashboard, type LucideIcon } from "lucide-react";
import { Button } from "@modl-gg/shared-web/components/ui/button";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  expandedContent: string;
  hero?: boolean;
}

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Smart Punishments",
    description: "Create customizable punishment systems that scale with player behavior patterns.",
    expandedContent: "Our dynamic punishment system utilizes a point system to calculate punishment lengths based on severity (discretionary to staff) and points (based on player history). You can also set custom rules, such as automatically unbanning after a player changes his/her skin or username. These are just some of the features of our smart-punishment system.",
    hero: true,
  },
  {
    icon: Link,
    title: "Account Linking",
    description: "Never issue a ban evasion punishment ever again or mangle with ip-bans.",
    expandedContent: "Automatically link accounts and issue alt-blocking punishments. Handle each linked ban independently, allowing for effortless appeals of siblings and other exceptions.",
  },
  {
    icon: Headphones,
    title: "Support Tickets",
    description: "Integrated ticketing system for reports, appeals, bugs, applications, and support",
    expandedContent: "Customize forms, quick-responses, notify players in-game and via email of ticket updates, and monitor how response times. For example, appeals automatically gather punishment information and you can pardon/reduce bans with 1 click.",
  },
  {
    icon: Bot,
    title: "AI Auto-Moderation",
    description: "AI systems that detect and respond to chat reports in real-time.",
    expandedContent: "Our highly customizable AI helper is able to analyze chat responses against a custom set of rules and issue real-time or manually-verified punishments with ease. It integrates directly into the tickets feature and requires no additional setup (besides purchasing Premium).",
    hero: true,
  },
  {
    icon: Globe,
    title: "Web Integration",
    description: "Stay in control of your server anywhere you go with the web.",
    expandedContent: "A web interface that allows you to manage your server more efficiently than ever before alongside comprehensive in-game tools.",
  },
  {
    icon: LayoutDashboard,
    title: "Analytics Dashboard",
    description: "Comprehensive reports and insights on trends and moderator activity.",
    expandedContent: "Our analytics dashboard gives you deep insights into moderation trends, support trends, and staff activity. Take actions such as rolling back staff punishments, adjusting punishment lengths, and more to combat bad actors.",
    hero: true,
  }
];

const cardReveal = {
  hidden: { opacity: 0, scale: 0.92, rotateX: 4 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FeaturesSection() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const toggleFeature = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  return (
    <section id="features" className="py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header with clip-path reveal */}
        <motion.div
          className="mb-16"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Powerful Moderation Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Everything you need to keep your Minecraft community safe, engaged, and supported
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto" style={{ perspective: "800px" }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isExpanded = expandedFeature === index;
            return (
              <motion.div
                key={index}
                className={`card-surface p-7 ${feature.hero ? "lg:col-span-2" : ""} ${isExpanded ? "card-surface-active" : ""}`}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="w-11 h-11 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => toggleFeature(index)}
                  >
                    {isExpanded ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </Button>
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-border">
                        <p className="text-muted-foreground/70 text-sm leading-relaxed">
                          {feature.expandedContent}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Integration card */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-2xl p-8 bg-gradient-to-br from-primary/[0.06] via-primary/[0.09] to-accent/[0.05] border border-primary/[0.1]">
            <h3 className="font-display text-xl font-bold mb-6">Easy Integration with Your Server</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Drag & drop plugin for any platform",
                "Import from LiteBans and other plugins*",
                "Fully configurable messages and settings",
                "Low latency web-to-game sync"
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                >
                  <Check className="text-emerald-400 mt-0.5 mr-3 shrink-0 w-5 h-5" />
                  <span className="text-muted-foreground text-sm">{text}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/30 mt-5">* Importing from other moderation plugins is available upon request</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
