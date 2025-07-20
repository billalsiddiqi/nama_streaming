import fs from "fs/promises";
import path from "path";

let cachedEmbedLinks: any[] | null = null;

export async function getCachedEmbedLinks(): Promise<any[]> {
  if (cachedEmbedLinks) return cachedEmbedLinks;

  try {
    const filePath = path.join(process.cwd(), "public/data/embedLinks.json");
    const fileRaw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(fileRaw);
    cachedEmbedLinks = Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to read or parse embedLinks.json:", err);
    cachedEmbedLinks = [];
  }

  return cachedEmbedLinks;
}
