import type React from "react";
import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { CartProvider } from "@/components/CartContext";
import { FavouritesProvider } from "@/components/FavouritesPanel"; // ✅ Added this line

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rye",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pro-Sport HUB",
  description:
    "Shop performance sports gear, running shoes, football boots, basketball apparel, gym equipment, and more. Pro-grade gear for every athlete. Free shipping over $100.",
  keywords:
    "sports gear, running shoes, soccer cleats, basketball jersey, gym equipment, tennis racket, sports apparel",
  openGraph: {
    title: "Pro-Sport Hub - Performance Sports Gear",
    description: "Elite sports gear and apparel to power your game.",
    images: ["/athlete-sprinting-on-track-hero-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans bg-gray-50 text-gray-900">
        {/* ✅ Both providers wrapping your full app */}
        <CartProvider>
          <FavouritesProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
            <ExitIntentPopup />
          </FavouritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
