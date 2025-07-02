"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function MediaDetailHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-6 bg-black backdrop-blur-md border-b border-white/10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white text-sm font-medium cursor-pointer hover:text-gray-300 transition"
      >
        <ArrowRight size={20} />
        بازگشت
      </button>
    </header>
  );
}
