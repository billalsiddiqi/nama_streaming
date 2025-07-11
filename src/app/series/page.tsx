'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileBottomNav from "@/components/MobileBottomNav";
import MediaGrid from "@/components/MediaGrid";
import { useEffect, useState } from "react";
import { fetchTopRatedShows, Show } from "@/lib/tmdb";


export default function TVShowsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    country: ""
  });
  type Show = {
    id: number;
    name: string;
    poster_path: string;
    [key: string]: any;
  };
  const [shows, setShows] = useState<Show[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchShows = async (reset = false) => {
    if (reset) setLoading(true);

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "";
    const currentPage = reset ? 1 : page;
    const { results, page: apiPage, total_pages } = await fetchTopRatedShows(
      currentPage,
      apiKey,
      "fa-IR"
    );

    if (reset) {
      setShows(results);
      setPage(2);
    } else {
      setShows((prev) => [...prev, ...results]);
      setPage((prev) => prev + 1);
    }

    setHasMore(apiPage < total_pages);
    if (reset) setLoading(false);
  };

  useEffect(() => {
    fetchShows(true);
  }, [filters, search]);

  return (
    <div className="pb-24 md:pb-0 bg-black min-h-screen">
      <div className="container mb-8 mx-auto px-4 py-4">
          <Header />
      </div>
      <main className="px-4 md:px-8 py-10">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">📺 سریال‌ها</h1>
        <MediaGrid items={shows} loading={loading} type="tv" />
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => fetchShows()}
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
