import { useEffect } from "react";
import { defaultImageUrl, siteName, type SeoRoute } from "@/lib/seo";

function setMeta(selector: string, attribute: "content" | "href", value: string) {
  const element = document.head.querySelector(selector);

  if (element) {
    element.setAttribute(attribute, value);
  }
}

export default function SeoHead({ route }: { route: SeoRoute }) {
  useEffect(() => {
    document.title = route.title;
    setMeta('meta[name="description"]', "content", route.description);
    setMeta('link[rel="canonical"]', "href", route.url);
    setMeta('meta[property="og:site_name"]', "content", siteName);
    setMeta('meta[property="og:title"]', "content", route.title);
    setMeta('meta[property="og:description"]', "content", route.description);
    setMeta('meta[property="og:image"]', "content", defaultImageUrl);
    setMeta('meta[property="og:url"]', "content", route.url);
    setMeta('meta[name="twitter:title"]', "content", route.title);
    setMeta('meta[name="twitter:description"]', "content", route.description);
    setMeta('meta[name="twitter:image"]', "content", defaultImageUrl);
  }, [route]);

  return null;
}

