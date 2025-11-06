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

  // ✅ Apply stored discount if available
  useEffect(() => {
    const discountActive = localStorage.getItem("discountActive") === "true";
    const discountValue = parseInt(localStorage.getItem("discountPercent") || "0");
    if (discountActive && discountValue > 0) {
      setDiscountPercent(discountValue);
    }
  }, []);

  // ✅ WhatsApp message function
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
    <div className="min-h-screen bg-amber-50 py-10 px-6 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-amber-700">Checkout</h1>
          <Link href="/shop" className="text-amber-600 hover:underline flex items-center gap-2">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <>
            {/* 🛒 Cart Items List */}
            <ul className="divide-y divide-gray-200 mb-6">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-amber-600 font-bold">${item.price}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 rounded-lg font-bold"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-semibold">
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
                      className="text-red-500 hover:text-red-700 ml-3"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* 💰 Price Summary */}
            <div className="flex flex-col border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Subtotal:</span>
                <span className="font-bold text-gray-800">${totalPrice.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-amber-700">
                  <span>Discount ({discountPercent}%):</span>
                  <span>- ${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center font-bold text-amber-700 mt-1">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={clearCart}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold"
              >
                Clear Cart
              </button>
              <button
                onClick={sendToWhatsApp}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl font-semibold transition"
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
