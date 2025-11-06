"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Filter, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { useFavourites } from "@/components/FavouritesPanel";

type Category = {
  name: string;
  image: string;
  href: string;
  items: string[];
  price: number;
};

const categories: Category[] = [
  {
    name: "Footwear",
    image: "/running-shoes-on-track.jpg",
    href: "/shop?category=footwear",
    items: ["Running", "Soccer", "Basketball", "Training"],
    price: 12000,
  },
  {
    name: "Apparel",
    image: "/sports-apparel-flatlay.jpg",
    href: "/shop?category=apparel",
    items: ["Jerseys", "Tops", "Shorts", "Compression"],
    price: 8500,
  },
  {
    name: "Equipment",
    image: "/sports-equipment-assortment.jpg",
    href: "/shop?category=equipment",
    items: ["Balls", "Rackets", "Protective Gear", "Training"],
    price: 9500,
  },
  {
    name: "Accessories",
    image: "/gym-bag-with-accessories.jpg",
    href: "/shop?category=accessories",
    items: ["Bags", "Caps", "Gloves", "Socks"],
    price: 6000,
  },
];

export default function ProductCategories() {
  const { addToCart, sendToWhatsApp } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [favourites, setFavourites] = useState<string[]>([]);

  // ✅ Search & Filter
  const filteredCategories = categories
    .filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <section className="py-16 bg-amber-100">
      <div className="container mx-auto px-4">
        {/* 🔍 Search and Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <h2 className="text-4xl font-bold text-amber-900 font-rye">
            Shop by Category
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search category..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-amber-700" size={18} />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-600"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* 🛒 Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCategories.map(category => (
            <motion.div
              key={category.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative"
            >
              {/* ❤️ Wishlist */}
              <button
  onClick={() =>
    toggleFavourite({
      id: category.name,
      name: category.name,
      image: category.image,
      price: category.price,
    })
  }
  className="absolute top-4 right-4 bg-white/70 p-2 rounded-full hover:bg-white shadow-md z-10"
>
  <Heart
    size={20}
    className={`${
      isFavourite(category.name)
        ? "text-red-600 fill-red-600"
        : "text-gray-400"
    } transition-colors`}
  />
</button>

              {/* 🖼️ Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* 🧾 Content */}
              <div className="p-6 flex flex-col justify-between ">
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-1 group-hover:text-amber-700 transition-colors">
                    {category.name}
                  </h3>
                  <ul className="text-sm text-gray-500 space-y-1 mb-4">
                    {category.items.map(item => (
                      <li key={item} className="flex items-center">
                        <span className="w-1 h-1 bg-amber-600 rounded-full mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 🛒 Buttons */}
                <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="font-semibold text-amber-800">
                    Rs {category.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <div className="pr-4">
                    <button
                      onClick={() =>
                        addToCart({
                          id: Math.random(),
                          name: category.name,
                          price: category.price,
                          image: category.image,
                        })
                      }
                      className="flex items-center gap-2 bg-amber-700 text-white px-3 py-1.5 rounded-lg hover:bg-amber-800 transition"
                    >
                      <ShoppingCart size={18} /> Add
                    </button>
                  </div>    
                  <div>
                    <Link
                      href={category.href}
                      className="text-amber-700 font-semibold hover:underline"
                      >
                      View
                    </Link>
                   </div>
                  </div>
              </div>                  
              </div>
                  </div>
                    </motion.div>
                  ))}
                </div>

        {/* 💬 WhatsApp Button */}
        <div className="text-center mt-12">
          <button
            onClick={sendToWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
          >
            Send Selected Items to WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
