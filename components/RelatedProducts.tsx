import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

const relatedProducts = [
  {
    id: "sp2",
    name: "Match Day Soccer Ball",
    price: 89.99,
    image: "/premium-soccer-ball.jpg",
    rating: 4.6,
    reviews: 120,
    slug: "match-day-soccer-ball",
  },
  {
    id: "sp3",
    name: "Performance Basketball Jersey",
    price: 59.99,
    image: "/basketball-jersey.png",
    rating: 4.5,
    reviews: 88,
    slug: "performance-basketball-jersey",
  },
  {
    id: "sp4",
    name: "Gym Training Gloves",
    price: 29.99,
    image: "/gym-training-gloves.jpg",
    rating: 4.3,
    reviews: 51,
    slug: "gym-training-gloves",
  },
  {
    id: "sp5",
    name: "Carbon Fiber Tennis Racket",
    price: 249.99,
    image: "/tennis-racket-carbon-fiber.jpg",
    rating: 4.8,
    reviews: 67,
    slug: "carbon-fiber-tennis-racket",
  },
]

export default function RelatedProducts({
  category,
  currentProductId,
}: {
  category: string
  currentProductId: string
}) {
  const filteredProducts = relatedProducts.filter((p) => p.id !== currentProductId).slice(0, 4)

  return (
    <section>
      <h2 className="text-2xl font-bold text-amber-900 mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({product.reviews})</span>
              </div>
              <div className="text-lg font-bold text-amber-900">${product.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
