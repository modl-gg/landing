import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const baseHtml = readFileSync(join(dist, "index.html"), "utf8");
const siteName = "modl.gg";
const siteUrl = "https://modl.gg/";
const imageUrl = "https://modl.gg/modl-banner.png";

const routes = [
  {
    path: "register",
    url: "https://modl.gg/register",
    title: "Register Your Minecraft Server - modl.gg",
    description:
      "Register your Minecraft server for modl.gg to start using smart moderation, support tickets, appeals, reports, analytics, and web-based staff tools.",
  },
  {
    path: "privacy",
    url: "https://modl.gg/privacy",
    title: "Privacy Policy - modl.gg",
    description:
      "Read the modl.gg privacy policy for the Minecraft moderation and support platform.",
  },
  {
    path: "terms",
    url: "https://modl.gg/terms",
    title: "Terms of Service - modl.gg",
    description:
      "Read the modl.gg terms of service for the Minecraft moderation and support platform.",
  },
];

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`Missing tag for replacement: ${pattern}`);
  }

  return html.replace(pattern, replacement);
}

function createWebPageSchema(route) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: route.title,
    url: route.url,
    description: route.description,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}

function withRouteMetadata(html, route) {
  const description = escapeAttribute(route.description);
  const title = escapeAttribute(route.title);

  let next = replaceTag(html, /<title>.*?<\/title>/, `<title>${title}</title>`);
  next = replaceTag(next, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${route.url}" />`);
  next = replaceTag(next, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`);
  next = replaceTag(next, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`);
  next = replaceTag(next, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`);
  next = replaceTag(next, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${imageUrl}" />`);
  next = replaceTag(next, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${route.url}" />`);
  next = replaceTag(next, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`);
  next = replaceTag(next, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`);
  next = replaceTag(next, /<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${imageUrl}" />`);
  next = replaceTag(
    next,
    /<script type="application\/ld\+json" data-route-schema>[\s\S]*?<\/script>/,
    `<script type="application/ld+json" data-route-schema>${JSON.stringify(createWebPageSchema(route))}</script>`,
  );

  return next;
}

for (const route of routes) {
  const html = withRouteMetadata(baseHtml, route);
  const nestedOutputPath = join(dist, route.path, "index.html");
  const flatOutputPath = join(dist, `${route.path}.html`);

  mkdirSync(dirname(nestedOutputPath), { recursive: true });
  writeFileSync(nestedOutputPath, html);
  writeFileSync(flatOutputPath, html);
}

console.log(`Generated ${routes.length} route-specific SEO HTML files.`);
