// types.ts
export type MediaType = 'movie' | 'tv';

export interface MediaItem {
  id: number;
  title: string;
  image: string;
  genres: string[];
}

export interface GenreCarouselProps {
  genre: string;
  mediaType: MediaType;
  items: MediaItem[];
}

export interface GenreSectionProps {
  genre: string;
  initialMediaType?: MediaType;
}