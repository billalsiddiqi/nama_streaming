export type MediaType = "movie" | "tv";

export interface MediaItem {
  embedVersion: string;
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  isAvailable: boolean;
  vote_average: number;
}
