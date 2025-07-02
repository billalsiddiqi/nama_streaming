"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import GenreRow from "./GenreRow";
import type { GenreWithMedia, MediaItem } from "../types/MediaTypes";

const BATCH_SIZE = 5;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const TMDB_GENRES = [
  {
    name: "Action",
    name_fa: "اکشن",
    movie_id: 28,
    tv_id: 10759
  },
  {
    name: "Drama",
    name_fa: "درام",
    movie_id: 18,
    tv_id: 18
  },
  {
    name: "Comedy",
    name_fa: "کمدی",
    movie_id: 35,
    tv_id: 35
  },
  {
    name: "Fantasy",
    name_fa: "فانتزی",
    movie_id: 14,
    tv_id: 10765
  },
  {
    name: "Sci-Fi",
    name_fa: "علمی تخیلی",
    movie_id: 878,
    tv_id: 10765
  }
];

export default function GenreList() {
  const [allGenres, setAllGenres] = useState<GenreWithMedia[]>([]);
  const [visibleGenres, setVisibleGenres] = useState<GenreWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const currentIndex = useRef(0);

  const fetchSpecialRows = async (embedLinks: any[]): Promise<GenreWithMedia[]> => {
    const specials = [
      {
        name: "Popular",
        name_fa: "محبوب‌ترین‌ها",
        movie_url: `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=fa-IR`,
        tv_url: `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=fa-IR`
      },
      {
        name: "Bollywood",
        name_fa: "بالیوود",
        movie_url: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=hi&sort_by=popularity.desc&language=fa-IR`,
        tv_url: `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&with_original_language=hi&sort_by=popularity.desc&language=fa-IR`
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

        const mapItems = (items: any[], type: "movie" | "tv"): MediaItem[] =>
          items.slice(0, 10).map((item) => {
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

        return {
          id: -index - 1,
          name: section.name,
          name_fa: section.name_fa,
          movies: mapItems(movieData.results || [], "movie"),
          tv_shows: mapItems(tvData.results || [], "tv")
        };
      })
    );
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const embedLinks = await fetch("/data/embedLinks.json").then((res) => res.json());

        const specialGenres = await fetchSpecialRows(embedLinks);

        const genreSections: GenreWithMedia[] = await Promise.all(
          TMDB_GENRES.map(async (genre, index) => {
            const [movieRes, tvRes] = await Promise.all([
              fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre.movie_id}&sort_by=popularity.desc&primary_release_date.lte=2025-12-31&language=fa-IR`
              ),
              fetch(
                `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&with_genres=${genre.tv_id}&sort_by=popularity.desc&first_air_date.lte=2025-12-31&language=fa-IR`
              )
            ]);

            const movieData = await movieRes.json();
            const tvData = await tvRes.json();

            const mapItems = (items: any[], type: "movie" | "tv"): MediaItem[] =>
              items.slice(0, 10).map((item) => {
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

            return {
              id: index,
              name: genre.name,
              name_fa: genre.name_fa,
              movies: mapItems(movieData.results || [], "movie"),
              tv_shows: mapItems(tvData.results || [], "tv")
            };
          })
        );

        const all = [...specialGenres, ...genreSections];

        setAllGenres(all);
        setVisibleGenres(all.slice(0, BATCH_SIZE));
        currentIndex.current = BATCH_SIZE;
        setHasMore(all.length > BATCH_SIZE);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    const nextIndex = currentIndex.current + BATCH_SIZE;
    const nextGenres = allGenres.slice(currentIndex.current, nextIndex);
    setVisibleGenres((prev) => [...prev, ...nextGenres]);
    currentIndex.current = nextIndex;
    setHasMore(nextIndex < allGenres.length);
  }, [allGenres, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "100px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore]);

  if (loading)
    return <div className="text-white text-center py-8">در حال بارگذاری...</div>;

  return (
    <div className="flex flex-col gap-20 py-10">
      {visibleGenres.map((genre, index) => (
        <GenreRow key={genre.id} genre={genre} isFeatured={index < 2} />
      ))}
      {hasMore && (
        <div ref={observerRef} className="h-10">
          <p className="text-center text-white">در حال بارگذاری بیشتر...</p>
        </div>
      )}
    </div>
  );
}
