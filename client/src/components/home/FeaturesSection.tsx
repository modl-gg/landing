import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, X, Plus } from "lucide-react";
import { Button } from "modl-shared-web/components/ui/button";

// Define the features array with detailed content
const features = [
  {
    icon: "shield-check",
    title: "Smart Punishments",
    description: "Create customizable punishment systems that scale with player behavior patterns.",
    expandedContent: "Our dynamic punishment system utilizes a point system to calculate punishment lengths based on severity (discretionary to staff) and points (based on player history). You can also set custom rules, such as automatically unbanning after a player changes his/her skin or username. These are just some of the features of our smart-punishment system.",
    bgColor: "bg-primary/20",
    textColor: "text-primary"
  },
  {
    icon: "link",
    title: "Account Linking",
    description: "Never issue a ban evasion punishment ever again or mangle with ip-bans .",
    expandedContent: "Automatically link accounts and issue alt-blocking punishments. Handle each linked ban independently, allowing for effortless appeals of siblings and other exceptions.",
    bgColor: "bg-accent/20",
    textColor: "text-neutral-400"
  },
  {
    icon: "headphones",
    title: "Support Tickets",
    description: "Integrated ticketing system for reports, appeals, bugs, applications, and support",
    expandedContent: "Customize forms, quick-responses, notify players in-game and via email of ticket updates, and monitor how response times. For example, appeals automatically gather punishment information and you can pardon/reduce bans with 1 click.",
    bgColor: "bg-green-500/20",
    textColor: "text-green-500"
  },
  {
    icon: "bot",
    title: "AI Auto-Moderation",
    description: "AI systems that detect and respond to chat violations in real-time.",
    expandedContent: "Our highly customizable AI helper is able to analyze chat responses against a custom set of rules in real-time and issue real-time or manually-verified punishments with ease.",
    bgColor: "bg-primary/20",
    textColor: "text-primary"
  },
  {
    icon: "globe",
    title: "Web Integration",
    description: "Stay in control of your server anywhere you go with the web.",
    expandedContent: "A web interface that allows you to manage your server more efficiently than ever before alongside comprehensive in-game tools.",
    bgColor: "bg-accent/20",
    textColor: "text-neutral-400"
  },
  {
    icon: "layout-dashboard",
    title: "Analytics Dashboard",
    description: "Comprehensive reports and insights on trends and moderator activity.",
    expandedContent: "Our analytics dashboard gives you deep insights into moderation trends, support trends, and staff activity. Take actions such as rollingback staff punishments, adjusting punishment lengths, and more to combat bad actors.",
    bgColor: "bg-green-500/20",
    textColor: "text-green-500"
  }
];

// Icon mapping
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "shield-check":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "link":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
    case "headphones":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1.0 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      );
    case "bot":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "globe":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "layout-dashboard":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function FeaturesSection() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const toggleFeature = (index: number) => {
    if (expandedFeature === index) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(index);
    }
  };

  return (
    <section id="features" className="py-20 bg-card/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Moderation Tools</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to keep your Minecraft community safe, engaged, and supported
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`bg-card rounded-xl border ${expandedFeature === index ? 'border-primary shadow-lg shadow-primary/10' : 'border-gray-800'} p-6 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <span className={feature.textColor}>
                    {getIcon(feature.icon)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => toggleFeature(index)}
                >
                  {expandedFeature === index ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </Button>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              
              <AnimatePresence>
                {expandedFeature === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-gray-800">
                      <p className="text-foreground">
                        {feature.expandedContent}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Integration Features */}
        <motion.div 
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-card rounded-xl border border-gray-800 p-8 text-center">
            <h3 className="text-2xl font-bold mb-6">Easy Integration with Your Server</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { text: "Drag & drop plugin for any platform", delay: 0.1 },
                { text: "Import from Litebans and other plugins*", delay: 0.2 },
                { text: "Fully configurable messages and settings", delay: 0.3 },
                { text: "Low latency web-to-game sync", delay: 0.4 }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: item.delay }}
                >
                  <Check className="text-green-500 mt-0.5 mr-2 shrink-0" />
                  <span className="text-left">{item.text}</span>
                </motion.div>
              ))}
              
            </div>
            <p className="text-xs text-muted-foreground mt-4">* Importing from other moderation plugins is available upon request</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
