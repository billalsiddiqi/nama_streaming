'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import GenreRow from './GenreRow';

type Movie = {
  id: number;
  title: string;
  title_fa: string;
  cover_image: string;
  cover_image_url: string;
  embed_url: string | null;
};

type GenreWithMovies = {
  id: number;
  name: string;
  name_fa: string;
  type: string;
  movies: Movie[];
};

const BATCH_SIZE = 5;
const TMDB_API_KEY = '0c14a993de5f7d4603ce7b9d5e9930bf'; // ← Replace with your TMDb key

const TMDB_GENRES = [
  { id: 28, name: 'Action', name_fa: 'اکشن' },
  { id: 18, name: 'Drama', name_fa: 'درام' },
  { id: 35, name: 'Comedy', name_fa: 'کمدی' },
  { id: 14, name: 'Fantasy', name_fa: 'فانتزی' },
  { id: 878, name: 'Sci-Fi', name_fa: 'علمی تخیلی' },
];

export default function GenreList() {
  const [allGenres, setAllGenres] = useState<GenreWithMovies[]>([]);
  const [visibleGenres, setVisibleGenres] = useState<GenreWithMovies[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const embedLinks = await fetch('/data/embedLinks.json').then((res) =>
          res.json()
        );

        const genresWithMovies: GenreWithMovies[] = await Promise.all(
          TMDB_GENRES.map(async (genre) => {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc&primary_release_date.lte=2025-12-31&language=fa-IR`;
            const res = await fetch(url);
            const data = await res.json();

            const movies = (data.results || []).slice(0, 10).map((movie: any) => {
              const match = embedLinks.find((e: any) => e.tmdb_id === movie.id);
              return {
                id: movie.id,
                title: movie.title || 'بدون عنوان',
                title_fa: movie.title || 'بدون عنوان',
                cover_image: movie.poster_path,
                cover_image_url: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/placeholder.jpg',
                embed_url: match?.embed_url ?? null,
              };
            });

            return {
              id: genre.id,
              name: genre.name,
              name_fa: genre.name_fa,
              type: 'movie',
              movies,
            };
          })
        );

        setAllGenres(genresWithMovies);
        setVisibleGenres(genresWithMovies.slice(0, BATCH_SIZE));
        currentIndex.current = BATCH_SIZE;
        setHasMore(genresWithMovies.length > BATCH_SIZE);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
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
      { rootMargin: '100px' }
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
    return <div className="text-white text-center">در حال بارگذاری...</div>;

  return (
    <div className="flex flex-col gap-20 py-10">
      {visibleGenres.map((genre) => (
        <GenreRow key={genre.id} genre={genre} />
      ))}
      {hasMore && (
        <div ref={observerRef} className="h-10">
          <p className="text-center text-white">در حال بارگذاری بیشتر...</p>
        </div>
      )}
    </div>
  );
}
