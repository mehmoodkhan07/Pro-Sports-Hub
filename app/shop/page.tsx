"use client";

import React, { useState } from "react";
import ProductFilters from "@/components/ProductFilters";
import { ShoppingCart, Trash2, Plus, Minus, Heart } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useFavourites } from "@/components/FavouritesPanel";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  slug: string;
};

const productsData: Product[] = [
  { id: 1, name: "Nike Football", price: 50, category: "Football", image: "/images/football.png", slug: "nike-football" },
  { id: 2, name: "Adidas Basketball", price: 70, category: "Basketball", image: "/images/basketball.jpg", slug: "adidas-basketball" },
  { id: 3, name: "Puma Running Shoes", price: 120, category: "Shoes", image: "/images/shoes1.jpg", slug: "puma-running-shoes" },
  { id: 4, name: "Reebok Gym Gloves", price: 25, category: "Accessories", image: "/images/gloves.jpg", slug: "reebok-gym-gloves" },
  { id: 5, name: "Yonex Badminton Racket", price: 90, category: "Badminton", image: "/images/badminton.jpg", slug: "yonex-badminton-racket" },
  { id: 6, name: "Cricket Bat", price: 150, category: "Cricket", image: "/images/cricketbat.jpg", slug: "cricket-bat" },
  { id: 7, name: "Tennis Ball Pack", price: 40, category: "Tennis", image: "/images/tennis.jpg", slug: "tennis-ball-pack" },
  { id: 8, name: "Boxing Gloves", price: 60, category: "Boxing", image: "/images/boxing.jpg", slug: "boxing-gloves" },
  { id: 9, name: "Yoga Mat", price: 30, category: "Fitness", image: "/images/yogamat.jpg", slug: "yoga-mat" },
  { id: 10, name: "Skateboard", price: 100, category: "Skating", image: "/images/skateboard.jpg", slug: "skateboard" },
];

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const { cart, addToCart, increaseQty, decreaseQty, removeFromCart, totalPrice } = useCart();
  const { favourites, toggleFavourite, isFavourite } = useFavourites();

  // 🔹 Category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // 🔹 Price filter
  const handlePriceChange = (price: number) => {
    setSelectedPrice((prev) => (prev === price ? null : price));
  };

  // 🔹 Filter logic
  const filteredProducts = productsData.filter((product) => {
    const matchCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchPrice = selectedPrice === null || product.price <= selectedPrice;
    return matchCategory && matchPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 text-gray-800">
      {/* Header */}
      <header className="bg-amber-100 shadow-md static top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-amber-700">Pro-Sports Hub</h1>
          <div className="flex items-center gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <ShoppingCart className="text-amber-600" />
              <span className="font-semibold">{cart.length} Items</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 py-10 px-6">
        {/* Sidebar Filters */}
        <div className="md:w-1/4 w-full bg-white p-6 rounded-2xl shadow-md">
          <ProductFilters
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            selectedPrice={selectedPrice}
            onPriceChange={handlePriceChange}
          />
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">
              No products match your filters.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col relative"
              >
                {/* ❤️ Favourite Button */}
                <button
                  onClick={() =>
                    toggleFavourite({
                      id: product.id.toString(),
                      name: product.name,
                      image: product.image,
                      price: product.price,
                    })
                  }
                  className="absolute top-4 right-4 bg-white/70 p-2 rounded-full hover:bg-white shadow-md z-10"
                >
                  <Heart
                    size={20}
                    className={`${
                      isFavourite(product.id.toString())
                        ? "text-red-600 fill-red-600"
                        : "text-gray-400"
                    } transition-colors`}
                  />
                </button>
                <Link href={`/shop/${product.slug}`} className="group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-700">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-amber-600 font-bold text-lg mt-1">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto bg-amber-600 text-white py-2 rounded-xl hover:bg-amber-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-2xl px-6 py-4 w-80 border border-amber-200">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="text-amber-600" />
              <h3 className="font-bold text-amber-700">Your Cart</h3>
            </div>
            <span className="text-sm text-gray-500">{cart.length} items</span>
          </div>

          <ul className="max-h-48 overflow-y-auto space-y-3 mb-3">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700 text-sm">{item.name}</span>
                <div className="flex items-center gap-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 bg-amber-100 rounded-full text-amber-700 font-bold"
                    >
                      –
                    </button>
                    <span className="text-gray-800 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 bg-amber-100 rounded-full text-amber-700 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-semibold text-amber-700 text-sm">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center border-t pt-2">
            <span className="font-semibold text-gray-700">Total:</span>
            <span className="font-bold text-amber-700">${totalPrice.toFixed(2)}</span>
          </div>

          <Link href="/checkout">
            <button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl font-semibold transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
