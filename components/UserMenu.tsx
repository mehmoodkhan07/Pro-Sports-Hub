"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Heart, User } from "lucide-react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* User Icon Button */}
      <Button
        variant="ghost"
        size="sm"
        aria-label="User menu"
        className="bg-white hover:bg-amber-400 text-amber-600 dark:text-amber-300 transition-all duration-200 "
        onClick={() => setOpen(!open)}
      >
        <User className="h-5 w-5" />
      </Button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-50 bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-200 origin-top-right animate-in slide-in-from-top-2 fade-in">
          <Link href="/pages/saved-sports">
            <button className="flex items-center gap-3 px-4 py-2.5 w-full text-left hover:bg-amber-100 dark:hover:bg-gray-800 text-amber-800 dark:text-amber-300 transition-all duration-150">
              <Heart className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Saved Sports</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
