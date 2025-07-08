import Image from 'next/image';

export default function Hero() {
  const dummyMovie = {
    title: 'جوکر',
    overview:
      'آرتور فلک، دلقکی که در فقر زندگی می‌کند، همراه با مادر بیمارش روزگار می‌گذراند. جامعه او را طرد می‌کند و لقب دیوانه به او می‌دهد. او تصمیم می‌گیرد به مسیر جرم و جنون روی بیاورد.',
    release_date: '2019-10-02',
    backdrop_path: '/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg',
    vote_average: 8.4,
    genres: ['جنایی', 'درام', 'هیجانی'],
    rotten_tomatoes: 68,
  };

  const releaseYear = new Date(dummyMovie.release_date).getFullYear();

  return (
    <section className="relative w-full h-[100svh] text-white overflow-hidden" dir="rtl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${dummyMovie.backdrop_path}`}
          alt={dummyMovie.title}
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-transparent" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto px-8 py-20 flex flex-col justify-center h-full text-right">
        {/* Genres */}
        <div className="mb-4 flex gap-2 flex-wrap justify-start">
          {dummyMovie.genres.map((genre) => (
            <span
              key={genre}
              className="bg-primary text-dark-text text-xs px-2 py-1 rounded-md tracking-wider"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Title and Meta */}
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          {dummyMovie.title}
        </h1>
        <p className="text-lg mt-1">{releaseYear}</p>

        {/* Description */}
        <p className="max-w-2xl text-gray-200 mt-4 text-sm md:text-base leading-loose line-clamp-4">
          {dummyMovie.overview}
        </p>

        {/* Ratings and Date */}
        <div className="flex items-center gap-6 mt-6 text-sm flex-wrap justify-start">
          <div className="flex items-center gap-2">
            <Image src="/imdb.png" alt="IMDb" width={40} height={26} />
            <span>{dummyMovie.vote_average.toFixed(1)}/10</span>
          </div>
          <div>📅 {new Date(dummyMovie.release_date).toLocaleDateString('fa-IR')}</div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-start">
          <button className="bg-primary hover:bg-secondary text-dark-text cursor-pointer px-6 py-2 rounded-md font-semibold">
             ▶ پخش
          </button>
          <button className="bg-light-background text-black cursor-pointer px-6 py-2 rounded-md font-semibold hover:bg-gray-200">
            🎬 تماشای تریلر
          </button>
        </div>
      </div>
    </section>
  );
}
