'use client';

import { useEffect, useState } from "react";
import FilterBar from "../../components/FilterBar";
import MediaGrid from "../../components/MediaGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function MoviesPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    country: ""
  });
  type Movie = {
    id: number;
    title: string;
    // Add other relevant fields you use from data.results here
    [key: string]: any;
  };
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (reset = false) => {
    if (reset) setLoading(true);

    const baseUrl = "https://api.themoviedb.org/3/movie/now_playing";
    const params = new URLSearchParams({
      api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "",
      language: "fa-IR",
      sort_by: "release_date.desc",
      page: reset ? "1" : page.toString(),
      with_genres: filters.genre,
      with_original_language: filters.country,
      ...(filters.year && filters.year !== "older"
        ? { primary_release_year: filters.year }
        : filters.year === "older"
        ? { primary_release_date_lte: "2020-12-31" }
        : {}),
      ...(search ? { query: search } : {})
    });

    const url = `${baseUrl}?${params.toString()}`;
    const res = await fetch(url);
    const data = await res.json();

    const newMovies = (data.results || []).filter((m: any) => m.poster_path);

    if (reset) {
      setMovies(newMovies);
      setPage(2);
    } else {
      setMovies((prev) => [...prev, ...newMovies]);
      setPage((prev) => prev + 1);
    }

    setHasMore(data.page < data.total_pages);
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
        <FilterBar
            search={search}
            onSearch={setSearch}
            filters={filters}
            onFilterChange={setFilters}
            type="movie"
            />
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
