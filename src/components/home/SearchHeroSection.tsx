"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/movies?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section
      className="w-full min-h-[100dvh] bg-[#1C2233] relative text-[#D1D6E0] flex items-center overflow-hidden"
      dir="rtl"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-1/2 w-[800px] h-[800px] bg-[#4D8AF0] opacity-[0.06] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D1D6E0] opacity-[0.03] rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-8 z-10">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold max-w-xl leading-normal text-[#FFCB05] drop-shadow-md">
          تماشای بی‌وقفه <span className="text-secondary">فیلم</span> و <span className="text-secondary">سریال‌</span> های روز
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#D1D6E0]/80">
          سینما را به خانه بیاور — فیلم‌های جدید، دوبله‌شده، و بدون توقف!
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl flex bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 focus-within:ring-2 focus-within:ring-[#4D8AF0]"
        >
          <input
            type="text"
            placeholder="جستجوی فیلم یا سریال..."
            className="flex-grow px-4 py-3 bg-transparent text-white placeholder-white/60 focus:outline-none text-right"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#FFCB05] text-[#1C2233] px-4 flex items-center gap-2 font-semibold hover:bg-yellow-400 transition"
          >
            <Search className="w-4 h-4" />
            جستجو
          </button>
        </form>
      </div>

    <svg
      className="hidden md:block absolute bottom-0 left-0 w-full h-32 z-20"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <defs>
        
        <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFCB05" />     
          <stop offset="50%" stop-color="#4D8AF0" />    
          <stop offset="100%" stop-color="#FFCB05" />   
        </linearGradient>

        
        <radialGradient id="strokeWeightGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-opacity="1" />
          <stop offset="70%" stop-opacity="0.6" />
          <stop offset="100%" stop-opacity="0" />
        </radialGradient>
      </defs>

      
      <path
        d="M0,160 C480,0 960,320 1440,160"
        fill="transparent"
        stroke="url(#moonGradient)"
        stroke-width="10"
        stroke-linecap="round"
        style={{ filter: "blur(4px)", opacity: 0.3 }}
      />

      
      <path
        d="M0,160 C480,0 960,320 1440,160"
        fill="transparent"
        stroke="url(#moonGradient)"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>

    </section>
  );
}
