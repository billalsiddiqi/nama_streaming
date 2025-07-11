"use client";

import { useState } from "react";

interface Episode {
  id: number;
  name: string;
  episode_number: number;
  season_number: number;
}

interface EpisodePickerProps {
  seasons: any[];
  episodesBySeason: Record<number, Episode[]>;
  onSelect: (episode: Episode) => void;
}

export default function EpisodePicker({
  seasons,
  episodesBySeason,
  onSelect,
}: EpisodePickerProps) {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(
    seasons?.[0]?.season_number ?? null
  );
  const [loadingEpisodeId, setLoadingEpisodeId] = useState<number | null>(null);
  const handleEpisodeClick = (ep: Episode) => {
    setLoadingEpisodeId(ep.id);
    onSelect(ep);
  };

  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  return (
    <div className="p-6 text-white text-center">
      <h2 className="text-xl mb-4">یک فصل را انتخاب کنید</h2>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {seasons.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSeasonChange(s.season_number)}
            className={`px-4 py-1 rounded ${
              selectedSeason === s.season_number
                ? "bg-red-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            فصل {s.season_number}
          </button>
        ))}
      </div>

      {selectedSeason && (
        <>
          <h3 className="text-lg mb-2">قسمت‌ها</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {(episodesBySeason[selectedSeason] || []).map((ep) => (
              <button
                  key={ep.id}
                  onClick={() => handleEpisodeClick(ep)}
                  disabled={loadingEpisodeId === ep.id}
                  className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 relative"
                >
                  {loadingEpisodeId === ep.id ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                  ) : (
                    <>
                      قسمت {ep.episode_number}: {ep.name}
                    </>
                  )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
