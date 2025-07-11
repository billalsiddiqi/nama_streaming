'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MediaGrid from '@/components/MediaGrid';
import { searchMulti } from "@/lib/tmdb";

interface MediaItem {
  id: number;
  title: string;
  title_fa: string;
  cover_image_url: string;
  embed_url: null;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [tvShows, setTvShows] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    searchMulti(query, "fa-IR")
      .then((data) => {
        const validResults = (data.results || []).filter(
          (item: any) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
        );

        const normalized = validResults.map((item: any) => ({
          id: item.id,
          title: item.title || item.name || 'بدون عنوان',
          title_fa: item.title || item.name || 'بدون عنوان',
          poster_path: item.poster_path,
          cover_image_url: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          embed_url: null,
          media_type: item.media_type,
        }));

        setMovies(normalized.filter((item: any) => item.media_type === 'movie'));
        setTvShows(normalized.filter((item: any) => item.media_type === 'tv'));
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-10 text-center">
        نتایج جستجو برای: <span className="text-primary">{query}</span>
      </h1>

      {loading ? (
        <div className="text-center text-lg mt-20">در حال بارگذاری...</div>
      ) : (
        <div className="space-y-12">
          {movies.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">🎬 فیلم‌ها</h2>
              <MediaGrid items={movies} loading={false} type="movie" />
            </div>
          )}

          {tvShows.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">📺 سریال‌ها</h2>
              <MediaGrid items={tvShows} loading={false} type="tv" />
            </div>
          )}

          {movies.length === 0 && tvShows.length === 0 && (
            <div className="text-center text-lg mt-20 text-gray-400">
              نتیجه‌ای یافت نشد.
            </div>
          )}
        </div>
      )}
    </>
  );
}
