"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import GenreRow from "./GenreRow";
import { fetchMediaByGenre, mapMedia } from "../lib/tmdb";
import type { GenreWithMedia } from "../types/MediaTypes";

const BATCH_SIZE = 5;

const TOP_GENRES = [
  { name_fa: "اکشن", movie_id: 28, tv_id: 10759 },
  { name_fa: "کمدی", movie_id: 35, tv_id: 35 },
  { name_fa: "ترسناک", movie_id: 27, tv_id: 27 },
  { name_fa: "فانتزی", movie_id: 14, tv_id: 10765 },
  { name_fa: "علمی تخیلی", movie_id: 878, tv_id: 10765 },
  { name_fa: "هیجانی", movie_id: 53, tv_id: 80 },
  { name_fa: "انیمیشن", movie_id: 16, tv_id: 16 },
  { name_fa: "رمزآلود", movie_id: 9648, tv_id: 9648 }
];

export default function GenreList() {
  const [allGenres, setAllGenres] = useState<GenreWithMedia[]>([]);
  const [visibleGenres, setVisibleGenres] = useState<GenreWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const currentIndex = useRef(0);

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

  useEffect(() => {
    const fetchGenresManually = async () => {
      try {
        const embedLinks = await fetch("/data/embedLinks.json").then((res) => res.json());

        const genreSections: GenreWithMedia[] = await Promise.all(
          TOP_GENRES.map(async (genre) => {
            const [movieData, tvData] = await Promise.all([
              fetchMediaByGenre(genre.movie_id, "movie"),
              genre.tv_id ? fetchMediaByGenre(genre.tv_id, "tv") : Promise.resolve([])
            ]);

            return {
              id: genre.movie_id,
              name: genre.name_fa,
              name_fa: genre.name_fa,
              movies: mapMedia(movieData, embedLinks, "movie"),
              tv_shows: genre.tv_id ? mapMedia(tvData, embedLinks, "tv") : []
            };
          })
        );


        setAllGenres(genreSections);
        setVisibleGenres(genreSections.slice(0, BATCH_SIZE));
        currentIndex.current = BATCH_SIZE;
        setHasMore(genreSections.length > BATCH_SIZE);
      } catch (err) {
        console.error("خطا در دریافت ژانرها:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenresManually();
  }, []);

  if (loading)
    return <div className="text-white text-center py-8">در حال بارگذاری...</div>;

  return (
    <div className="flex flex-col gap-20 py-10" dir="rtl">
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
