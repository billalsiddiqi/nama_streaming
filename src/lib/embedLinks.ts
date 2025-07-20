// lib/embedLinks.ts
import fs from "fs";
import path from "path";

let cachedEmbedLinks: any[] | null = null;

export function getCachedEmbedLinks(): any[] {
  if (cachedEmbedLinks) return cachedEmbedLinks;

  const filePath = path.join(process.cwd(), "public/data/embedLinks.json");
  const fileRaw = fs.readFileSync(filePath, "utf-8");

  try {
    const parsed = JSON.parse(fileRaw);
    cachedEmbedLinks = Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to parse embedLinks.json:", err);
    cachedEmbedLinks = [];
  }

  return cachedEmbedLinks;
}
