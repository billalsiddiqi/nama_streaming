'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'
import SearchModal from './SearchModal'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className=" text-white container mx-auto w-full px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold">
        <a href="/">
          <Image
              src="/nama.svg"
              alt="NAMA Logo"
              width={55}
              height={55}
              className="object-contain"
              />
        </a>
      </div>

      {/* Search */}
      <div className="relative">
        <button onClick={() => setSearchOpen(true)} className="text-white hover:text-primary cursor-pointer"><Search/></button>
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </header>
  )
}
