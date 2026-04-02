import { motion } from "framer-motion";
import { ShieldCheck, Headphones, Users, Clock, type LucideIcon } from "lucide-react";

interface StatCard {
  icon: LucideIcon;
  label: string;
  value: string;
  position: string;
  duration: number;
  delay: number;
}

const stats: StatCard[] = [
  {
    icon: ShieldCheck,
    label: "Punishments Today",
    value: "1,247",
    position: "top-[8%] right-[-8%]",
    duration: 5,
    delay: 1.0,
  },
  {
    icon: Headphones,
    label: "Open Tickets",
    value: "23",
    position: "top-[40%] right-[-12%]",
    duration: 6,
    delay: 1.2,
  },
  {
    icon: Users,
    label: "Active Staff",
    value: "8",
    position: "bottom-[18%] left-[-10%]",
    duration: 7,
    delay: 1.4,
  },
  {
    icon: Clock,
    label: "Avg Response",
    value: "4m 12s",
    position: "top-[55%] left-[-8%]",
    duration: 8,
    delay: 1.6,
  },
];

export default function FloatingStats() {
  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          className={`absolute ${stat.position} z-10`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: stat.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="bg-card/90 border border-border/50 rounded-xl px-4 py-3 shadow-[var(--shadow-card-elevated)]"
            style={{
              animation: `float-orbit ${stat.duration}s ease-in-out infinite`,
            }}
          >
            <div className="flex items-center gap-3">
              <stat.icon className="w-4 h-4 text-primary/70" />
              <div>
                <p className="text-[10px] font-mono text-muted-foreground/50 leading-none mb-1">
                  {stat.label}
                </p>
                <p className="text-sm font-bold text-foreground leading-none">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
