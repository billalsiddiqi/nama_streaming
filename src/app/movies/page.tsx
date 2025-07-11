'use client';

import { useEffect, useState } from "react";
import MediaGrid from "../../components/MediaGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { fetchNowPlayingMovies, Movie } from "@/lib/tmdb";

export default function MoviesPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    country: ""
  });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (reset = false) => {
    if (reset) setLoading(true);

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";
    const currentPage = reset ? 1 : page;
    const { results, page: apiPage, total_pages } = await fetchNowPlayingMovies(
      currentPage,
      apiKey,
      "fa-IR",
      filters,
      search
    );

    if (reset) {
      setMovies(results);
      setPage(2);
    } else {
      setMovies((prev) => [...prev, ...results]);
      setPage((prev) => prev + 1);
    }

    setHasMore(apiPage < total_pages);
    if (reset) setLoading(false);
  };

  useEffect(() => {
    fetchMovies(true);
  }, [filters, search]);

  return (
    <div className="pb-24 md:pb-0 bg-black">
        <div className="container mb-6 mx-auto px-4 py-4">
            <Header />
        </div>
        <main className=" px-4 md:px-8 py-10 bg-black min-h-screen">
        <h1 className="text-white text-2xl md:text-3xl font-bold my-10">🎬 فیلم‌ها</h1>
        <MediaGrid items={movies} loading={loading} type="movie" />
        {hasMore && (
            <div className="text-center mt-8">
            <button
                onClick={() => fetchMovies()}
                className="px-6 py-2 text-sm rounded-lg bg-white text-black hover:bg-gray-200 transition"
                disabled={loading}
                >
                {loading ? "در حال بارگذاری..." : "نمایش بیشتر"}
            </button>
            </div>
        )}
        </main>
        <Footer />
        <MobileBottomNav />
    </div>
  );
}
