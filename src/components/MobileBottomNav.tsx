'use client';

import {
  Home,
  Clapperboard,
  Heart,
  MonitorPlay,
} from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'خانه', icon: <Home size={22} />, href: '/' },
  { name: 'علاقه‌مندی', icon: <Heart size={22} />, href: '/favorites' },
  { name: 'فیلم ها', icon: <Clapperboard size={22} />, href: '/movies' },
  { name: 'سریال ها', icon: <MonitorPlay size={22} />, href: '/series' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 px-0 z-50 md:hidden">
      <div id='footer-nav' className="bg-white dark:bg-primary dark:text-dark-text shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.1)] rounded-t-2xl py-3 px-8 flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center text-xs font-medium dark:text-dark-text ${
                isActive ? 'text-primary dark:text-secondary' : 'text-zinc-700'
              }`}
            >
              {item.icon}
              <span className={`mt-1 ${isActive ? "text-secondary" : "text-dark-text"}`}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
