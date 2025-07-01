"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);

    // Start redirect with query
    router.push(`/search?query=${encodeURIComponent(query)}`);
    onClose(); // Close modal
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl w-full max-w-xl mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-3xl font-semibold mb-8">
              جستجو فیلم و سریال
            </h2>
            <input
                type="text"
                placeholder="لطفا نام فیلم یا سریال مورد نظر خود را وارد کنید"
                className="w-full px-6 py-4 rounded-xl text-white bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
                value={query}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                className="w-full px-6 py-3 rounded-xl bg-white/20 text-white font-medium hover:bg-primary/80 transition"
                onClick={handleSearch} 
                disabled={loading}
            >
              {loading ? "در حال جستجو..." : "جستجو"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
