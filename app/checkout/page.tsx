"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/components/CartContext";
import { Trash2, ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice, clearCart } = useCart();
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalTotal = totalPrice - discountAmount;

  useEffect(() => {
    const discountActive = localStorage.getItem("discountActive") === "true";
    const discountValue = parseInt(localStorage.getItem("discountPercent") || "0");
    if (discountActive && discountValue > 0) {
      setDiscountPercent(discountValue);
    }
  }, []);

  const sendToWhatsApp = () => {
    const phoneNumber = "923111241639"; // Change to your number

    const message = encodeURIComponent(
      `🛒 *New Order from Pro Sports Hub*\n\n` +
        cart
          .map(
            (item) =>
              `• ${item.name}\n   Price: $${item.price}\n   Qty: ${item.quantity}`
          )
          .join("\n\n") +
        `\n\n💰 *Subtotal:* $${totalPrice.toFixed(2)}\n` +
        (discountPercent > 0
          ? `🎁 *Discount (${discountPercent}%):* -$${discountAmount.toFixed(2)}\n`
          : "") +
        `✅ *Final Total:* $${finalTotal.toFixed(2)}\n\nPlease confirm my order.`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-amber-50 py-6 sm:py-10 px-4 sm:px-6 lg:px-10 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-5 sm:p-8 rounded-2xl shadow-md">
        {/* 🧭 Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-700">
            Checkout
          </h1>
          <Link
            href="/shop"
            className="text-amber-600 hover:underline flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center text-sm sm:text-base">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* 🛍️ Cart Items */}
            <ul className="divide-y divide-gray-200 mb-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 sm:gap-0"
                >
                  {/* 🖼️ Product Info */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-16 sm:h-16 rounded-lg object-cover shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg">
                        {item.name}
                      </h3>
                      <p className="text-amber-600 font-bold text-sm sm:text-base">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  {/* ➕ Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 rounded-lg font-bold"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-semibold text-sm sm:text-base">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 rounded-lg font-bold"
                    >
                      <Plus size={14} />
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2 sm:ml-3"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* 💰 Price Summary */}
            <div className="border-t pt-3 space-y-1 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Subtotal:</span>
                <span className="font-bold text-gray-800">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>Discount ({discountPercent}%):</span>
                  <span>- ${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-amber-700 mt-1">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* 🧾 Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={clearCart}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
              >
                Clear Cart
              </button>
              <button
                onClick={sendToWhatsApp}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition"
              >
                Confirm & Pay via WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
