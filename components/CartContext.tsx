"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalPrice: number;
  sendToWhatsApp: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // ✅ Load cart from localStorage on first render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        console.error("Failed to parse saved cart data.");
      }
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add or update quantity
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ Increase quantity
  const increaseQty = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  // ✅ Decrease quantity (remove if 0)
  const decreaseQty = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => (item.quantity || 0) > 0)
    );
  };

  // ✅ Remove item completely
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // ✅ Clear entire cart
  const clearCart = () => setCart([]);

  // ✅ Always accurate total
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 0),
    0
  );

  // ✅ WhatsApp checkout
  const sendToWhatsApp = () => {
    if (cart.length === 0) return;

    const message = cart
      .map(
        (item) =>
          `🛍️ *${item.name}*\nPrice: Rs ${item.price}\nQty: ${
            item.quantity || 1
          }\n-----------------`
      )
      .join("\n");

    const total = `\n💰 *Total: Rs ${totalPrice}*\n\nThank you for shopping with us!`;
    const fullMessage = encodeURIComponent(message + total);

    const phoneNumber = "923111241639"; // ✅ change this to your WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${fullMessage}`, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalPrice,
        sendToWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
