export type MediaItem = {
  id: number;
  title: string;
  title_fa: string;
  cover_image: string;
  cover_image_url: string;
  embed_url: string | null;
};

export type GenreWithMedia = {
  id: number;
  name: string;
  name_fa: string;
  movies: MediaItem[];
  tv_shows: MediaItem[];
};
