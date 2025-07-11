import { NextRequest } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY; // No NEXT_PUBLIC!

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint");
  if (!endpoint) {
    return new Response(JSON.stringify({ error: "Missing endpoint" }), { status: 400 });
  }
  if (!TMDB_API_KEY) {
    return new Response(JSON.stringify({ error: "API key missing" }), { status: 500 });
  }

  // Build TMDB URL with all params except endpoint
  const params = new URLSearchParams();
  searchParams.forEach((value, key) => {
    if (key !== "endpoint") params.append(key, value);
  });
  params.append("api_key", TMDB_API_KEY);

  const url = `${BASE_URL}/${endpoint}?${params.toString()}`;

  try {
    const tmdbRes = await fetch(url, { cache: "no-store" });
    const data = await tmdbRes.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch from TMDB" }), { status: 500 });
  }
}

