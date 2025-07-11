// lib/tmdb.ts
const LOCAL_API = "/api/tmdb";

// Types
export type Show = {
  id: number;
  name: string;
  poster_path: string;
  [key: string]: any;
};

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  [key: string]: any;
};

/**
 * Fetch genres for movies or TV shows.
 */
export async function fetchGenres(type: "movie" | "tv", language = "fa-IR") {
  const res = await fetch(`${LOCAL_API}?endpoint=genre/${type}/list&language=${language}`);
  const data = await res.json();
  return data.genres;
}

/**
 * Fetch media by genre.
 */
export async function fetchMediaByGenre(
  genreId: number,
  type: "movie" | "tv",
  language = "fa-IR"
) {
  const dateParam = type === "movie" ? "primary_release_date.lte" : "first_air_date.lte";
  const res = await fetch(
    `${LOCAL_API}?endpoint=discover/${type}&with_genres=${genreId}&sort_by=popularity.desc&language=${language}&${dateParam}=2025-12-31`
  );
  const data = await res.json();
  return data.results;
}

/**
 * Fetch special sections (e.g. Popular, Bollywood).
 */
export async function fetchSpecialSections(embedLinks: any[], language = "fa-IR") {
  const specials = [
    {
      name: "Popular",
      name_fa: "محبوب‌ترین‌ها",
      movie_endpoint: `movie/popular`,
      tv_endpoint: `tv/popular`
    },
    {
      name: "Bollywood",
      name_fa: "بالیوود",
      movie_endpoint: `discover/movie?with_original_language=hi&sort_by=popularity.desc`,
      tv_endpoint: `discover/tv?with_original_language=hi&sort_by=popularity.desc`
    }
  ];

  return await Promise.all(
    specials.map(async (section, index) => {
      const movieRes = await fetch(`${LOCAL_API}?endpoint=${section.movie_endpoint}&language=${language}`);
      const tvRes = await fetch(`${LOCAL_API}?endpoint=${section.tv_endpoint}&language=${language}`);
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

/**
 * Map TMDB media items to local format.
 */
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

/**
 * Fetch top rated TV shows.
 */
export async function fetchTopRatedShows(
  page: number,
  language = "fa-IR"
): Promise<{ results: Show[]; page: number; total_pages: number }> {
  const res = await fetch(`${LOCAL_API}?endpoint=tv/top_rated&page=${page}&language=${language}`);
  const data = await res.json();
  const results = (data.results || []).filter((s: any) => s.poster_path);
  return {
    results,
    page: data.page,
    total_pages: data.total_pages,
  };
}

/**
 * Fetch now playing movies.
 */
export async function fetchNowPlayingMovies(
  page: number,
  language = "fa-IR",
  filters?: { genre?: string; year?: string; country?: string },
  search?: string
): Promise<{ results: Movie[]; page: number; total_pages: number }> {
  const params = new URLSearchParams({
    language,
    sort_by: "release_date.desc",
    page: page.toString(),
    ...(filters?.genre ? { with_genres: filters.genre } : {}),
    ...(filters?.country ? { with_original_language: filters.country } : {}),
    ...(filters?.year && filters.year !== "older"
      ? { primary_release_year: filters.year }
      : filters?.year === "older"
      ? { primary_release_date_lte: "2020-12-31" }
      : {}),
    ...(search ? { query: search } : {})
  });

  const res = await fetch(`${LOCAL_API}?endpoint=movie/now_playing&${params.toString()}`);
  const data = await res.json();
  const results = (data.results || []).filter((m: any) => m.poster_path);
  return {
    results,
    page: data.page,
    total_pages: data.total_pages,
  };
}

/**
 * Fetch media details.
 */
export async function fetchMediaDetails(
  type: "movie" | "tv",
  id: string,
  language = "fa-IR"
) {
  return fetch(`${LOCAL_API}?endpoint=${type}/${id}&language=${language}`, { cache: "no-store" });
}

/**
 * Fetch media credits.
 */
export async function fetchMediaCredits(
  type: "movie" | "tv",
  id: string,
  language = "fa-IR"
) {
  return fetch(`${LOCAL_API}?endpoint=${type}/${id}/credits&language=${language}`, { cache: "no-store" });
}

/**
 * Fetch media recommendations.
 */
export async function fetchMediaRecommendations(
  type: "movie" | "tv",
  id: string,
  language = "fa-IR"
) {
  return fetch(`${LOCAL_API}?endpoint=${type}/${id}/recommendations&language=${language}`, { cache: "no-store" });
}

/**
 * Fetch media videos.
 */
export async function fetchMediaVideos(
  type: "movie" | "tv",
  id: string,
  language = "en-US"
) {
  return fetch(`${LOCAL_API}?endpoint=${type}/${id}/videos&language=${language}`, { cache: "no-store" });
}

/**
 * Fetch TV season meta.
 */
export async function fetchTVSeasonMeta(
  id: string,
  language = "fa-IR"
) {
  return fetch(`${LOCAL_API}?endpoint=tv/${id}&language=${language}&append_to_response=season/1`, { cache: "no-store" });
}

/**
 * Fetch TV season episodes.
 */
export async function fetchTVSeasonEpisodes(
  id: string,
  seasonNumber: number,
  language = "fa-IR"
) {
  return fetch(`${LOCAL_API}?endpoint=tv/${id}/season/${seasonNumber}&language=${language}`, { cache: "no-store" });
}

/**
 * Search movies and TV shows.
 */
export async function searchMulti(
  query: string,
  language = "fa-IR"
) {
  const res = await fetch(`${LOCAL_API}?endpoint=search/multi&language=${language}&query=${encodeURIComponent(query)}`, { cache: "no-store" });
  return res.json();
}

