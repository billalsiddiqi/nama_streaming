'use client';

import { useState } from "react";
import Image from "next/image";
import EpisodePicker from "./EpisodePicker";

interface Episode {
  id: number;
  name: string;
  episode_number: number;
  season_number: number;
}

interface MediaHeroSectionProps {
  type: "movie" | "tv";
  backdrop: string;
  poster?: string;
  title: string;
  rating: number;
  releaseDate: string;
  runtime?: number;
  seasons?: any[];         // for TV
  episodesBySeason?: Record<number, Episode[]>; // grouped by season
}

export default function MediaHeroSection({
  type,
  backdrop,
  title,
  rating,
  releaseDate,
  runtime,
  poster,
  seasons = [],
  episodesBySeason = {},
}: MediaHeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  const youtubeUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // placeholder

  if (isPlaying) {
    if (type === "tv" && !selectedEpisode) {
      return (
        <EpisodePicker
          seasons={seasons}
          episodesBySeason={episodesBySeason}
          onSelect={(ep) => setSelectedEpisode(ep)}
        />
      );
    }

    return (
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={youtubeUrl}
          className="w-full h-full"
          allowFullScreen
        />
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={() => {
              if (type === "tv") {
                setSelectedEpisode(null);
              } else {
                setIsPlaying(false);
              }
            }}
            className="bg-black/70 text-white px-3 py-1 rounded"
          >
            ❌ بازگشت
          </button>
        </div>
      </div>
    );
  }

  // Default View: Hero Info
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg px-4 md:px-8">
      <Image
        src={`https://image.tmdb.org/t/p/original${backdrop || poster}`}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 md:p-8 flex flex-col justify-end items-center gap-5">
        <h1 className="text-4xl md:text-5xl lg:text-8xl font-bold text-white mb-2 drop-shadow">
          {title}
        </h1>
        <div className="text-white text-sm flex gap-4 items-center">
          <span>⭐ {rating.toFixed(1)}</span>
          <span>📅 {releaseDate}</span>
          {runtime && <span>⏱️ {runtime} دقیقه</span>}
        </div>
        <button
          onClick={() => setIsPlaying(true)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded shadow"
        >
          ▶ پخش
        </button>
      </div>
    </div>
  );
}
