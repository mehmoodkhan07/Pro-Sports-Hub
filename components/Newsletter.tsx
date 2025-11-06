"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would typically call your newsletter API
    console.log("Subscribing email:", email)

    setIsSubscribing(false)
    setIsSubscribed(true)
    setEmail("")
  }

  if (isSubscribed) {
    return (
      <section className="py-16 bg-amber-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Pro-Sport Family!</h2>
            <p className="text-amber-100 text-lg">
              Thank you for subscribing! Check your email for your 10% discount code.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-amber-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Exclusive Offer
                </span>
              </div>

              <h2 className="text-4xl font-bold font-rye mb-4">Join the Wild West Family</h2>
              <p className="text-xl text-amber-100 mb-6">
                Get 10% off your first order plus exclusive access to new products, western style tips, and special
                promotions.
              </p>

              <div className="space-y-3 text-amber-100">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-amber-200 rounded-full"></span>
                  <span>Early access to new collections</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-amber-200 rounded-full"></span>
                  <span>Exclusive member-only discounts</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-amber-200 rounded-full"></span>
                  <span>Western lifestyle tips and guides</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-amber-200 rounded-full"></span>
                  <span>Behind-the-scenes content</span>
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="bg-white rounded-lg p-8 shadow-xl">
              <div className="text-center mb-6">
                <Mail className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your 10% Discount</h3>
                <p className="text-gray-600">Subscribe to our newsletter and save on your first order</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 text-lg"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubscribing || !email}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-semibold"
                >
                  {isSubscribing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Subscribing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      Get 10% Off Now
                    </div>
                  )}
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
