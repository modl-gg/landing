import { useRef, useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import X from "lucide-react/dist/esm/icons/x.js";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.js";
import ZoomIn from "lucide-react/dist/esm/icons/zoom-in.js";
import ZoomOut from "lucide-react/dist/esm/icons/zoom-out.js";
import RotateCcw from "lucide-react/dist/esm/icons/rotate-ccw.js";
import ExternalLink from "lucide-react/dist/esm/icons/external-link.js";

interface Feature {
  title: string;
  description: string;
  expandedDescription: ReactNode;
  media: string;
  extraMedia?: string[];
  hasImage: boolean;
  gridClass: string;
}

const B = ({ children }: { children: ReactNode }) => (
  <span className="text-foreground/90 font-medium">{children}</span>
);
const Li = ({ children }: { children: ReactNode }) => (
  <li className="pl-1">{children}</li>
);

const features: Feature[] = [
  {
    title: "Smart Punishments",
    description:
      "Dynamically scale punishments based on discretionary leniencies and past offenses.",
    expandedDescription: (
      <>
        <p className="mb-3">
          Designed to fairly and consistently sanction players whilst
          maintaining moderator discretion.
        </p>
        <ul className="list-disc list-outside ml-4 space-y-1.5">
          <Li>
            Fully customizable <B>point system</B> to designate low, medium, and
            habitual designations for both Gameplay and Social offenses
          </Li>
          <Li>
            Fully customizable punishment durations for each <B>severity</B>{" "}
            (lenient, normal, severe) and each <B>offender status</B> (low,
            medium, habitual)
          </Li>
          <Li>
            Issue punishments for bad usernames and skins that{" "}
            <B>automatically pardon</B> when a player changes their
            skin/username
          </Li>
          <Li>
            Ability to make a ban "stat-wiping" that issues a command on the
            server upon expiration to reset stats
          </Li>
          <Li>
            Full modification system for <B>changing durations</B> and{" "}
            <B>pardoning</B> (remove points)
          </Li>
          <Li>
            Full evidence system for <B>uploading files</B> and linking to other
            sites (YouTube, Imgur, etc)
          </Li>
          <Li>
            8-char alphanumeric ID system for streamlined appeals - staff see
            all punishment details and can pardon/change duration without
            leaving the page
          </Li>
          <Li>
            Bans on offline players wait until a successful login to start the
            expiration countdown
          </Li>
          <Li>
            Stack multiple bans/mutes that execute <B>consecutively</B> (one
            after the other becomes inactive)
          </Li>
          <Li>
            Traditional, manual punishments also exist (ban, tempban, mute,
            tempmute, kick, blacklist)
          </Li>
          <Li>
            Import all bans, mutes, and player data (IPs) from <B>LiteBans</B>{" "}
            seamlessly
          </Li>
        </ul>
      </>
    ),
    media: "https://i.imgur.com/jOJAeO2.gif",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-8.png"],
    hasImage: true,
    gridClass: "lg:col-span-2",
  },
  {
    title: "Account Linking",
    description:
      "Auto-detect alts via IP tracking. Handle each linked ban independently.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          See player info (playtime, session details, country), notes, history,
          alts, reports in sleek in-game and web UIs
        </Li>
        <Li>
          <B>Link accounts</B> that have the same non-proxy IP logins OR shared
          proxy logins within 2 hours of each other
        </Li>
        <Li>
          Tracks logins even if denied by a banned screen - link accounts
          whenever a <B>bad actor</B> attempts to login on a banned account
          before logging into their evading account
        </Li>
        <Li>
          Handle each linked ban <B>independently</B> - mistake? Public internet
          or sibling? Easily manage without changing the initial ban
        </Li>
        <Li>Linked bans expire when the original ban expires automatically</Li>
      </ul>
    ),
    media: "https://i.imgur.com/4Qmt2wt.gif",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-9.png"],
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Player Reporting",
    description:
      "Auto-snapshot chat, upload evidence, punish from the ticket page.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          Automatically <B>snapshot</B> full context chat-logs when someone is
          chat-reported
        </Li>
        <Li>
          Allow players to <B>upload files</B> or link external evidence to all
          reports
        </Li>
        <Li>Issue punishments from reports without leaving the ticket page</Li>
        <Li>
          Link tickets to punishments that will auto-close the ticket and notify
          the reporter that the offender was punished
        </Li>
        <Li>
          Integrates with <B>modl-anticheat-bridge</B> - anti-cheat
          automatically creates reports based on flags
        </Li>
        <Li>
          Sort online players by number of reports to identify potential rule
          breakers across your network
        </Li>
      </ul>
    ),
    media: "https://i.imgur.com/ODXHpjC.gif",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-10.png"],
    hasImage: true,
    gridClass: "",
  },
  {
    title: "AI Moderation",
    description:
      "Context-aware AI on reported messages. Auto-punish or staff-approve.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          AI chat moderation <B>only scans messages that are chat-reported</B> -
          no mass-scanning, no annoying false auto-mutes, no excessive token
          usage
        </Li>
        <Li>
          Constantly evolving system prompts to improve <B>accuracy</B> -
          context-aware of Minecraft (e.g. "i'm going to kill you with a
          fireball" is a game term, not an IRL death threat)
        </Li>
        <Li>
          Configure AI to look for specific things and execute punishments{" "}
          <B>automatically</B> or make suggestions for staff approval
        </Li>
      </ul>
    ),
    media: "https://cdn.modl.gg/assets/modl-image-11.png",
    hasImage: true,
    gridClass: "",
  },
  {
    title: "In-Game Control Menu",
    description: "Full moderation GUI accessible without leaving the game.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          Access the full moderation suite directly in-game through intuitive{" "}
          <B>GUI menus</B>
        </Li>
        <Li>
          View player profiles, issue punishments, manage tickets, and review
          reports
        </Li>
        <Li>
          Designed for staff actively moderating who need <B>quick access</B>{" "}
          while playing
        </Li>
        <Li>All actions sync instantly with the web panel</Li>
      </ul>
    ),
    media: "https://i.imgur.com/gj49NbH.gif",
    hasImage: true,
    gridClass: "lg:col-span-2",
  },
  {
    title: "Support Tickets",
    description:
      "Custom forms, quick-responses, in-game and email notifications.",
    expandedDescription: (
      <>
        <p className="mb-3">
          Use <B>your own domain</B> (recommended: support.yourserver.com)
        </p>
        <ul className="list-disc list-outside ml-4 space-y-1.5">
          <Li>
            <B>Fully customizable</B> knowledgebase homepage with logo, external
            link, and sections
          </Li>
          <Li>
            Searchable markdown article support - write <B>your</B> rules,
            guidelines, and support articles with ease
          </Li>
          <Li>
            Create fully <B>custom forms</B> for bug reports, support tickets,
            and staff applications: reveal hidden sections based on answer to
            multiple-choice questions
          </Li>
          <Li>
            Customizable <B>quick-response buttons</B> to significantly
            streamline efficiency and keep responses consistent
          </Li>
          <Li>
            Send in-game and email <B>notifications</B> for when staff respond
            to a player's ticket
          </Li>
          <Li>
            Browser cookies verify that responses in tickets are from the same
            initial responder
          </Li>
          <Li>
            Staff members are automatically <B>subscribed</B> to tickets they
            respond in and can easily track updates in their home feed
          </Li>
        </ul>
      </>
    ),
    media: "https://cdn.modl.gg/assets/modl-image-7.png",
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Web Dashboard",
    description:
      "Manage your server from anywhere with a powerful web interface.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          Invite your staff team and fully customize their <B>roles</B> and
          permissions (permission nodes for each punishment type)
        </Li>
        <Li>
          Set each staff member's Minecraft account so that permissions and
          punishments are <B>synced</B> between panel and in-game
        </Li>
        <Li>
          Make modl yours: upload a custom logo, favicon, homepage image, and
          set your custom domain
        </Li>
        <Li>
          Everything is fully <B>customizable</B>, from Minecraft plugin locale
          to ticket forms and punishment types
        </Li>
      </ul>
    ),
    media: "https://cdn.modl.gg/assets/modl-image-3.png",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-2.png"],
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Player Profiles",
    description:
      "Full player info, session history, notes, and alt accounts at a glance.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          See player info (playtime, session details, country), notes, history,
          alts, reports in sleek in-game and web UIs
        </Li>
        <Li>
          Open <B>multiple player windows</B> simultaneously on the web panel
        </Li>
        <Li>
          Full evidence system for <B>uploading files</B> and linking to other
          sites (YouTube, Imgur, etc)
        </Li>
        <Li>
          8-char alphanumeric ID system for streamlined appeals - staff see all
          punishment details and can <B>pardon/change duration</B> without
          leaving the page
        </Li>
        <Li>
          <B>Customize</B> the appeal page for each different punishment type
        </Li>
      </ul>
    ),
    media: "https://cdn.modl.gg/assets/modl-image-9.png",
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Fully Open-Source",
    description:
      "Transparent codebase under AGPL-3.0. Inspect, contribute, and trust the code.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          Minecraft plugin is fully open-source under the <B>AGPL-3.0</B>{" "}
          license
        </Li>
        <Li>Inspect every line of code that runs on your server</Li>
        <Li>Contribute improvements and verify security yourself</Li>
        <Li>
          Community contributions welcome via <B>GitHub</B>
        </Li>
      </ul>
    ),
    media: "https://cdn.modl.gg/assets/modl-image-16.png",
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Fully Configurable",
    description:
      "Every message, rule, and behavior is customizable to your needs.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          Everything is fully customizable - from Minecraft plugin <B>locale</B>{" "}
          to ticket forms and punishment types
        </Li>
        <Li>
          Smart, thought-out <B>defaults</B> mean you can get started instantly
        </Li>
        <Li>Customize punishment types and point values</Li>
        <Li>
          Ticket form fields with <B>conditional logic</B>
        </Li>
        <Li>Quick-response templates and notification preferences</Li>
        <Li>
          Role permissions with <B>granular permission nodes</B>
        </Li>
        <Li>Customize the look and feel of your public-facing pages</Li>
      </ul>
    ),
    media: "https://cdn.modl.gg/assets/modl-image-12.png",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-17.png"],
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Audit & Analytics",
    description:
      "Rollback actions, track trends, manage evidence from one dashboard.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          Audit and <B>rollback</B> any staff punishment actions
        </Li>
        <Li>
          See statistics on average ticket response times and{" "}
          <B>staff activity</B> (ticket responses, punishments issued, etc)
        </Li>
        <Li>
          See <B>trends</B> for different types of punishments and ticket data
        </Li>
        <Li>
          Manage all files uploaded (evidence, ticket attachments): easily view,
          search, filter, delete, and download all files
        </Li>
      </ul>
    ),
    media: "https://cdn.modl.gg/assets/modl-image-6.png",
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Network-Wide Staff Suite",
    description: "Unified moderation across your entire server network.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          Works across your entire network - <B>BungeeCord, Velocity</B>, or
          standalone servers
        </Li>
        <Li>
          Punishments, tickets, reports, and staff permissions are all{" "}
          <B>synchronized</B>
        </Li>
        <Li>
          Staff can moderate from any server - players can't escape punishments
          by switching servers
        </Li>
        <Li>
          Supports Spigot, Paper, Folia, Velocity, and BungeeCord (including
          forks)
        </Li>
      </ul>
    ),
    media: "https://cdn.modl.gg/assets/modl-image-13.png",
    extraMedia: ["https://cdn.modl.gg/assets/modl-image-14.png"],
    hasImage: true,
    gridClass: "",
  },
  {
    title: "Web-Viewable Replays",
    description:
      "Review reported incidents with browser-based replay playback.",
    expandedDescription: (
      <ul className="list-disc list-outside ml-4 space-y-1.5">
        <Li>
          Review reported incidents through <B>web-viewable replays</B> directly
          in the browser
        </Li>
        <Li>No need to download replay files or open Minecraft</Li>
        <Li>
          Perfect for reviewing combat reports, griefing incidents, and disputes
          that require visual context
        </Li>
        <Li>Integrates with compatible recording plugins</Li>
      </ul>
    ),
    media: "https://i.imgur.com/sUPB6Vd.gif",
    hasImage: true,
    gridClass: "lg:col-span-2",
  },
];

const entrances = [
  { x: -30, y: 25 },
  { x: 0, y: -25 },
  { x: 30, y: 20 },
  { x: -25, y: 30 },
  { x: 0, y: 30 },
  { x: 25, y: -20 },
  { x: -30, y: 20 },
  { x: 30, y: 25 },
  { x: -20, y: 30 },
  { x: 20, y: -25 },
  { x: -25, y: 25 },
  { x: 30, y: 30 },
  { x: 0, y: 35 },
];

const ease = [0.22, 1, 0.36, 1];

function getColCount(): number {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1024) return 4; // lg
  if (window.innerWidth >= 640) return 2; // sm
  return 1;
}

function getCardSpan(gridClass: string, colCount: number): number {
  // lg:col-span-2 only applies at lg (4 cols), sm:col-span-2 at sm+ (2+ cols)
  if (colCount >= 4 && gridClass.includes("col-span-2")) return 2;
  if (colCount >= 2 && gridClass.includes("sm:col-span-2")) return 2;
  return 1;
}

function computeRows(colCount: number): number[][] {
  const rows: number[][] = [];
  let currentRow: number[] = [];
  let currentSpan = 0;

  for (let i = 0; i < features.length; i++) {
    const span = getCardSpan(features[i].gridClass, colCount);

    if (currentSpan + span > colCount && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [];
      currentSpan = 0;
    }

    currentRow.push(i);
    currentSpan += span;

    if (currentSpan >= colCount) {
      rows.push(currentRow);
      currentRow = [];
      currentSpan = 0;
    }
  }

  if (currentRow.length > 0) rows.push(currentRow);

  return rows;
}

function useFeatureRows() {
  const [rows, setRows] = useState(() => computeRows(getColCount()));

  useEffect(() => {
    let lastCols = getColCount();
    let timer: number | undefined;
    const update = () => {
      const cols = getColCount();
      if (cols === lastCols) return;
      lastCols = cols;
      setRows(computeRows(cols));
    };
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(update, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, []);

  return rows;
}

function isAnimatedMedia(src: string): boolean {
  return /\.gif(\?|$)/i.test(src);
}

function toVideoSrc(src: string): string {
  return src.replace(/\.gif(\?|$)/i, ".mp4$1");
}

function CollapsedCard({
  feature,
  index,
  isSelected,
  isAboveFold,
  onClick,
}: {
  feature: Feature;
  index: number;
  isSelected: boolean;
  isAboveFold: boolean;
  onClick: () => void;
}) {
  const entrance = entrances[index];
  const animated = feature.hasImage && isAnimatedMedia(feature.media);

  return (
    <motion.div
      className={`feature-card group relative overflow-hidden rounded-2xl border bg-card cursor-pointer min-h-[220px] transition-colors duration-300 hover:border-primary/25 ${
        isSelected
          ? "border-primary/40 ring-1 ring-primary/20"
          : "border-white/[0.06]"
      } ${feature.gridClass}`}
      initial={{ opacity: 0, ...entrance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -24px 0px" }}
      transition={{ duration: 0.55, delay: index * 0.025, ease }}
      onClick={onClick}
    >
      {feature.hasImage ? (
        <div className="absolute inset-0">
          {animated ? (
            <video
              src={toVideoSrc(feature.media)}
              className="w-full h-full object-cover object-top screenshot-sharp"
              autoPlay
              muted
              loop
              playsInline
              preload={isAboveFold ? "auto" : "metadata"}
              disableRemotePlayback
              aria-label={feature.title}
            />
          ) : (
            <img
              src={feature.media}
              alt={feature.title}
              className="w-full h-full object-cover object-top screenshot-sharp"
              loading={isAboveFold ? "eager" : "lazy"}
              decoding="async"
              {...(isAboveFold ? { fetchPriority: "high" as const } : {})}
            />
          )}
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent" />
      )}

      <div className="feature-card-frost absolute inset-0 flex flex-col justify-end px-5 pt-4 pb-5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="feature-card-title font-display text-base font-bold mb-1 tracking-tight text-white">
              {feature.title}
            </h3>
            <p className="feature-card-desc text-xs text-white/95 leading-relaxed line-clamp-2">
              {feature.description}
            </p>
          </div>
          <ChevronDown
            className={`w-4 h-4 shrink-0 text-white/70 group-hover:text-white/95 transition-transform duration-300 ${isSelected ? "rotate-180 text-primary" : ""}`}
          />
        </div>
      </div>
    </motion.div>
  );
}

type PreviewMedia = {
  src: string;
  alt: string;
  kind: "image" | "video";
};

function MediaPreviewModal({
  media,
  onClose,
}: {
  media: PreviewMedia;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{
    pointerId: number;
    x: number;
    y: number;
    startX: number;
    startY: number;
  } | null>(null);

  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [media.src]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "+" || event.key === "=")
        setZoom((value) => Math.min(4, value + 0.25));
      if (event.key === "-") setZoom((value) => Math.max(1, value - 0.25));
      if (event.key === "0") {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const setConstrainedZoom = (nextZoom: number) => {
    const constrained = Math.min(4, Math.max(1, nextZoom));
    setZoom(constrained);
    if (constrained === 1) setPosition({ x: 0, y: 0 });
  };

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 bg-[#07090d]/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onWheel={(event) => {
        event.preventDefault();
        setConstrainedZoom(zoom + (event.deltaY < 0 ? 0.2 : -0.2));
      }}
    >
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white/90">
            {media.alt}
          </p>
          <p className="text-xs text-white/[0.46]">
            Scroll or use controls to zoom. Drag while zoomed.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setConstrainedZoom(zoom - 0.25)}
            className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-xs font-medium text-white/60">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setConstrainedZoom(zoom + 0.25)}
            className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={resetView}
            className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <a
            href={media.src}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={media.kind === "video" ? "Open original video" : "Open original image"}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/[0.18] hover:text-white"
            aria-label={media.kind === "video" ? "Close video preview" : "Close image preview"}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="relative z-10 flex h-full cursor-zoom-out items-center justify-center px-4 pb-8 pt-24 sm:px-8"
        onClick={onClose}
      >
        {media.kind === "video" ? (
          <motion.video
            src={media.src}
            aria-label={media.alt}
            className={`max-h-full max-w-full select-none rounded-lg border border-white/10 bg-[#101219] object-contain shadow-2xl ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
            autoPlay
            loop
            muted
            playsInline
            controls
            disableRemotePlayback
            style={{
              x: position.x,
              y: position.y,
              scale: zoom,
              transformOrigin: "center",
            }}
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => {
              event.stopPropagation();
              if (zoom <= 1) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              dragStart.current = {
                pointerId: event.pointerId,
                x: event.clientX,
                y: event.clientY,
                startX: position.x,
                startY: position.y,
              };
            }}
            onPointerMove={(event) => {
              if (
                !dragStart.current ||
                dragStart.current.pointerId !== event.pointerId
              )
                return;
              setPosition({
                x: dragStart.current.startX + event.clientX - dragStart.current.x,
                y: dragStart.current.startY + event.clientY - dragStart.current.y,
              });
            }}
            onPointerUp={(event) => {
              if (dragStart.current?.pointerId === event.pointerId)
                dragStart.current = null;
            }}
            onPointerCancel={() => {
              dragStart.current = null;
            }}
          />
        ) : (
          <motion.img
            src={media.src}
            alt={media.alt}
            className={`max-h-full max-w-full select-none rounded-lg border border-white/10 bg-[#101219] object-contain shadow-2xl ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
            draggable={false}
            style={{
              x: position.x,
              y: position.y,
              scale: zoom,
              transformOrigin: "center",
            }}
            onClick={(event) => {
              event.stopPropagation();
              if (zoom === 1) setConstrainedZoom(1.75);
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              if (zoom <= 1) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              dragStart.current = {
                pointerId: event.pointerId,
                x: event.clientX,
                y: event.clientY,
                startX: position.x,
                startY: position.y,
              };
            }}
            onPointerMove={(event) => {
              if (
                !dragStart.current ||
                dragStart.current.pointerId !== event.pointerId
              )
                return;
              setPosition({
                x: dragStart.current.startX + event.clientX - dragStart.current.x,
                y: dragStart.current.startY + event.clientY - dragStart.current.y,
              });
            }}
            onPointerUp={(event) => {
              if (dragStart.current?.pointerId === event.pointerId)
                dragStart.current = null;
            }}
            onPointerCancel={() => {
              dragStart.current = null;
            }}
          />
        )}
      </div>
    </motion.div>,
    document.body,
  );
}

function ExpandedPanel({
  feature,
  onClose,
  onPreviewMedia,
}: {
  feature: Feature;
  onClose: () => void;
  onPreviewMedia: (media: PreviewMedia) => void;
}) {
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
      className="rounded-2xl border border-primary/20 bg-card overflow-hidden"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.28, ease }}
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
            <h2 className="font-display text-xl font-bold tracking-tight mb-2">
              {feature.title}
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-3xl">
              {feature.expandedDescription}
            </div>
          </div>

          {allMedia.length > 0 && (
            <div
              className={`grid items-start gap-3 ${allMedia.length === 1 ? "grid-cols-1 max-w-3xl" : "grid-cols-1 sm:grid-cols-2"}`}
            >
              {allMedia.map((src, i) => {
                const alt = `${feature.title} preview ${i + 1}`;
                if (isAnimatedMedia(src)) {
                  const videoSrc = toVideoSrc(src);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        onPreviewMedia({
                          src: videoSrc,
                          alt,
                          kind: "video",
                        })
                      }
                      className="group/media relative overflow-hidden rounded-xl border border-white/[0.11] bg-transparent transition-colors hover:border-primary/[0.35] focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/60"
                    >
                      <video
                        src={videoSrc}
                        className="block h-auto w-full max-h-[460px] object-contain screenshot-sharp transition-[filter] duration-300 group-hover/media:brightness-110 pointer-events-none"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        disableRemotePlayback
                        aria-label={alt}
                      />
                      <span className="pointer-events-none absolute bottom-3 right-3 rounded-lg border border-white/10 bg-[#07090d]/70 px-2 py-1 text-[11px] font-medium text-white/[0.62] opacity-0 backdrop-blur-sm transition-opacity group-hover/media:opacity-100">
                        Preview
                      </span>
                    </button>
                  );
                }
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() =>
                      onPreviewMedia({
                        src,
                        alt,
                        kind: "image",
                      })
                    }
                    className="group/media relative overflow-hidden rounded-xl border border-white/[0.11] bg-transparent transition-colors hover:border-primary/[0.35] focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/60"
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full max-h-[460px] object-contain screenshot-sharp transition-[filter] duration-300 group-hover/media:brightness-110"
                    />
                    <span className="pointer-events-none absolute bottom-3 right-3 rounded-lg border border-white/10 bg-[#07090d]/70 px-2 py-1 text-[11px] font-medium text-white/[0.62] opacity-0 backdrop-blur-sm transition-opacity group-hover/media:opacity-100">
                      Preview
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Warm just the extra-media images for whichever card is expanded.
// Collapsed cards already fetch `feature.media` via their own <img> tags.
function usePrefetchExtraMedia(extraMedia: string[] | undefined) {
  useEffect(() => {
    if (!extraMedia?.length) return;
    for (const src of extraMedia) {
      const img = new Image();
      if ("fetchPriority" in img) {
        (img as HTMLImageElement & { fetchPriority: string }).fetchPriority =
          "low";
      }
      img.decoding = "async";
      img.src = src;
    }
  }, [extraMedia]);
}

export default function FeaturesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [previewMedia, setPreviewMedia] = useState<PreviewMedia | null>(null);
  const rows = useFeatureRows();
  usePrefetchExtraMedia(
    expandedIndex !== null ? features[expandedIndex].extraMedia : undefined,
  );

  const handleClick = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

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
            The comprehensive moderation and support suite for Minecraft
            servers: smart punishments, web replays, efficient ticketing, robust
            analytics, and a full web dashboard.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="flex flex-col gap-3">
          {rows.map((row, rowIndex) => {
            const isExpandedRow =
              expandedIndex !== null && row.includes(expandedIndex);

            return (
              <div key={`feature-row-${rowIndex}`} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-3">
                  {row.map((featureIndex) => (
                    <CollapsedCard
                      key={features[featureIndex].title}
                      feature={features[featureIndex]}
                      index={featureIndex}
                      isSelected={expandedIndex === featureIndex}
                      isAboveFold={rowIndex === 0}
                      onClick={() => handleClick(featureIndex)}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {isExpandedRow && expandedIndex !== null && (
                    <ExpandedPanel
                      key={`panel-${expandedIndex}`}
                      feature={features[expandedIndex]}
                      onClose={() => setExpandedIndex(null)}
                      onPreviewMedia={setPreviewMedia}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {previewMedia && (
            <MediaPreviewModal
              media={previewMedia}
              onClose={() => setPreviewMedia(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
