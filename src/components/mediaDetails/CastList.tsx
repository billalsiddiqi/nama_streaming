import Image from "next/image";

interface CastListProps {
  cast: { id: number; name: string; profile_path: string | null }[];
}

export default function CastList({ cast }: CastListProps) {
  if (!cast || cast.length === 0) return null;

  return (
    <section className="mt-10 px-4 md:px-8">
      <h2 className="text-xl font-semibold text-white mb-4">بازیگران</h2>
      <div className="flex flex-wrap gap-4 pb-2">
        {cast.map((member) => (
          <div key={member.id} className="flex-shrink-0 w-24 text-center">
            {member.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                alt={member.name}
                width={96}
                height={96}
                className="rounded-full object-cover w-24 h-24 mx-auto"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-xs text-white">
                بدون تصویر
              </div>
            )}
            <p className="text-xs text-gray-300 mt-1 line-clamp-2">{member.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
