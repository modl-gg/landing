export const siteUrl = "https://modl.gg";
export const siteName = "modl.gg";
export const defaultImageUrl = `${siteUrl}/modl-banner.png`;

export type SeoRoute = {
  path: string;
  url: string;
  title: string;
  description: string;
};

export const seoRoutes = {
  home: {
    path: "/",
    url: `${siteUrl}/`,
    title: "modl.gg - Minecraft Moderation Plugin & Support Suite",
    description:
      "modl.gg is a free, open-source Minecraft moderation plugin and support suite with smart punishments, reports, appeals, tickets, web replays, analytics, and a web dashboard.",
  },
  register: {
    path: "/register",
    url: `${siteUrl}/register`,
    title: "modl.gg - Register Your Minecraft Server",
    description:
      "Register your Minecraft server for modl.gg to start using smart moderation, support tickets, appeals, reports, analytics, and web-based staff tools.",
  },
  privacy: {
    path: "/privacy",
    url: `${siteUrl}/privacy`,
    title: "modl.gg - Privacy Policy",
    description:
      "Read the modl.gg privacy policy for the Minecraft moderation and support platform.",
  },
  terms: {
    path: "/terms",
    url: `${siteUrl}/terms`,
    title: "modl.gg - Terms of Service",
    description:
      "Read the modl.gg terms of service for the Minecraft moderation and support platform.",
  },
  dpa: {
    path: "/dpa",
    url: `${siteUrl}/dpa`,
    title: "modl.gg - Data Processing Addendum",
    description:
      "Read the modl.gg data processing addendum covering how player data is processed on behalf of Minecraft server owners.",
  },
} as const satisfies Record<string, SeoRoute>;

export const sameAsLinks = [
  "https://github.com/modl-gg",
  "https://modl.gg/discord",
  "https://www.spigotmc.org/resources/modl-support-moderation-reimagined.127780/",
  "https://modrinth.com/plugin/modl",
] as const;

