import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4">
      <motion.div
        className="flex flex-col items-center text-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-primary font-brand">modl</span>
          <span className="text-foreground font-brand">.gg</span>
        </Link>

        <div>
          <p className="text-7xl font-bold font-display text-primary">404</p>
          <p className="mt-2 text-muted-foreground text-sm">
            This page doesn't exist.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
