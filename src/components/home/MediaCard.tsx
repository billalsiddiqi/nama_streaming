"use client";

import Image from "next/image";
import Link from "next/link";
import { MediaItem, MediaType } from "@/components/types/media";

interface MediaCardProps {
  item: MediaItem;
  type: MediaType;
}

export default function MediaCard({ item, type }: MediaCardProps) {
  return (
    <Link
      href={{
        pathname: `/media/${type}/${item.id}`,
        query: { available: item.isAvailable },
      }}
      className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#23243a] via-[#23243a]/80 to-[#23243a]/60 shadow-lg border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
        {/* Poster */}
        <Image
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
              : "/no-poster.jpg"
          }
          alt={item.title || item.name || "Poster"}
          width={342}
          height={500}
          className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
          draggable={false}
        />

        {/* Info bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-black/60 backdrop-blur-md flex flex-col gap-1 rounded-b-2xl">
          <h3 className="text-base font-bold text-white leading-tight truncate drop-shadow">
            {item.title || item.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-white/80">
            <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full">
              ⭐ {item.vote_average?.toFixed(1)}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-semibold ${
                type === "tv"
                  ? "bg-[#4D8AF0]/80 text-white"
                  : "bg-[#FFCB05]/80 text-black"
              }`}
            >
              {type === "tv" ? "سریال" : "فیلم"}
            </span>
          </div>
        </div>

        {/* Play Button */}
        {item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-gradient-to-r from-[#FFCB05] to-[#FFD700] text-[#23243a] px-6 py-2 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 4l10 6-10 6V4z" />
              </svg>
              پخش
            </span>
          </div>
        )}

        {/* Coming Soon */}
        {!item.isAvailable && (
          <div className="absolute top-0 left-0 w-full flex justify-center z-10">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-b-xl shadow-lg animate-pulse">
              بزودی
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
