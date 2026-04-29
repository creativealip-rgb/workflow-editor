import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export async function extractArticleFromUrl(url: string) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.status}`);
  }

  const html = await response.text();
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article) {
    throw new Error("Unable to extract readable article content");
  }

  const body = article.textContent
    ?.replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

  return {
    title: article.title?.trim() || "Untitled article",
    excerpt: article.excerpt?.trim() || "",
    body: body || "",
    byline: article.byline?.trim() || "",
    siteName: article.siteName?.trim() || "",
    length: article.length || 0,
  };
}
