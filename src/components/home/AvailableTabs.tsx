"use client";

import { useEffect, useRef, useState } from "react";
import { MediaItem, MediaType } from "@/components/types/media";
import MediaCard from "@/components/home/MediaCard";
import MediaTabs from "@/components/home/MediaTabs";
import SkeletonCard from "@/components/home/SkeletonCard";

export default function AvailableTabs() {
  const [type, setType] = useState<MediaType>("movie");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const cacheRef = useRef<Record<MediaType, { version: string; data: MediaItem[] } | undefined>>({
    movie: undefined,
    tv: undefined,
  });

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!hydrated) return;

    const fetchItems = async () => {
      setLoading(true);

      const localKey = `available-content-${type}`;
      const localData = localStorage.getItem(localKey);

      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          if (parsed.version && Array.isArray(parsed.data)) {
            cacheRef.current[type] = parsed;
            setItems(parsed.data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn("Failed to parse localStorage data", e);
        }
      }

      // Fallback to fetching
      try {
        const res = await fetch(`/api/available-content?type=${type}`);
        const data: MediaItem[] = await res.json();
        const version = data?.[0]?.embedVersion || "v0";

        const versioned = { version, data };
        cacheRef.current[type] = versioned;
        localStorage.setItem(localKey, JSON.stringify(versioned));
        setItems(data);
      } catch (e) {
        console.error("Fetch failed", e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    if (!cacheRef.current[type]) {
      fetchItems();
    } else {
      setItems(cacheRef.current[type]!.data);
    }
  }, [type, hydrated]);

  if (!hydrated) return null;

  return (
    <section className="max-w-8xl mx-auto px-4 py-8">
      <MediaTabs activeType={type} onChange={setType} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: 10 }).map((_, idx) => <SkeletonCard key={idx} />)
          : items.map((item) => <MediaCard key={item.id} item={item} type={type} />)}
      </div>
    </section>
  );
}
