"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavourites } from "@/components/FavouritesPanel";
import { useCart } from "@/components/CartContext";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  inStock: boolean;
}

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toggleFavourite, isFavourite } = useFavourites();
  const { addToCart } = useCart(); // ✅ connect to CartContext

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = ["Brown", "Black", "Tan"];

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and colour before adding to cart!");
      return;
    }

    setIsAddingToCart(true);

    // ✅ Add to cart using CartContext
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "/default.jpg",
      quantity,
    });

    // ✅ Show a nice toast notification
    toast.success(`${product.name} added to your cart 🛒`, {
      duration: 2500,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    setIsAddingToCart(false);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 border rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                selectedSize === size
                  ? "border-amber-600 bg-amber-50 text-amber-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colour Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Colour</h3>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                selectedColor === color
                  ? "border-amber-600 bg-amber-50 text-amber-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decrementQuantity}
              className="p-2 hover:bg-gray-50 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="p-2 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {product.inStock ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              In Stock
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-semibold"
        >
          {isAddingToCart ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </div>
          )}
        </Button>

        {/* ❤️ Favourite Button */}
        <Button
          onClick={() =>
            toggleFavourite({
              id: product.id,
              name: product.name,
              price: product.price,
            })
          }
          variant="outline"
          className="p-3"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavourite(product.id) ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </div>

      {/* Buy Now Button */}
      <Button
        variant="outline"
        className="w-full py-3 text-lg font-semibold border-amber-600 text-amber-600 hover:bg-amber-50"
        disabled={!product.inStock || !selectedSize || !selectedColor}
      >
        Buy Now
      </Button>

      {/* Info */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>• Free shipping on orders over $100</p>
        <p>• Usually ships within 1-2 business days</p>
        <p>• 30-day return policy</p>
      </div>
    </div>
  );
}
