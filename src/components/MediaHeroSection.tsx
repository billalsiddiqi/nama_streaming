import Image from "next/image";

interface MediaHeroSectionProps {
  backdrop: string;
  title: string;
  rating: number;
  releaseDate: string;
  runtime?: number;
}

export default function MediaHeroSection({ backdrop, title, rating, releaseDate, runtime }: MediaHeroSectionProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg px-4 md:px-8">
      <Image
        src={`https://image.tmdb.org/t/p/original${backdrop}`}
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
      </div>
    </div>
  );
}
