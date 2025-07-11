import MovieTVShowCard from "../MovieTVShowCard";

interface SuggestionGridProps {
  items: any[];
  type: "movie" | "tv";
}

export default function SuggestionGrid({ items, type }: SuggestionGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-10 pb-32 px-4 md:px-8">
      <h2 className="text-xl font-semibold text-white mb-4">پیشنهادها</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.filter(item => item.poster_path).map((item) => (
          <MovieTVShowCard
            key={item.id}
            item={{
              id: item.id,
              title: item.title || item.name,
              title_fa: item.title || item.name,
              cover_image: item.poster_path, // or provide a fallback if needed
              cover_image_url: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              embed_url: null
            }}
            type={type}
          />
        ))}
      </div>
    </section>
  );
}
