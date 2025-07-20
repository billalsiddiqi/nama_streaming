import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import path from "path";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  // Validate type
  if (!type || (type !== "movie" && type !== "tv")) {
    return new Response(JSON.stringify({ error: "Invalid type" }), { status: 400 });
  }

  const endpoint = type === "movie" ? "movie/now_playing" : "tv/top_rated";

  try {
    // Fetch from TMDb
    const tmdbRes = await fetch(`${BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&language=fa-IR&page=1`);
    const tmdbData = await tmdbRes.json();
    const items = tmdbData.results;

    // Read local embedLinks.json
    const embedRaw = readFileSync(path.join(process.cwd(), "public/data/embedLinks.json"), "utf-8");
    const embedLinks = JSON.parse(embedRaw);
    const version = embedLinks.version || "v0";

    // Match TMDb results against embedLinks
    const matchedItems = items.map((item: any) => {
      const isAvailable = embedLinks.data.some(
        (embed: any) => embed.tmdb_id === item.id && embed.type === type
      );

      return {
        ...item,
        isAvailable,
        embedVersion: version, // ✅ include version
      };
    });

    // Sort: available first
    const sorted = matchedItems.sort(
      (a: { isAvailable: boolean }, b: { isAvailable: boolean }) =>
        Number(b.isAvailable) - Number(a.isAvailable)
    );

    return new Response(JSON.stringify(sorted), {
      headers: {
        "Cache-Control": "public, max-age=1800", // ✅ Cache for 30 minutes
      },
    });
  } catch (err) {
    console.error("TMDb Fetch Failed", err);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
