import { useEffect } from "react";

function setMeta(attrName: string, attrValue: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function Seo({ title, description, canonical }: { title: string; description: string; canonical?: string }) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    if (canonical) setCanonical(canonical);
  }, [title, description, canonical]);
  return null;
}