"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

const navItems = [
  { name: "فیلم‌ها", href: "/movies" },
  { name: "سریال‌ها", href: "/tv" },
];

export default function NavbarBubble() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const bubbleRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (isMobile) setOpen((prev) => !prev);
  };

  // ✅ Close if click happens outside bubble
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        bubbleRef.current &&
        !bubbleRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <motion.div
      ref={bubbleRef}
      className="relative bg-black px-4 py-4 rounded-full text-sm text-white shadow-md overflow-hidden cursor-pointer select-none"
      onClick={toggle}
      onHoverStart={() => !isMobile && setOpen(true)}
      onHoverEnd={() => !isMobile && setOpen(false)}
      animate={{
        width: open ? "auto" : isMobile ? "48px" : "64px",
        paddingLeft: open ? "1.2rem" : "0.75rem",
        paddingRight: open ? "1.2rem" : "0.75rem",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            key="nav-items"
            className="flex gap-3 items-center whitespace-nowrap"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="hover:text-blue-300 transition duration-150"
                onClick={() => isMobile && setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        ) : (
          <motion.span
            key="bar"
            className="block w-6 h-1 rounded-full bg-white mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
