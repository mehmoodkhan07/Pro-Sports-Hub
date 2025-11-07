import type React from "react";
import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { CartProvider } from "@/components/CartContext";
import { FavouritesProvider } from "@/components/FavouritesPanel";

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
  metadataBase: new URL("https://pro-sports-hub.vercel.app"), // ✅ Your live site URL
  title: {
    default: "Pro-Sports Hub | Power Your Game",
    template: "%s | Pro-Sports Hub",
  },
  description:
    "Discover premium sports gear, apparel, and equipment. Shop running shoes, football boots, gym essentials, and more — all at Pro-Sports Hub. Elevate your performance today!",
  keywords: [
    "sports gear",
    "running shoes",
    "football boots",
    "gym equipment",
    "sportswear",
    "fitness accessories",
    "Pro Sports Hub",
  ],
  authors: [{ name: "Pro-Sports Hub Team" }],
  creator: "Pro-Sports Hub",
  publisher: "Pro-Sports Hub",
  openGraph: {
    title: "Pro-Sports Hub | Performance Sports Gear & Apparel",
    description:
      "Shop top-quality sports gear, apparel, and accessories to enhance your athletic performance. Trusted by professionals worldwide.",
    url: "https://pro-sports-hub.vercel.app",
    siteName: "Pro-Sports Hub",
    images: [
      {
        url: "/og-image.jpg", // ✅ Put this image in your public/ folder (recommended 1200x630)
        width: 1200,
        height: 630,
        alt: "Pro-Sports Hub - Premium Sports Gear",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro-Sports Hub | Power Your Game",
    description:
      "Elite sports gear, apparel, and accessories for every athlete. Elevate your performance with Pro-Sports Hub.",
    images: ["/og-image.jpg"],
    creator: "@ProSportsHub",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "Sports & Fitness",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://pro-sports-hub.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans bg-gray-50 text-gray-900">
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
