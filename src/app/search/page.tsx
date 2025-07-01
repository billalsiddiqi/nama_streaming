'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Movie = {
  id: number;
  title: string;
  title_fa: string;
  cover_image: string;
  embed_url: string;
};

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    axios
      .get(`http://nama.test/api/movies?search=${query}`)
      .then(res => {
        setMovies(res.data.data);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
      <div className="min-h-screen bg-gray-950 text-white p-0">
        <div className='container mx-auto px-4 py-4'>
            <Header />

        </div>
        <div className="container mx-auto mt-12 h-full">    
            <h1 className="text-3xl font-bold mb-10 text-center">
                نتایج جستجو برای: <span className="text-primary">{query}</span>
            </h1>

            {loading ? (
                <div className="text-center text-lg mt-20">در حال بارگذاری...</div>
            ) : movies.length === 0 ? (
                <div className="text-center text-lg mt-20 text-gray-400">
                هیچ فیلمی یافت نشد.
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                {movies.map(movie => (
                    <div
                    key={movie.id}
                    className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                    >
                    <Link href={`/movies/${movie.id}`}>
                        <Image
                        src={movie.cover_image}
                        alt={movie.title_fa}
                        width={500}
                        height={750}
                        className="object-cover w-full h-full rounded-lg"
                        loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent px-2 py-1">
                        <h2 className="text-sm sm:text-base font-semibold truncate text-white">
                            {movie.title_fa || movie.title}
                        </h2>
                        </div>
                    </Link>
                    </div>
                ))}
                </div>
            )}
            {/* <Footer /> */}
        </div>
    </div>
  );
}
