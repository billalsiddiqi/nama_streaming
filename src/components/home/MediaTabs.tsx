"use client";

import { MediaType } from "../types/media";
import { cn } from "@/lib/utils";

interface MediaTabsProps {
  activeType: MediaType;
  onChange: (type: MediaType) => void;
}

export default function MediaTabs({ activeType, onChange }: MediaTabsProps) {
  return (
    <div className="flex gap-4 mb-6 justify-center rtl">
      <button
        onClick={() => onChange("movie")}
        className={cn(
          "px-4 py-2 rounded-full border text-sm font-medium transition",
          activeType === "movie"
            ? "bg-white text-black shadow"
            : "bg-transparent border-white text-white"
        )}
      >
        فیلم‌ها
      </button>
      <button
        onClick={() => onChange("tv")}
        className={cn(
          "px-4 py-2 rounded-full border text-sm font-medium transition",
          activeType === "tv"
            ? "bg-white text-black shadow"
            : "bg-transparent border-white text-white"
        )}
      >
        سریال‌ها
      </button>
    </div>
  );
}
