'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full md:max-h-[65vh] h-[60lvh] overflow-hidden text-white rtl">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.webp" 
          alt="Hero background"
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="/tiny-blur.jpg"
          priority
        />
      </div>

      {/* Right-to-left gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-start px-4 sm:px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="text-right w-full sm:max-w-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-4">
            به نما خوش آمدید
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6">
            از تماشای فیلم‌ها و سریال‌های اختصاصی لذت ببرید. هم‌اکنون با اشتراک ماهانه
            شروع کنید. لغو در هر زمان امکان‌پذیر است.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition font-semibold">
              عضو نما هستید؟ وارد شوید
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-black transition font-semibold">
              شروع اشتراک رایگان
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            اشتراک ماهانه پس از پایان دوره رایگان، به‌طور خودکار تمدید می‌شود.
          </p>
        </div>
      </div>
    </section>
  );
}
