"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/CartContext"
import { useState } from "react"
import { useFavourites } from "@/components/FavouritesPanel";

const featuredProducts = [
  {
    id: "sp1",
    name: "Elite Runner Pro Shoes",
    price: 159.99,
    originalPrice: 189.99,
    image: "/elite-running-shoes.jpg",
    rating: 4.7,
    reviews: 203,
    slug: "elite-runner-pro-shoes",
    isNew: true,
    onSale: true,
    category: "Footwear",
  },
  {
    id: "sp3",
    name: "Performance Basketball Jersey",
    price: 59.99,
    image: "/basketball-jersey.png",
    rating: 4.5,
    reviews: 88,
    slug: "performance-basketball-jersey",
    isNew: true,
    onSale: false,
    category: "Apparel",
  },
  {
    id: "sp5",
    name: "Carbon Fiber Tennis Racket",
    price: 249.99,
    image: "/tennis-racket-carbon-fiber.jpg",
    rating: 4.8,
    reviews: 67,
    slug: "carbon-fiber-tennis-racket",
    isNew: true,
    onSale: false,
    category: "Equipment",
  },
  {
    id: "sp4",
    name: "Gym Training Gloves",
    price: 29.99,
    originalPrice: 39.99,
    image: "/gym-training-gloves.jpg",
    rating: 4.3,
    reviews: 51,
    slug: "gym-training-gloves",
    isNew: false,
    onSale: true,
    category: "Accessories",
  },
]

export default function FeaturedProducts() {
  const { addToCart } = useCart()
  const [wishlist, setWishlist] = useState<string[]>([])
  const { favourites, toggleFavourite, isFavourite } = useFavourites();

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleWhatsAppShare = (product: any) => {
    const message = `Check out this product: ${product.name} - Rs.${product.price}\nView here: ${window.location.origin}/product/${product.slug}`
    window.open(`https://wa.me/923111241639?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 font-rye mb-4">
            Featured Gear
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Top-performing products trusted by athletes and teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Labels */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && <Badge className="bg-green-600">New</Badge>}
                  {product.onSale && <Badge className="bg-red-600">Sale</Badge>}
                </div>

                {/* Wishlist & Share */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button
                onClick={() =>
                  toggleFavourite({
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                  })
                }
                className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isFavourite(product.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-600"
                  }`}
                />
              </button>

                  <button
                    onClick={() => handleWhatsAppShare(product)}
                    className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md"
                  >
                    <Share2 className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs text-amber-700 font-medium uppercase mb-1">
                  {product.category}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-amber-900">
                    Rs.{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      Rs.{product.originalPrice}
                    </span>
                  )}
                </div>

                <Button
onClick={() => addToCart(product as any)}
className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-all"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-full font-semibold px-8"
          >
            <Link href="/shop">View All Gear</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
