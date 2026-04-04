import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  expandedDescription: string;
  media: string;
  extraMedia?: string[];
  hasImage: boolean;
  gridClass: string;
}

const features: Feature[] = [
  {
    title: "Smart Punishments",
    description: "Points-based severity scaling with auto-rules and consecutive stacking.",
    expandedDescription: "Our dynamic punishment system utilizes a point system to calculate punishment lengths based on severity (discretionary to staff) and points (based on player history). You can also set custom rules, such as automatically unbanning after a player changes his/her skin or username. Stack multiple bans/mutes that execute consecutively — start time is when the player attempts to login unimpeded by other bans/mutes. Traditional, manual punishments also exist (ban, tempban, mute, tempmute, kick, blacklist). Import all bans, mutes, and player data (IPs) from LiteBans seamlessly.",
    media: "https://i.imgur.com/jOJAeO2.gif",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-8.png"],
    hasImage: true,
    gridClass: "lg:col-span-2",
  },
  {
    title: "Account Linking",
    description: "Auto-detect alts via IP tracking. Handle each linked ban independently.",
    expandedDescription: "Link accounts that have the same non-proxy IP logins OR have shared proxy logins within 2 hours of each other. This system tracks logins even if denied by a banned screen, allowing you to link accounts whenever a bad actor screws up and attempts to login on a banned account before logging into their ban evading account. Handle each linked ban independently — was there a mistake? Public internet or sibling? Easily handle the linked ban on a specific account without changing the initial ban. Linked bans expire when the original ban expires automatically.",
    media: "https://i.imgur.com/4Qmt2wt.gif",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-9.png"],
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Player Reporting",
    description: "Auto-snapshot chat, upload evidence, punish from the ticket page.",
    expandedDescription: "Automatically snapshot full context chat-logs when someone is chat-reported. Allow players to upload files or link external evidence to all reports. Issue punishments from reports without leaving the ticket page. Link tickets to punishments that will auto-close the ticket and send a response letting the reporter know the offender was punished. Sort online players by number of reports to identify potential rule breakers across your network. Also integrates with modl-anticheat-bridge for automatic anticheat report creation.",
    media: "https://i.imgur.com/ODXHpjC.gif",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-10.png"],
    hasImage: true,
    gridClass: "",
  },
  {
    title: "AI Moderation",
    description: "Context-aware AI on reported messages. Auto-punish or staff-approve.",
    expandedDescription: "To not pester players and use excessive tokens, AI chat moderation only scans messages that are chat-reported. Constantly evolving system prompts to improve accuracy — the AI is context-aware of Minecraft (e.g: \"i'm going to kill you with a fireball\" is a game term, not an IRL death threat). Configure AI to look for specific things and execute punishments automatically or make suggestions for staff approval.",
    media: "https://cdn.modl.gg/assets/modl-image-11.png",
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Audit & Analytics",
    description: "Rollback actions, track trends, manage evidence from one dashboard.",
    expandedDescription: "Audit and rollback any staff punishment actions. See statistics on average ticket response times and staff activity (ticket responses, punishments issued, etc). See trends for different types of punishments and ticket data. Manage all files uploaded (evidence, ticket attachments): easily view, search, filter, delete, and download all files from a centralized dashboard.",
    media: "https://i.imgur.com/gj49NbH.gif",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-6.png"],
    hasImage: true,
    gridClass: "lg:col-span-2",
  },
  {
    title: "Support Tickets",
    description: "Custom forms, quick-responses, in-game and email notifications.",
    expandedDescription: "Fully customizable knowledgebase homepage with logo, external link, and sections. Searchable markdown article support — write your rules, guidelines, and support articles with ease. Create fully custom forms for bug reports, support tickets, and staff applications with conditional sections. Customizable quick-response buttons to significantly streamline efficiency. Send in-game and email notifications for when staff respond to a player's ticket. Staff members are automatically subscribed to tickets they respond in.",
    media: "https://cdn.modl.gg/assets/modl-image-7.png",
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Web Dashboard",
    description: "Manage your server from anywhere with a powerful web interface.",
    expandedDescription: "A web interface that allows you to manage your server more efficiently than ever before alongside comprehensive in-game tools. Invite your staff team and fully customize their roles and permissions (permission nodes for each punishment type). Set each staff member's Minecraft account so that permissions and punishments are synced between panel and in-game. Make modl yours: upload a custom logo, favicon, homepage image, and set your custom domain.",
    media: "https://cdn.modl.gg/assets/modl-image-3.png",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-2.png"],
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Player Profiles",
    description: "Full player info, session history, notes, and alt accounts at a glance.",
    expandedDescription: "See player info (playtime, session details, country), notes, history, alts, and reports in sleek in-game and web UIs with windows for many open players on web. Full evidence system for uploading files and linking to other sites (YouTube, Imgur, etc). 8-char alphanumeric ID system for streamlined appeal system — staff see all punishment details and can pardon/change duration without leaving the page.",
    media: "https://cdn.modl.gg/assets/modl-image-9.png",
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Fully Open-Source",
    description: "Transparent codebase under AGPL-3.0. Inspect, contribute, and trust the code.",
    expandedDescription: "modl.gg's Minecraft plugin is fully open-source under the AGPL-3.0 license. You can inspect every line of code that runs on your server, contribute improvements, and verify security yourself. We believe in transparency — your server's moderation tools should be auditable and trustworthy. Community contributions are welcome via GitHub.",
    media: "",
    hasImage: false,
    gridClass: "",
  },
  {
    title: "Web-Viewable Replays",
    description: "Review reported incidents with browser-based replay playback.",
    expandedDescription: "When integrated with compatible recording plugins, modl.gg lets staff review reported incidents through web-viewable replays directly in the browser. No need to download replay files or open Minecraft — watch what happened from the comfort of your web panel. Perfect for reviewing combat reports, griefing incidents, and other disputes that require visual context.",
    media: "",
    hasImage: false,
    gridClass: "",
  },
  {
    title: "In-Game Control Menu",
    description: "Full moderation GUI accessible without leaving the game.",
    expandedDescription: "Access the full moderation suite directly in-game through intuitive GUI menus. View player profiles, issue punishments, manage tickets, and review reports without ever needing to tab out to a browser. Designed for staff members who are actively moderating and need quick access to tools while playing. All actions sync instantly with the web panel.",
    media: "",
    hasImage: false,
    gridClass: "",
  },
  {
    title: "Network-Wide Staff Suite",
    description: "Unified moderation across your entire server network.",
    expandedDescription: "modl.gg works across your entire network — whether you're running BungeeCord, Velocity, or standalone servers. Punishments, tickets, reports, and staff permissions are all synchronized. Staff can moderate from any server in your network, and players can't escape punishments by switching servers. Supports Spigot, Paper, Folia, Velocity, and BungeeCord (including forks).",
    media: "",
    hasImage: false,
    gridClass: "",
  },
  {
    title: "Fully Configurable",
    description: "Every message, rule, and behavior is customizable to your needs.",
    expandedDescription: "Everything is fully customizable, from Minecraft plugin locale to ticket forms and punishment types. Smart, thought-out defaults mean you can get started instantly, but every detail can be tweaked. Customize punishment types and point values, ticket form fields with conditional logic, quick-response templates, notification preferences, role permissions with granular permission nodes, and the look and feel of your public-facing pages.",
    media: "",
    hasImage: false,
    gridClass: "lg:col-span-2",
  },
];

const entrances = [
  { x: -30, y: 25 }, { x: 0, y: -25 }, { x: 30, y: 20 },
  { x: -25, y: 30 }, { x: 0, y: 30 }, { x: 25, y: -20 },
  { x: -30, y: 20 }, { x: 30, y: 25 }, { x: -20, y: 30 },
  { x: 20, y: -25 }, { x: -25, y: 25 }, { x: 30, y: 30 },
  { x: 0, y: 35 },
];

const ease = [0.22, 1, 0.36, 1];

function getColCount(): number {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1024) return 4; // lg
  if (window.innerWidth >= 640) return 2;  // sm
  return 1;
}

function getCardSpan(gridClass: string, colCount: number): number {
  // lg:col-span-2 only applies at lg (4 cols), sm:col-span-2 at sm+ (2+ cols)
  if (colCount >= 4 && gridClass.includes("col-span-2")) return 2;
  if (colCount >= 2 && gridClass.includes("sm:col-span-2")) return 2;
  return 1;
}

function computeRowEnds(colCount: number): number[] {
  const lastInRow: number[] = [];
  let c = 0;
  for (let i = 0; i < features.length; i++) {
    const span = getCardSpan(features[i].gridClass, colCount);
    if (c + span > colCount) {
      // card doesn't fit, previous card was end of row
      if (i > 0 && (lastInRow.length === 0 || lastInRow[lastInRow.length - 1] !== i - 1)) {
        lastInRow.push(i - 1);
      }
      c = 0;
    }
    c += span;
    if (c >= colCount) {
      lastInRow.push(i);
      c = 0;
    }
  }
  if (lastInRow.length === 0 || lastInRow[lastInRow.length - 1] !== features.length - 1) {
    lastInRow.push(features.length - 1);
  }
  return lastInRow;
}

function useRowEnds() {
  const [rowEnds, setRowEnds] = useState(() => computeRowEnds(getColCount()));

  useEffect(() => {
    const update = () => setRowEnds(computeRowEnds(getColCount()));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return rowEnds;
}

function getRowEndForCard(rowEnds: number[], cardIndex: number): number {
  for (const end of rowEnds) {
    if (cardIndex <= end) return end;
  }
  return features.length - 1;
}

function CollapsedCard({ feature, index, isSelected, onClick }: {
  feature: Feature;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const entrance = entrances[index];

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border bg-card cursor-pointer min-h-[220px] ${
        isSelected ? "border-primary/40 ring-1 ring-primary/20" : "border-white/[0.06]"
      } ${feature.gridClass}`}
      initial={{ opacity: 0, ...entrance, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease }}
      whileHover={{ scale: 1.015 }}
      onClick={onClick}
    >
      {feature.hasImage ? (
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <img src={feature.media} alt={feature.title} className="w-full h-[110%] object-cover object-top screenshot-sharp" loading="lazy" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-opacity" />
      <div className="relative h-full flex flex-col justify-end p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-bold mb-1 tracking-tight text-white">{feature.title}</h3>
            <p className="text-xs text-white/60 leading-relaxed line-clamp-2">{feature.description}</p>
          </div>
          <ChevronDown className={`w-4 h-4 shrink-0 text-white/30 group-hover:text-white/60 transition-all duration-300 ${isSelected ? "rotate-180 text-primary/60" : ""}`} />
        </div>
      </div>
    </motion.div>
  );
}

function ExpandedPanel({ feature, onClose }: { feature: Feature; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const allMedia = [
    ...(feature.hasImage ? [feature.media] : []),
    ...(feature.extraMedia ?? []),
  ];

  return (
    <motion.div
      ref={panelRef}
      className="col-span-full rounded-2xl border border-primary/20 bg-card overflow-hidden"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="relative p-5 lg:p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] transition-colors"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>

        {/* Content fades in separately for smooth switching */}
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {!feature.hasImage && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent pointer-events-none rounded-2xl" />
          )}

          <div className="relative">
            <h2 className="font-display text-xl font-bold tracking-tight mb-2">{feature.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-3xl">{feature.expandedDescription}</p>
          </div>

          {allMedia.length > 0 && (
            <div className={`grid gap-3 ${allMedia.length === 1 ? "grid-cols-1 max-w-2xl" : "grid-cols-1 sm:grid-cols-2"}`}>
              {allMedia.map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-white/[0.06]">
                  <img src={src} alt="" className="w-full h-auto screenshot-sharp" />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Preload all expanded-view images so they appear instantly on click
function usePreloadImages() {
  useEffect(() => {
    for (const f of features) {
      if (f.media) { const img = new Image(); img.src = f.media; }
      for (const src of f.extraMedia ?? []) { const img = new Image(); img.src = src; }
    }
  }, []);
}

export default function FeaturesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const rowEnds = useRowEnds();
  usePreloadImages();

  const handleClick = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  const expandedRowEnd = expandedIndex !== null ? getRowEndForCard(rowEnds, expandedIndex) : -1;

  // Build grid items: cards + expanded panel slot after each row
  const gridItems: React.ReactNode[] = [];
  const allRowEnds = new Set(rowEnds);

  for (let i = 0; i < features.length; i++) {
    gridItems.push(
      <CollapsedCard
        key={features[i].title}
        feature={features[i]}
        index={i}
        isSelected={expandedIndex === i}
        onClick={() => handleClick(i)}
      />
    );

    // After each row end, place an AnimatePresence slot for the panel
    if (allRowEnds.has(i)) {
      const isThisRow = i === expandedRowEnd && expandedIndex !== null;
      gridItems.push(
        <AnimatePresence key={`panel-slot-${i}`} mode="wait">
          {isThisRow && (
            <ExpandedPanel
              key={`panel-${expandedIndex}`}
              feature={features[expandedIndex]}
              onClose={() => setExpandedIndex(null)}
            />
          )}
        </AnimatePresence>
      );
    }
  }

  return (
    <section id="features" className="pt-6 sm:pt-8 pb-12 px-4 sm:px-6 md:px-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-3">

        {/* Hero glass bar */}
        <motion.div
          className="glass-bar rounded-2xl px-6 py-4 sm:px-8 sm:py-5 flex items-center gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <h1 className="font-brand text-2xl sm:text-3xl tracking-tight shrink-0">
            <span className="text-primary">modl</span>
            <span className="text-foreground/70">.gg</span>
          </h1>
          <span className="w-px h-6 bg-white/10 shrink-0 hidden sm:block" />
          <p className="text-sm text-muted-foreground/70 leading-relaxed">
            The all-in-one moderation and support suite for Minecraft servers — smart punishments, AI moderation, ticketing, analytics, and a full web dashboard.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-3">
          {gridItems}
        </div>
      </div>
    </section>
  );
}
