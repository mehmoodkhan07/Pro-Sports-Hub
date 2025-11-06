"use client";

import { useState } from "react"
import { Star, ThumbsUp, User, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Review {
  id: string
  name: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  helpful: number
}

// Mock reviews (sports-themed)
const initialReviews: Review[] = [
  {
    id: "1",
    name: "Alex Carter",
    rating: 5,
    date: "2025-01-02",
    title: "Best Running Shoes Ever!",
    content:
      "These running shoes are incredibly lightweight and comfortable. I’ve clocked over 100km already and the cushioning still feels new. Excellent grip on both wet and dry surfaces.",
    verified: true,
    helpful: 21,
  },
  {
    id: "2",
    name: "Maria Gonzalez",
    rating: 4,
    date: "2025-01-05",
    title: "Perfect for Gym and Training",
    content:
      "Very durable and stylish. The sole provides great support during squats and runs. Only wish the laces were a bit thicker. Still, highly recommend for athletes.",
    verified: true,
    helpful: 14,
  },
  {
    id: "3",
    name: "David Brown",
    rating: 3,
    date: "2025-01-10",
    title: "Good but needs improvement",
    content:
      "The shoes fit well but felt slightly tight after long runs. The build quality is solid though. Would be better with more ventilation.",
    verified: false,
    helpful: 6,
  },
]

export default function CustomerReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">("newest")
  const [newReview, setNewReview] = useState({
    name: "",
    title: "",
    content: "",
    rating: 0,
  })
  const [showForm, setShowForm] = useState(false)

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sortBy === "highest") return b.rating - a.rating
    return a.rating - b.rating
  })

  // Handle helpful clicks
  const handleHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r))
    )
  }

  // Add new review
  const handleAddReview = () => {
    if (!newReview.name || !newReview.title || !newReview.content || newReview.rating === 0) return
    const newRev: Review = {
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toISOString(),
      title: newReview.title,
      content: newReview.content,
      verified: false,
      helpful: 0,
    }
    setReviews([newRev, ...reviews])
    setNewReview({ name: "", title: "", content: "", rating: 0 })
    setShowForm(false)
  }

  return (
    <section className="mb-16">
      <div className="border-b border-gray-200 mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Customer Reviews</h2>
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-amber-700" />
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* Average Rating */}
      <div className="text-center mb-8 bg-amber-50 rounded-lg p-6 shadow-sm">
        <div className="text-5xl font-bold text-amber-900">{averageRating.toFixed(1)}</div>
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
        </div>
        <p className="text-gray-600">Based on {reviews.length} reviews</p>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-amber-700" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>

                <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                <p className="text-gray-700 mb-3">{review.content}</p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleHelpful(review.id)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-700 transition"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      {showForm ? (
        <div className="mt-8 bg-amber-50 rounded-lg p-6 shadow-inner space-y-4">
          <h3 className="text-lg font-semibold text-amber-900">Write Your Review</h3>
          <Input
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          />
          <Input
            placeholder="Review Title"
            value={newReview.title}
            onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
          />
          <Textarea
            placeholder="Write your review..."
            value={newReview.content}
            onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
          />
          <div className="flex gap-2 items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 cursor-pointer ${
                  i < newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
              />
            ))}
          </div>
          <Button onClick={handleAddReview} className="bg-amber-700 hover:bg-amber-800 text-white">
            Submit Review
          </Button>
        </div>
      ) : (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setShowForm(true)}
            className="border-amber-600 text-amber-600 hover:bg-amber-50"
          >
            Write a Review
          </Button>
        </div>
      )}
    </section>
  )
}
