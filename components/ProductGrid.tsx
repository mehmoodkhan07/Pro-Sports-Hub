import Link from "next/link"

const products = [
  {
    id: "sp1",
    name: "Elite Runner Pro Shoes",
    price: 159.99,
    originalPrice: 189.99,
    image: "/elite-running-shoes.jpg",
    category: "Footwear",
    rating: 4.7,
    reviews: 203,
    slug: "elite-runner-pro-shoes",
    isNew: true,
    onSale: true,
  },
  {
    id: "sp2",
    name: "Match Day Soccer Ball",
    price: 89.99,
    image: "/premium-soccer-ball.jpg",
    category: "Equipment",
    rating: 4.6,
    reviews: 120,
    slug: "match-day-soccer-ball",
    isNew: false,
    onSale: false,
  },
  {
    id: "sp3",
    name: "Performance Basketball Jersey",
    price: 59.99,
    image: "/basketball-jersey.png",
    category: "Apparel",
    rating: 4.5,
    reviews: 88,
    slug: "performance-basketball-jersey",
    isNew: true,
    onSale: false,
  },
  {
    id: "sp4",
    name: "Gym Training Gloves",
    price: 29.99,
    originalPrice: 39.99,
    image: "/gym-training-gloves.jpg",
    category: "Accessories",
    rating: 4.3,
    reviews: 51,
    slug: "gym-training-gloves",
    isNew: false,
    onSale: true,
  },
  {
    id: "sp5",
    name: "Carbon Fiber Tennis Racket",
    price: 249.99,
    image: "/tennis-racket-carbon-fiber.jpg",
    category: "Equipment",
    rating: 4.8,
    reviews: 67,
    slug: "carbon-fiber-tennis-racket",
    isNew: false,
    onSale: false,
  },
  {
    id: "sp6",
    name: "Compression Training Shorts",
    price: 39.99,
    image: "/compression-training-shorts.jpg",
    category: "Apparel",
    rating: 4.4,
    reviews: 98,
    slug: "compression-training-shorts",
    isNew: false,
    onSale: false,
  },
]

export default function ProductGrid({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; price?: string }
}) {
  let filteredProducts = products

  if (searchParams.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase().replace(/\s+/g, "-") === searchParams.category,
    )
  }

  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "price-low":
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filteredProducts = [...filteredProducts].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Showing {filteredProducts.length} products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative aspect-square overflow-hidden">
              {/* Using plain img to avoid Next/Image fill in link wrapper in some contexts */}
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="text-xs text-amber-600 uppercase tracking-wide mb-1">{product.category}</div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-amber-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
