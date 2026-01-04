import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@modl-gg/shared-web/components/ui/accordion";
import { MODL } from "@modl-gg/shared-web";

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

export default function FAQSection() {
  return (
    <section id="faq" className="bg-card/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="max-w-4xl pt-20 pb-4 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                >
                  <div className="bg-card rounded-xl border border-gray-800 mb-3">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="text-lg font-medium text-left">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-muted-foreground">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </div>
                </motion.div>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      <p className="text-muted-foreground mt-0 mb-8 text-center mx-auto">Contact us at {MODL.Email.SUPPORT}</p>
    </section>
  );
}
