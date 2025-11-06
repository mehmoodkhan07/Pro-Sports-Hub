"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const handleDiscountApply = () => {
    if (!email.trim()) {
      alert("Please enter your email address to get the discount!");
      return;
    }

    // ✅ Store discount status so it can be applied on the shop page
    localStorage.setItem("discountActive", "true");
    localStorage.setItem("discountPercent", "10");

    setIsVisible(false);

    // ✅ Redirect user to shop page
    router.push("/shop");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 relative shadow-2xl">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            Wait! Don't Leave Empty-Handed 🎁
          </h2>
          <p className="text-gray-600 mb-6">
            Get <span className="font-semibold text-amber-700">10% OFF</span> your first order when you subscribe!
          </p>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={handleDiscountApply}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              Get 10% Off & Shop Now
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            *Offer valid for new customers only. Cannot be combined with other offers.
          </p>
        </div>
      </div>
    </div>
  );
}
