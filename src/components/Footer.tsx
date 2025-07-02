// components/Footer.tsx
import Image from 'next/image'

export default function Footer() {
    return (
      <footer className="hidden md:block bg-black text-gray-400 pt-12 mt-20 pb-6 border-t border-zinc-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start">
            {/* Logo and Description */}
            <div>
               <Image
                          src="/nama.svg"
                          alt="NAMA Logo"
                          width={65}
                          height={65}
                          className="object-contain"
                          />
              <p className="text-sm mt-4 max-w-sm">
                تماشای آنلاین فیلم و سریال با زیرنویس فارسی - همراه با جدیدترین محتواهای جهانی و محلی.
              </p>
            </div>
  
            {/* Navigation Links */}
            <div className="flex gap-16">
              <div>
                <h3 className="text-white font-semibold mb-2">درباره ما</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="hover:text-white">تماس با ما</a></li>
                  <li><a href="#" className="hover:text-white">قوانین استفاده</a></li>
                  <li><a href="#" className="hover:text-white">سوالات متداول</a></li>
                </ul>
              </div>
  
              <div>
                <h3 className="text-white font-semibold mb-2">کاوش</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="hover:text-white">فیلم‌ها</a></li>
                  <li><a href="#" className="hover:text-white">سریال‌ها</a></li>
                  <li><a href="#" className="hover:text-white">ژانرها</a></li>
                </ul>
              </div>
  
              <div>
                <h3 className="text-white font-semibold mb-2">زبان</h3>
                <ul className="space-y-1 text-sm">
                  <li><a href="#" className="hover:text-white">فارسی</a></li>
                  <li><a href="#" className="hover:text-white">English</a></li>
                  <li><a href="#" className="hover:text-white">پښتو</a></li>
                </ul>
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="mt-10 border-t border-zinc-700 pt-4 text-sm text-center text-gray-500">
            © {new Date().getFullYear()} NAMA. تمام حقوق محفوظ است.
          </div>
        </div>
      </footer>
    );
  }
  