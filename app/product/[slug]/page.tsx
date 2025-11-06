import { notFound } from "next/navigation"
import { Star, Truck, Shield, RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ProductImageGallery from "@/components/ProductImageGallery"
import RelatedProducts from "@/components/RelatedProducts"
import CustomerReviews from "@/components/CustomerReviews"
import AddToCartButton from "@/components/AddToCartButton"

const getProduct = async (slug: string) => {
  const products = {
    // 🏃‍♂️ Elite Runner Pro Shoes
    "elite-runner-pro-shoes": {
      id: "sp1",
      name: "Elite Runner Pro Shoes",
      price: 159.99,
      originalPrice: 189.99,
      description:
        "Lightweight, responsive running shoes engineered for speed and comfort. Ideal for race days with a carbon plate for propulsion and breathable mesh upper.",
      images: [
        "/elite-running-shoes.jpg",
        "/elite-running-shoes-side-view.jpg",
        "/elite-running-shoes-top-view.jpg",
        "/elite-running-shoes-outsole.jpg",
      ],
      category: "Footwear",
      inStock: true,
      rating: 4.7,
      reviews: 203,
      features: [
        "Ultra-breathable mesh upper",
        "Carbon-infused plate for extra speed",
        "Responsive high-rebound midsole",
        "Durable outsole for road traction",
        "200g lightweight design",
      ],
      specifications: {
        Surface: "Road",
        Drop: "8mm",
        Weight: "200g (US M9)",
        Cushioning: "Responsive",
        Fit: "True to size",
        Sizes: "US 7-13",
      },
    },

    // 🏀 Performance Basketball Jersey
    "performance-basketball-jersey": {
      id: "sp3",
      name: "Performance Basketball Jersey",
      price: 59.99,
      originalPrice: 69.99,
      description:
        "High-performance basketball jersey designed for intense gameplay. Made with moisture-wicking, stretchable, and breathable fabric for ultimate comfort.",
      images: [
        "/basketball-jersey.png",
        "/basketball-jersey-closeup.jpg",
        "/basketball-jersey-back.jpg",
        "/basketball-jersey-lifestyle.jpg",
      ],
      category: "Apparel",
      inStock: true,
      rating: 4.5,
      reviews: 88,
      features: [
        "Sweat-wicking polyester blend",
        "Lightweight and stretchable design",
        "Mesh panels for ventilation",
        "Official team colourways available",
        "Machine washable fabric",
      ],
      specifications: {
        Material: "Polyester (Dri-Fit)",
        Fit: "Athletic",
        Sizes: "S-XXL",
        Wash: "Machine wash cold",
        Neckline: "Crew neck",
      },
    },

    // 🎾 Carbon Fiber Tennis Racket
    "carbon-fiber-tennis-racket": {
      id: "sp5",
      name: "Carbon Fiber Tennis Racket",
      price: 249.99,
      description:
        "Professional-grade tennis racket crafted with carbon fibre for enhanced power and control. Ideal for intermediate and advanced players.",
      images: [
        "/tennis-racket-carbon-fiber1.jpg",
        "/tennis-racket-frame.jpg",
        "/tennis-racket-handle.jpg",
        "/tennis-racket-court.jpg",
      ],
      category: "Equipment",
      inStock: true,
      rating: 4.8,
      reviews: 67,
      features: [
        "100% carbon-fibre frame construction",
        "Balanced weight for precise control",
        "Aero-beam design for faster swings",
        "Comfort grip handle with shock absorption",
        "Protective carrying case included",
      ],
      specifications: {
        HeadSize: "98 sq in",
        Weight: "305g (unstrung)",
        Balance: "320mm",
        StringPattern: "16x19",
        Length: "27 inches",
      },
    },

    // 🥊 Gym Training Gloves
    "gym-training-gloves": {
      id: "sp4",
      name: "Gym Training Gloves",
      price: 29.99,
      originalPrice: 39.99,
      description:
        "Durable gym gloves designed to improve grip, comfort, and protection during intense workouts. Perfect for lifting, cycling, and fitness training.",
      images: [
        "/gym-training-gloves.jpg",
        "/gym-gloves-closeup.jpg",
        "/gym-gloves-grip.jpg",
        "/gym-gloves-wrist.jpg",
      ],
      category: "Accessories",
      inStock: true,
      rating: 4.3,
      reviews: 51,
      features: [
        "Breathable mesh design keeps hands cool",
        "Padded palm for extra comfort",
        "Adjustable wrist strap for secure fit",
        "Non-slip silicone grip pattern",
        "Easy pull-off tabs",
      ],
      specifications: {
        Material: "Synthetic leather and mesh",
        Fit: "Adjustable wrist strap",
        Sizes: "S, M, L, XL",
        Wash: "Hand wash only",
        Grip: "Anti-slip",
      },
    },
  };

  return products[slug as keyof typeof products] || null;
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  if (!product) return { title: "Product Not Found" }
  return {
    title: `${product.name} - ProSport Outfitters`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <ProductImageGallery images={product.images} alt={product.name} />
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-amber-900 font-rye mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-amber-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

          <div>
            <h3 className="font-semibold text-lg mb-3">Key Features:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <AddToCartButton product={product} />

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Free shipping over $100</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Official warranty</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              ✓ Secure Checkout
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              ✓ Pro-Grade Gear
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              ✓ Free Returns 30 Days
            </Badge>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button className="py-2 px-1 border-b-2 border-amber-500 text-amber-600 font-medium">Specifications</button>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-900">{key}:</span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <CustomerReviews productId={product.id} />
      <RelatedProducts category={product.category} currentProductId={product.id} />
    </div>
  )
}
