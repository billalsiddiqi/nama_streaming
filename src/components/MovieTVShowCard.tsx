'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MediaItem } from "../types/MediaTypes";
import Link from "next/link";

interface MovieTVShowCardProps {
  item: MediaItem;
  onClick?: () => void;
  type?: "movie" | "tv";
}

export default function MovieTVShowCard({ item, onClick, type }: MovieTVShowCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();
    if (type) router.push(`/media/${type}/${item.id}`);
  };

  return (
    <>
      <Link href={`/media/${type}/${item.id}`}>      
        <div
          className="min-w-[140px] md:min-w-[180px] lg:min-w-[200px] relative rounded-xl overflow-hidden group hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
          style={{ cursor: item.embed_url || type ? "pointer" : "default" }}
        >
          <Image
            src={item.cover_image_url}
            alt={item.title}
            width={300}
            height={450}
            className="w-full h-[200px] md:h-[280px] object-cover"
            draggable={false}
          />
          {!item.embed_url && (
            <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-0.5 rounded shadow">
              بزودی
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent px-2 py-1">
              <h3 className="text-xs md:text-sm font-semibold text-white line-clamp-2 drop-shadow-sm">
                {item.title_fa}
              </h3>
          </div>
        </div>
      </Link>
    </>
  );
}
