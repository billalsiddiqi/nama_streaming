// lib/tmdb.ts
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchGenres(type: "movie" | "tv") {
  const res = await fetch(
    `${BASE_URL}/genre/${type}/list?api_key=${TMDB_API_KEY}&language=fa-IR`
  );
  const data = await res.json();
  return data.genres; // [{ id, name }] where name is in Persian
}

export async function fetchMediaByGenre(genreId: number, type: "movie" | "tv") {
  const url = `${BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&language=fa-IR&${type === "movie" ? "primary_release_date.lte" : "first_air_date.lte"}=2025-12-31`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

export async function fetchSpecialSections(embedLinks: any[]) {
  const specials = [
    {
      name: "Popular",
      name_fa: "محبوب‌ترین‌ها",
      movie_url: `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=fa-IR`,
      tv_url: `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=fa-IR`
    },
    {
      name: "Bollywood",
      name_fa: "بالیوود",
      movie_url: `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=hi&sort_by=popularity.desc&language=fa-IR`,
      tv_url: `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_original_language=hi&sort_by=popularity.desc&language=fa-IR`
    }
  ];

  return await Promise.all(
    specials.map(async (section, index) => {
      const [movieRes, tvRes] = await Promise.all([
        fetch(section.movie_url),
        fetch(section.tv_url)
      ]);
      const movieData = await movieRes.json();
      const tvData = await tvRes.json();

      return {
        id: -index - 1,
        name: section.name,
        name_fa: section.name_fa,
        movies: mapMedia(movieData.results || [], embedLinks, "movie"),
        tv_shows: mapMedia(tvData.results || [], embedLinks, "tv")
      };
    })
  );
}

export function mapMedia(items: any[], embedLinks: any[], type: "movie" | "tv") {
  return items.slice(0, 10).map((item) => {
    const match = embedLinks.find(
      (e: any) => e.tmdb_id === item.id && e.type === type
    );
    return {
      id: item.id,
      title: item.title || item.name || "بدون عنوان",
      title_fa: item.title || item.name || "بدون عنوان",
      cover_image: item.poster_path,
      cover_image_url: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "/placeholder.jpg",
      embed_url: match?.embed_url ?? null
    };
  });
}
