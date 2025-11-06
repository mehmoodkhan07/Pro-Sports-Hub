"use client"

import { Truck, Shield, RotateCcw, Award, Info } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

const badges = [
  { 
    icon: Truck, 
    title: "Free Shipping", 
    description: "Enjoy free shipping on all orders over $100.", 
    link: "/shipping-policy" 
  },
  { 
    icon: Shield, 
    title: "Secure Checkout", 
    description: "We use 256-bit SSL encryption to protect your payment data.", 
    link: "/secure-checkout" 
  },
  { 
    icon: RotateCcw, 
    title: "30-Day Returns", 
    description: "Hassle-free returns and exchanges within 30 days of purchase.", 
    link: "/returns" 
  },
  { 
    icon: Award, 
    title: "Pro-Grade Gear", 
    description: "Our products are tested and trusted by professional athletes.", 
    link: "/about#quality" 
  },
]

export default function TrustBadges() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="py-16 bg-amber-200 ">
      <div className="container mx-auto px-3">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {badges.map((badge, index) => (
            <motion.a
              key={badge.title}
              href={badge.link}
              target="_self"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(badge.title)}
              onMouseLeave={() => setHovered(null)}
              className="relative group text-center bg-white rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-amber-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                animate={hovered === badge.title ? { scale: 1.15 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 10 }}
                className="w-14 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md"
              >
                <badge.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">{badge.title}</h3>
              <p className="text-gray-600">{badge.description}</p>

              {/* Tooltip on hover */}
              {hovered === badge.title && (
                <div className="absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 w-48 shadow-lg z-10">
                  {badge.description}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-gray-800"></div>
                </div>
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
