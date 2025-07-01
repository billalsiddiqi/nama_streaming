'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VideoModal from './VideoModal'; // Make sure the path is correct

type Movie = {
  id: number;
  title: string;
  title_fa: string;
  cover_image: string;
  cover_image_url: string;
  embed_url: string | null;
};

type Genre = {
  id: number;
  name: string;
  name_fa: string;
  type: string;
  movies: Movie[];
};

type Props = {
  genre: Genre;
};

export default function GenreRow({ genre }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

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

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="px-4 md:px-8">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{genre.name_fa}</h2>
      <div className="relative group">
        {/* Arrows */}
        <button
          onClick={() => scroll('left')}
          className="hidden group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="hidden group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>

        {/* Scrollable movie row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent py-2 pr-2"
          style={{
            WebkitOverflowScrolling: 'touch',
            userSelect: isDragging ? 'none' : 'auto',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onPointerDown={startDrag}
          onPointerUp={stopDrag}
          onPointerLeave={stopDrag}
          onPointerMove={handleDrag}
        >
          {genre.movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[140px] md:min-w-[180px] lg:min-w-[200px] relative rounded-lg overflow-hidden group hover:shadow-xl  transition-transform transform hover:scale-105 duration-300"
              onClick={() => {
                if (movie.embed_url) {
                  setSelectedUrl(movie.embed_url);
                }
              }}
            >
              <img
                src={movie.cover_image_url}
                alt={movie.title}
                className="w-full h-[200px] md:h-[280px] object-cover transition-transform duration-300 "
                draggable={false}
                loading="lazy"
              />
              {!movie.embed_url && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-0.5 rounded shadow">
                 بزودی
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent px-2 py-1">
                <h3 className="text-sm md:text-base font-semibold text-white line-clamp-2">
                  {movie.title_fa}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for video playback */}
      {selectedUrl && (
        <VideoModal
          embedUrl={selectedUrl}
          onClose={() => setSelectedUrl(null)}
        />
      )}
    </div>
  );
}
