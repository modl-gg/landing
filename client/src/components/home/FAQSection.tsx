import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "modl-shared-web/components/ui/accordion";

const FAQData = [
  {
    question: "How easy is it to install?",
    answer: "Register your server, install the plugin on your proxy or server, plug in the API key and you're good to go!"
  },
  {
    question: "Can I customize the moderation rules for my game?",
    answer: "Absolutely! Everything is fully customizable, with smart & thought-out defaults we let you tweak everything from locale messages to punishment types."
  },
  {
    question: "Can I migrate from Litebans?",
    answer: "Yes, we offer migration tools from Litebans to import all of your current punishments (coming soon)."
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-card/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
    </section>
  );
}
