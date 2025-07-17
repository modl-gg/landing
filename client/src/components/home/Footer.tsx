import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-background py-6 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary font-['Audiowide',cursive]">modl</span>
            <span className="ml-2 text-xs text-muted-foreground mt-1">BETA</span>
          </div>
          <div className="flex space-x-6">
            <a href="/privacy" className="text-muted-foreground hover:text-foreground text-sm">Privacy Policy</a>
            <a href="/terms" className="text-muted-foreground hover:text-foreground text-sm">Terms of Service</a>
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        
        </motion.div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ title, links, delay = 0 }: { title: string; links: string[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + (index * 0.03) }}
          >
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {link}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
