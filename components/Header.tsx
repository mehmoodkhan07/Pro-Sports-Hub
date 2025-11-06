"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartContext"
import UserMenu from "./UserMenu"
import SearchBar from "./SearchIcon"

interface NavItem {
  name: string
  href: string
  submenu?: { name: string; href: string }[]
}

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Shop",
    href: "/shop",
    submenu: [
      { name: "Shoes", href: "/shop?category=footwear" },
      { name: "Clothings", href: "/shop?category=apparel" },
      { name: "Accessories", href: "/shop?category=accessories" },
      { name: "Equipment", href: "/shop?category=equipment" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
  { name: "Checkout", href: "/checkout" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cart } = useCart()

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const [isScrolled, setIsScrolled] = useState(false)

  // 🔹 Scroll shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() !== "") {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header
      className={`relative top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
        isScrolled
          ? "bg-amber-500/95 shadow-lg py-2"
          : "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 🔸 Logo + Text */}
        <Link
          href="/"
          className="flex items-center gap-1 px-5 text-2xl font-extrabold text-white tracking-wide hover:scale-105 transition-transform duration-300"
        >
          <img
            src="/logo.png"
            alt="Pro Sport Hub Logo"
            className="w-10 h-10 object-contain"
          />
          <span>PRO-SPORT HUB</span>
        </Link>

        {/* 🔸 Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            aria-label="Open menu"
            className="p-2 rounded-md text-white hover:bg-white/20 transition"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* 🔸 Desktop Navigation */}
        <div className="hidden pl-3 lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className="text-sm font-semibold text-white hover:text-gray-200 transition"
              >
                {item.name}
              </Link>
              {item.submenu && (
                <div className="absolute left-0 mt-3 w-48 bg-white rounded-md shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transiti duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <div className="py-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 hover:text-amber-700 transition"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 🔸 Desktop Icons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 relative">
          {/* Search button */}
    <SearchBar/>
          {/* User icon */}

              <UserMenu/>


          {/* Cart icon */}
          <Link href="/checkout" className="relative">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Shopping cart"
              className="hover:bg-white/20 text-amber-800"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </nav>

      {/* 🔸 Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed  inset-0 z-50 bg-black/40 backdrop-blur-sm">
          <div className="fixed  right-0 w-4/5 max-w-sm bg-white px-6 py-6 shadow-2xl overflow-y-scroll transition-transform duration-300">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-xl font-bold text-amber-800">Pro-Sport HUB</span>
              </Link>
              <button
                aria-label="Close menu"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Links */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-amber-50 transition"
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-3 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 transition"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
