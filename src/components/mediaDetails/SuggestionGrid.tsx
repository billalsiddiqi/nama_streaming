
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
          <div key={item.id} className="relative group">
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-auto rounded-lg transition-transform duration-200 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-white text-sm">{item.title || item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
