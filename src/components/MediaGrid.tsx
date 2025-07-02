import MovieTVShowCard from "./MovieTVShowCard";

interface MovieGridProps {
  items: any[];
  loading: boolean;
  type: "movie" | "tv";
}

export default function MovieGrid({ items, loading, type }: MovieGridProps) {
  const filteredItems = items.filter((item) => item.poster_path);

  const normalizedItems = filteredItems.map((item) => ({
    id: item.id,
    title: item.title || item.name || "بدون عنوان",
    title_fa: item.title || item.name || "بدون عنوان",
    cover_image: item.poster_path, // Add this line to satisfy MediaItem
    cover_image_url: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    embed_url: null, // or optional logic to inject embed if you want
  }));

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (normalizedItems.length === 0) {
    return <div className="text-white text-center py-10">موردی یافت نشد.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {normalizedItems.map((item) => (
        <MovieTVShowCard key={item.id} item={item} type={type}/>
      ))}
    </div>
  );
}
