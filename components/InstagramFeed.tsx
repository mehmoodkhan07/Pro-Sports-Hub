"use client"

import { useState } from "react"
import Image from "next/image"
import { Instagram, ExternalLink, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const allPosts = [
  {
    id: "1",
    image: "/runner-tying-shoe.jpg",
    caption: "Race day ready 🏃‍♂️ #TrainHard",
    likes: 234,
    url: "https://instagram.com/p/example1",
    tags: ["TrainHard"],
  },
  {
    id: "2",
    image: "/basketball-court-game.png",
    caption: "Court energy is unmatched 🏀 #GameDay",
    likes: 189,
    url: "https://instagram.com/p/example2",
    tags: ["GameDay"],
  },
  {
    id: "3",
    image: "/tennis-racket-ball.png",
    caption: "Precision in every swing 🎾 #NeverSettle",
    likes: 312,
    url: "https://instagram.com/p/example3",
    tags: ["NeverSettle"],
  },
  {
    id: "4",
    image: "/gym-workout-gloves.jpg",
    caption: "Grip. Lift. Repeat. 💪 #TrainHard",
    likes: 156,
    url: "https://instagram.com/p/example4",
    tags: ["TrainHard"],
  },
  {
    id: "5",
    image: "/touch-the-game.jpg?height=300&width=300",
    caption: "Touch the game ⚽️ #GameDay",
    likes: 278,
    url: "https://instagram.com/p/example5",
    tags: ["GameDay"],
  },
  {
    id: "6",
    image: "/under-the-lights.jpg?height=300&width=300",
    caption: "Under the lights ✨ #NeverSettle",
    likes: 201,
    url: "https://instagram.com/p/example6",
    tags: ["NeverSettle"],
  },
]

export default function InstagramFeed() {
  const [visibleCount, setVisibleCount] = useState(4)
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = selectedTag
    ? allPosts.filter((post) => post.tags.includes(selectedTag))
    : allPosts

  const handleLike = (id: string) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-8 h-8 text-amber-600" />
            <h2 className="text-4xl font-bold text-amber-900 font-rye">
              Follow Our Game
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Highlights, training clips, and new drops on Instagram
          </p>
          <a
            href="https://instagram.com/pro-sporthub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            @pro-sporthub
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {["All", "TrainHard", "GameDay", "NeverSettle"].map((tag) => (
            <Button
              key={tag}
              onClick={() =>
                setSelectedTag(tag === "All" ? null : tag)
              }
              variant={selectedTag === tag ? "default" : "outline"}
              className={`rounded-full px-5 py-2 text-sm font-medium ${
                selectedTag === tag
                  ? "bg-amber-600 text-white"
                  : "border-amber-300 text-amber-700 hover:bg-amber-100"
              }`}
            >
              #{tag}
            </Button>
          ))}
        </div>

        {/* Instagram Posts */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredPosts.slice(0, visibleCount).map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                <p className="text-sm font-medium mb-2 px-2 text-center">
                  {post.caption}
                </p>
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1 text-sm font-semibold hover:text-pink-400 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedPosts.includes(post.id)
                        ? "fill-pink-500 text-pink-500"
                        : "text-white"
                    }`}
                  />
                  {likedPosts.includes(post.id)
                    ? post.likes + 1
                    : post.likes}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredPosts.length && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setVisibleCount((prev) => prev + 2)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full shadow-md"
            >
              Load More
            </Button>
          </div>
        )}

        {/* Footer Section */}
        <div className="text-center mt-16 bg-amber-200 rounded-xl p-10 shadow-sm">
          <h3 className="text-2xl font-bold text-amber-900 mb-3">
            Share Your Hustle
          </h3>
          <p className="text-gray-600 mb-6">
            Tag us on Instagram to get featured on our official feed!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["#ProSportHub", "#TrainHard", "#GameDay", "#NeverSettle"].map((tag) => (
              <span
                key={tag}
                className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-200 transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
