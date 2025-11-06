"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useFavourites } from "@/components/FavouritesPanel";

export default function SavedSports() {
  const { cart, addToCart, removeFromCart } = useCart();
  const { favourites, toggleFavourite, isFavourite } = useFavourites();

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-amber-50 to-white transition-colors">
      {/* ===== Header ===== */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-amber-700 mb-6 flex items-center gap-2"
      >
        <Heart className="text-amber-600" /> Your Saved Favourites
      </motion.h1>

      {/* ===== Favourites Section ===== */}
      <AnimatePresence>
        {favourites.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-600 text-lg text-center mt-10"
          >
            No favourites yet. ❤️ Add some!
          </motion.p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {favourites.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl border border-amber-100 transition-all"
              >
                {/* 🖼️ Product Image */}
                {item.image && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative w-full h-48 mb-3 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                )}

                {/* 🏷️ Product Info */}
                <h3 className="text-lg font-semibold text-amber-900">
                  {item.name}
                </h3>
                {item.price && (
                  <p className="text-amber-700 font-medium mt-1">
                    Rs {item.price.toLocaleString()}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    const alreadyInCart = cart.some((p) => p.id === item.id);
                    alreadyInCart ? removeFromCart(item.id) : addToCart(item);
                  }}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white transition w-full ${
                    cart.some((p) => p.id === item.id)
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {cart.some((p) => p.id === item.id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>


                  <button
                    onClick={() => toggleFavourite(item)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 rounded-lg flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Cart Section ===== */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="mt-12 p-6 bg-amber-50 rounded-2xl shadow-lg border border-amber-200"
          >
            <h2 className="text-xl font-bold text-amber-700 mb-4 flex items-center gap-2">
              <ShoppingCart className="text-amber-600" /> Your Cart
            </h2>

            <ul className="divide-y divide-amber-200">
              {cart.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center py-3 text-amber-900"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.price && <p className="text-sm">Rs {item.price}</p>}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="flex justify-between items-center mt-5 pt-3 border-t border-amber-200">
              <p className="font-semibold text-lg text-amber-800">Total:</p>
              <p className="text-lg font-bold text-amber-700">
                Rs {total.toLocaleString()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
