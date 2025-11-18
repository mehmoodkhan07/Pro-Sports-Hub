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
      {/* 🔍 Search Icon */}
      <Button
        variant="ghost"
        size="sm"
        aria-label="Search"
        onClick={() => setSearchOpen(!searchOpen)}
        className="bg-white hover:bg-amber-400 text-amber-600 dark:text-amber-300 transition-all  p-2"
      >
        <Search className="h-5 w-5" />
      </Button>
  
      {/* Popup */}
      {searchOpen && (
        <div
          className="
            absolute right-1 top-8 
            w-[62vw] sm:w-70 
            bg-white dark:bg-gray-900 
            border border-gray-200 dark:border-gray-700 
            shadow-xl shadow-black/10 
            rounded-2xl py-2 px-0 
            animate-in fade-in slide-in-from-top-3 
            z-50 
          "
        >
          {/* Input */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search for sports items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                flex-grow px-1 py-2
                text-sm
                bg-gray-50 dark:bg-gray-800 
                border border-gray-300 dark:border-gray-700 
                rounded-xl
                focus:ring-2 focus:ring-amber-500 
                focus:outline-none 
                text-gray-900 dark:text-gray-100
                placeholder:text-gray-400 dark:placeholder:text-gray-500
              "
            />
  
            <Button
              type="submit"
              className="
                bg-amber-500 hover:bg-amber-600 
                text-white  py-2 px-0
                rounded-xl text-sm
                transition-all shadow-sm
              "
            >
              Go
            </Button>
  
            {/* Close */}
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-gray-500 hover:text-red-600 transition py-1"
            >
              <X className="h-5 w-4" />
            </button>
          </form>
  
          {/* Suggestions list */}
          {suggestions.length > 0 && (
            <ul
              className="
                mt-3 
                bg-gray-50 dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700 
                rounded-xl 
                max-h-56 overflow-y-auto
              "
            >
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="
                    px-4 py-3 
                    flex items-center gap-3 
                    text-gray-800 dark:text-gray-200
                    hover:bg-amber-100 dark:hover:bg-amber-900/30
                    cursor-pointer transition rounded-lg
                  "
                  onClick={() => handleSuggestionClick(item.slug)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover shadow-sm"
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
  
          {/* No results */}
          {searchQuery && suggestions.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-3">
              No matching products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
  
}
