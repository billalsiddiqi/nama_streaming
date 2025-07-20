import NavbarBubble from "./NavbarBubble";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-transparent fixed top-0 z-50 shadow-md backdrop-blur-lg">
      <div className="max-w-8xl mx-auto flex items-center justify-between text-white gap-4">
        
        {/* Right: Logo */}
        <div className="hidden md:block text-xl font-bold text-white">
          <Image
            src="/aseman+.svg"
            alt="Nama Logo"
            width={120}
            height={120}
            className="inline-block mr-2"
          />
        </div>

        {/* Center: Dynamic Island Navbar */}
        <div className="flex-1 flex justify-center">
          <NavbarBubble />
        </div>

        {/* Left: Login/Register */}
        <div className="hidden md:flex items-center gap-2">
          <button className="text-sm border border-white/20 rounded-full px-6 py-2 hover:bg-white/10 transition">
            ورود
          </button>
          <button className="text-sm bg-primary hover:bg-secondary hover:text-light-text text-dark-text rounded-full px-6 py-2 transition">
            ثبت‌ نام
          </button>
        </div>
      </div>
    </header>
  );
}
