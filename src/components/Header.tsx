'use client'

import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import Image from 'next/image'
import SearchModal from './SearchModal'
import Link from 'next/link'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-black text-white w-full px-8 py-6 flex items-center justify-between fixed right-0 top-0 z-50 shadow-lg rtl">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link href="/">
          <Image
            src="/nama.svg"
            alt="NAMA Logo"
            width={60}
            height={60}
            className="object-contain hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/movies" className="hover:text-red-600 transition-colors">فیلم‌ها</Link>
        <Link href="/series" className="hover:text-red-600 transition-colors">سریال‌ها</Link>
      </nav>

      {/* Mobile Menu Button */}
      <div className="hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 py-4 px-4 space-y-4 z-40">
          <Link href="/series" className="block hover:text-red-600 transition-colors">سریال‌ها</Link>
          <Link href="/movies" className="block hover:text-red-600 transition-colors">فیلم‌ها</Link>
        </div>
      )}

      {/* Search Icon */}
      <div className="relative">
        <button
          onClick={() => setSearchOpen(true)}
          className="bg-gradient-to-r from-primary to-darker text-white p-2 rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all shadow-lg"
          aria-label="Open search modal"
        >
          <Search size={20} />
        </button>
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </header>
  )
}