import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@modl-gg/shared-web/components/ui/accordion";

const FAQData = [
  { question: "Why switch to modl.gg?", answer: "Tools more powerful than any publicly available Minecraft moderation setup. Point-based dynamic punishments, AI automation for reports and tickets, a web panel for cross-referencing data, and easy migration from existing setups. Free forever." },
  { question: "How easy is it to install?", answer: "Register your server, install the plugin on your proxy or server, plug in the API key, and you're good to go!" },
  { question: "Can I customize moderation rules?", answer: "Everything is fully customizable — from locale messages to punishment types — with smart defaults out of the box." },
  { question: "Can I migrate from LiteBans?", answer: "Yes! We offer migration tools to import all punishments and player data from LiteBans." },
  { question: "What server types are supported?", answer: "Spigot, Paper, Folia, Velocity, and BungeeCord (including forks). Forge/Fabric support is in progress." },
  { question: "Where can I report issues?", answer: "Email us or join our Discord at modl.gg/discord." },
];

const leftColumn = FAQData.slice(0, 3);
const rightColumn = FAQData.slice(3);

function FAQColumn({ items, offset }: { items: typeof FAQData; offset: number }) {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      {items.map((faq, index) => (
        <AccordionItem
          key={offset + index}
          value={`item-${offset + index}`}
          className="border-b-0 card-surface overflow-hidden data-[state=open]:bg-[hsl(var(--surface-2))] transition-all"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 + index * 0.04 }}
          >
            <AccordionTrigger className="px-4 py-2.5 hover:no-underline hover:bg-white/[0.02] transition-colors">
              <span className="mr-2 flex-1 text-xs font-semibold text-left font-display leading-snug">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              <p className="text-muted-foreground leading-relaxed text-xs">{faq.answer}</p>
            </AccordionContent>
          </motion.div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="pt-12 pb-6 px-4 sm:px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold tracking-tight">FAQ</h2>
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a href="https://modl.gg/discord" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Join our Discord
            </a>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          <FAQColumn items={leftColumn} offset={0} />
          <FAQColumn items={rightColumn} offset={3} />
        </div>
      </div>
    </section>
  );
}
