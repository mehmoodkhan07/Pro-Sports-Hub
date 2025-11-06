"use client";

import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { useFavourites } from "@/components/FavouritesPanel";
import { Heart, ShoppingCart, Truck, Shield, RotateCcw, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const productsData = [
  {
    id: 1,
    name: "Nike Football",
    price: 50,
    originalPrice: 60,
    category: "Football",
    image: "/images/football.png",
    slug: "nike-football",
    description:
      "High-quality Nike football designed for maximum control, durability, and performance on all surfaces.",
    rating: 4.5,
    reviews: 120,
    features: [
      "Durable textured surface for better grip",
      "Reinforced bladder for long-lasting air retention",
      "Suitable for grass and turf pitches",
      "Premium stitching for accuracy",
    ],
    specifications: {
      Material: "Synthetic Leather",
      Size: "5 (Official Match Size)",
      Weight: "420g",
      Colour: "White/Gold",
    },
  },
  {
    id: 2,
    name: "Adidas Basketball",
    price: 70,
    originalPrice: 85,
    category: "Basketball",
    image: "/images/basketball.jpg",
    slug: "adidas-basketball",
    description:
      "Professional Adidas basketball crafted for indoor and outdoor games. Provides excellent bounce and grip.",
    rating: 4.7,
    reviews: 98,
    features: [
      "Deep channel design for better control",
      "Indoor and outdoor use",
      "Soft composite cover for enhanced feel",
      "Long-lasting air retention",
    ],
    specifications: {
      Material: "Rubber Composite",
      Size: "7 (Official Size)",
      Weight: "600g",
      Colour: "Orange/Black",
    },
  },
  {
    id: 3,
    name: "Puma Running Shoes",
    price: 120,
    originalPrice: 140,
    category: "Shoes",
    image: "/images/shoes1.jpg",
    slug: "puma-running-shoes",
    description:
      "Lightweight and responsive Puma running shoes built for speed and comfort during every run.",
    rating: 4.8,
    reviews: 210,
    features: [
      "Breathable mesh upper",
      "Responsive foam midsole",
      "Anti-slip rubber outsole",
      "Stylish and durable design",
    ],
    specifications: {
      Weight: "250g (US M9)",
      Cushioning: "Responsive Foam",
      Fit: "True to size",
      Colour: "Black/White",
    },
  },
  {
    id: 4,
    name: "Reebok Gym Gloves",
    price: 25,
    category: "Accessories",
    image: "/images/gloves.jpg",
    slug: "reebok-gym-gloves",
    description:
      "Durable gym gloves for extra grip, comfort, and wrist protection during training.",
    rating: 4.3,
    reviews: 65,
    features: [
      "Breathable mesh material",
      "Cushioned palm support",
      "Adjustable wrist straps",
      "Easy to wash and reuse",
    ],
    specifications: {
      Material: "Synthetic Leather",
      Size: "M, L, XL",
      Weight: "80g",
      Colour: "Grey/Black",
    },
  },
  {
    id: 5,
    name: "Yonex Badminton Racket",
    price: 90,
    category: "Badminton",
    image: "/images/badminton.jpg",
    slug: "yonex-badminton-racket",
    description:
      "Premium Yonex badminton racket engineered for control, speed, and power for all-level players.",
    rating: 4.6,
    reviews: 180,
    features: [
      "Lightweight carbon graphite frame",
      "Aerodynamic design for faster swings",
      "Durable tension strings",
      "Comfortable anti-slip handle grip",
    ],
    specifications: {
      Frame: "Carbon Graphite",
      Weight: "85g (3U)",
      Balance: "Even",
      Colour: "Blue/White",
    },
  },
  {
    id: 6,
    name: "Cricket Bat",
    price: 150,
    category: "Cricket",
    image: "/images/cricketbat.jpg",
    slug: "cricket-bat",
    description:
      "Handcrafted English willow cricket bat offering superior balance and stroke performance.",
    rating: 4.7,
    reviews: 240,
    features: [
      "Grade A English willow blade",
      "Premium cane handle for shock absorption",
      "Perfectly balanced for power shots",
      "Durable toe guard protection",
    ],
    specifications: {
      Material: "English Willow",
      Weight: "1200g",
      Handle: "Cane with rubber grip",
      Size: "Full Size (Men’s)",
      Colour: "Natural Wood Finish",
    },
  },
  {
    id: 7,
    name: "Tennis Ball Pack",
    price: 40,
    category: "Tennis",
    image: "/images/tennis.jpg",
    slug: "tennis-ball-pack",
    description:
      "Pack of 3 pressurised tennis balls designed for consistent bounce and performance on all surfaces.",
    rating: 4.4,
    reviews: 75,
    features: [
      "Durable felt outer layer",
      "Pressurised for consistent bounce",
      "Suitable for all court types",
      "Approved by international standards",
    ],
    specifications: {
      Quantity: "3 Balls per Pack",
      Type: "Pressurised",
      Colour: "Neon Yellow",
      Surface: "All Court",
    },
  },
  {
    id: 8,
    name: "Boxing Gloves",
    price: 60,
    category: "Boxing",
    image: "/images/boxing.jpg",
    slug: "boxing-gloves",
    description:
      "Professional boxing gloves providing hand protection, wrist support, and superior comfort.",
    rating: 4.5,
    reviews: 110,
    features: [
      "High-density foam padding",
      "Breathable palm mesh",
      "Adjustable Velcro straps",
      "Durable PU leather material",
    ],
    specifications: {
      Material: "PU Leather",
      Size: "12oz, 14oz, 16oz",
      Weight: "450g",
      Colour: "Red/Black",
    },
  },
  {
    id: 9,
    name: "Yoga Mat",
    price: 30,
    category: "Fitness",
    image: "/images/yogamat.jpg",
    slug: "yoga-mat",
    description:
      "Non-slip yoga mat for comfort and stability during yoga, stretching, and fitness exercises.",
    rating: 4.6,
    reviews: 95,
    features: [
      "Soft cushioned surface for comfort",
      "Anti-slip texture for better grip",
      "Lightweight and easy to carry",
      "Water-resistant and washable",
    ],
    specifications: {
      Material: "TPE Foam",
      Thickness: "6mm",
      Dimensions: "183cm x 61cm",
      Colour: "Purple/Teal",
    },
  },
  {
    id: 10,
    name: "Skateboard",
    price: 100,
    category: "Skating",
    image: "/images/skateboard.jpg",
    slug: "skateboard",
    description:
      "Durable skateboard designed for tricks, cruising, and smooth riding with high-grip wheels.",
    rating: 4.7,
    reviews: 140,
    features: [
      "7-layer maple wood deck",
      "High-rebound PU wheels",
      "ABEC-9 precision bearings",
      "Strong aluminium trucks",
    ],
    specifications: {
      Deck: "7-Layer Maple Wood",
      Wheels: "PU 52mm",
      Bearings: "ABEC-9",
      Weight: "2.5kg",
      Colour: "Black/Red",
    },
  },
];


export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();

  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-600">
        <p>Product not found.</p>
        <button
          onClick={() => router.push("/shop")}
          className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Section */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-2xl shadow-md object-cover"
          />
          <button
            onClick={() =>
              toggleFavourite({
                id: product.id.toString(),
                name: product.name,
                image: product.image,
                price: product.price,
              })
            }
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow hover:bg-white"
          >
            <Heart
              size={24}
              className={`${
                isFavourite(product.id.toString())
                  ? "text-red-600 fill-red-600"
                  : "text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <Badge variant="secondary" className="mb-2">
            {product.category}
          </Badge>

          <h1 className="text-3xl font-bold text-amber-900 mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-amber-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
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

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-xl font-semibold flex justify-center items-center gap-2 transition w-full sm:w-auto"
          >
            <ShoppingCart size={20} /> Add to Cart
          </button>

          {/* Delivery Info */}
          <div className="flex items-center gap-6 text-sm text-gray-600 pt-4 border-t">
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
              <span>Warranty available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-amber-800">
          Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between py-2 border-b border-gray-100"
            >
              <span className="font-medium text-gray-900">{key}:</span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Back Link */}
      <Link
        href="/shop"
        className="block text-center text-amber-700 hover:underline text-sm mt-4"
      >
        ← Back to Shop
      </Link>
    </div>
  );
}
