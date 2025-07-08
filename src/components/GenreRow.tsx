"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GenreWithMedia, MediaItem } from "../types/MediaTypes";
import MovieTVShowCard from "./MovieTVShowCard";

interface Props {
  genre: GenreWithMedia;
  isFeatured?: boolean;
}

export default function GenreRow({ genre, isFeatured = false }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"movie" | "tv">("movie");
  const [showArrows, setShowArrows] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const items: MediaItem[] = activeTab === "movie" ? genre.movies : genre.tv_shows;

  const startDrag = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const stopDrag = () => {
    setIsDragging(false);
    setStartX(null);
  };

  const handleDrag = (e: React.PointerEvent) => {
    if (!isDragging || startX === null || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    setShowArrows(items.length >= 4);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [items]);
  
  useEffect(() => {
    console.log("Genre in row:", genre);
  }, []);

  return (
    <section className={`px-4 md:px-8 ${isFeatured ? "pt-10 pb-4" : ""}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3 sm:gap-0">
        <h2 className="text-xl md:text-2xl font-bold text-white text-center sm:text-right">
          {isFeatured && "⭐ "}{genre.name_fa}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("movie")}
            className={`text-sm px-5 py-2 rounded-[20px] transition font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-white/40 ${
              activeTab === "movie" ? "bg-white text-black" : "bg-gray-700 text-white"
            }`}
          >
            فیلم‌ها
          </button>
          <button
            onClick={() => setActiveTab("tv")}
            className={`text-sm px-5 py-2 rounded-[20px] transition font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-white/40 ${
              activeTab === "tv" ? "bg-white text-black" : "bg-gray-700 text-white"
            }`}
          >
            سریال‌ها
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto py-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="min-w-[140px] md:min-w-[180px] lg:min-w-[200px] h-[200px] md:h-[280px] bg-gray-800 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-white text-center py-6 text-sm opacity-80">
          محتوایی برای نمایش وجود ندارد.
        </div>
      ) : (
        <div className="relative group">
          {showArrows && (
            <>
              <button
                onClick={() => scroll("left")}
                className="hidden sm:flex group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="hidden sm:flex group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent py-2 pr-2"
            style={{
              WebkitOverflowScrolling: "touch",
              userSelect: isDragging ? "none" : "auto",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onPointerDown={startDrag}
            onPointerUp={stopDrag}
            onPointerLeave={stopDrag}
            onPointerMove={handleDrag}
          >
            {items.map((item) => (
              <MovieTVShowCard
                key={item.id}
                item={item}
                type={activeTab}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
