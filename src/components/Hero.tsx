'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden text-white rtl">
      {/* Background image with subtle parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src="/bg.webp"
          alt="Cinematic streaming background"
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="/tiny-blur-cinematic.jpg"
          priority
        />
      </motion.div>

      {/* Gradient overlay with refined opacity */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/50 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-start px-4 sm:px-8 md:px-16 max-w-screen-2xl mx-auto">
        <motion.div
          className="text-right max-w-lg md:max-w-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            به نما خوش آمدید
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            تجربه‌ای بی‌نظیر از تماشای فیلم‌ها و سریال‌های اختصاصی. همین حالا اشتراک خود را شروع کنید و هر زمان که خواستید لغو کنید.
          </p>

          {/* Buttons with hover animations */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.button
              className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-all font-semibold text-base shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              عضو نما هستید؟ وارد شوید
            </motion.button>
            <motion.button
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition-all font-semibold text-base shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              شروع اشتراک رایگان
            </motion.button>
          </div>

          <p className="text-xs md:text-sm text-gray-400 mt-6">
            اشتراک ماهانه پس از پایان دوره رایگان، به‌طور خودکار تمدید می‌شود.
          </p>
        </motion.div>
      </div>
    </section>
  );
}