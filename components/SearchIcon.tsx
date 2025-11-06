"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 🧩 Product data (with slugs)
  const products = [
    { id: 1, name: "Nike Football", image: "/images/football.png", slug: "nike-football" },
    { id: 2, name: "Adidas Basketball", image: "/images/basketball.jpg", slug: "adidas-basketball" },
    { id: 3, name: "Puma Running Shoes", image: "/images/shoes1.jpg", slug: "puma-running-shoes" },
    { id: 4, name: "Reebok Gym Gloves", image: "/images/gloves.jpg", slug: "reebok-gym-gloves" },
    { id: 5, name: "Yonex Badminton Racket", image: "/images/badminton.jpg", slug: "yonex-badminton-racket" },
    { id: 6, name: "Cricket Bat", image: "/images/cricketbat.jpg", slug: "cricket-bat" },
    { id: 7, name: "Tennis Ball Pack", image: "/images/tennis.jpg", slug: "tennis-ball-pack" },
    { id: 8, name: "Boxing Gloves", image: "/images/boxing.jpg", slug: "boxing-gloves" },
    { id: 9, name: "Yoga Mat", image: "/images/yogamat.jpg", slug: "yoga-mat" },
    { id: 10, name: "Skateboard", image: "/images/skateboard.jpg", slug: "skateboard" },
  ];

  // ✅ Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Filter suggestions when typing
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSuggestions(filtered);
  }, [searchQuery]);

  // ✅ Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const matched = products.find((p) =>
      p.name.toLowerCase() === searchQuery.toLowerCase()
    );
    if (matched) {
      router.push(`/shop/${matched.slug}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // ✅ Handle suggestion click
  const handleSuggestionClick = (slug: string) => {
    router.push(`/shop/${slug}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative" ref={popupRef}>
      {/* 🔍 Search Icon Button */}
      <Button
        variant="ghost"
        size="sm"
        aria-label="Search"
        onClick={() => setSearchOpen(!searchOpen)}
        className="hover:bg-white/20 text-amber-800 dark:text-amber-300 transition-all"
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* 🔎 Search Popup */}
      {searchOpen && (
        <div className="absolute right-1 top-9 bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-3 flex flex-col gap-2 w-80 border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 z-50">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-transparent text-gray-800 dark:text-gray-100"
            />
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-3 py-2 rounded-lg transition-all"
            >
              Go
            </Button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-gray-500 hover:text-red-600 transition"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </form>

          {/* 💡 Suggestions */}
          {suggestions.length > 0 && (
            <ul className="mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg max-h-48 overflow-y-auto text-sm">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="px-3 py-2 hover:bg-amber-50 dark:hover:bg-gray-800 cursor-pointer text-gray-800 dark:text-gray-200 flex items-center gap-2"
                  onClick={() => handleSuggestionClick(item.slug)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          )}

          {/* ❌ No results */}
          {searchQuery && suggestions.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
