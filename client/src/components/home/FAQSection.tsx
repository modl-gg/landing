import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@modl-gg/shared-web/components/ui/accordion";

const FAQData = [
  {
    question: "Why would I bother switching to modl.gg from my current setup?",
    answer: "Switching to modl.gg would provide you with tools more powerful than any other publicly available setup for Minecraft. Our point-based dynamic punishment system fairly calculates punishment durations without any extra work on staff members. Our web panel makes things easy to find and allows staff members to easily cross-reference data between multiple players. We also provide AI-powered tools to automate majority of your reports and tickets, allowing your staff to focus on more important things. Furthermore, moving is easy: we provide a migration tool to effortlessly transfer your existing data. Most importantly, modl.gg is free and will stay free."
  },
  {
    question: "How easy is it to install?",
    answer: "Register your server, install the plugin on your proxy or server, plug in the API key, and you're good to go!"
  },
  {
    question: "Can I customize the moderation rules for my game?",
    answer: "Absolutely! Everything is fully customizable. With smart & thought-out defaults, we let you tweak everything from locale messages to punishment types."
  },
  {
    question: "Can I migrate from LiteBans?",
    answer: "Yes! We offer migration tools to import all of your current punishments and player data from LiteBans."
  },
  {
    question: "Is modl.gg free to use?",
    answer: "Yes! Our platform is completely free to use, and it will stay this way. We provide a premium plan for extra features (targeted towards larger servers), but purchasing it is completely optional."
  },
  {
    question: "What Minecraft server types does modl.gg support?",
    answer: "We support Spigot, Paper, Folia, Velocity, and BungeeCord (forks too). Forge/Fabric support is being worked on right now."
  },
  {
    question: "Where can I report issues and/or give feedback?",
    answer: "You can email us or join our Discord at: modl.gg/discord"
  }
];

const leftColumn = FAQData.slice(0, 4);
const rightColumn = FAQData.slice(4);

function FAQColumn({ items, offset }: { items: typeof FAQData; offset: number }) {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      {items.map((faq, index) => (
        <AccordionItem key={offset + index} value={`item-${offset + index}`} className="border-b-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 + (index * 0.05) }}
          >
            <div className="card-surface overflow-hidden">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-white/[0.02] transition-colors">
                <span className="mr-2 flex-1 text-sm font-semibold text-left font-display leading-snug">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-1">
                <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
              </AccordionContent>
            </div>
          </motion.div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="pt-28 pb-12 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-14"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <FAQColumn items={leftColumn} offset={0} />
          <FAQColumn items={rightColumn} offset={4} />
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-sm">
            Still have questions?{" "}
            <a
              href="https://modl.gg/discord"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Join our Discord community
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
