import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* ✅ Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.jpg"
          alt="Athlete sprinting under stadium lights"
          fill        // ✅ replaces layout="fill"
          style={{ objectFit: "cover" }} // ✅ replaces objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
      </div>

      {/* ✅ Text Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold font-rye mb-6 drop-shadow-lg">
          Gear Up. Play Hard.
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-2xl mx-auto">
          Elite sports gear and apparel engineered for peak performance. From track to court to gym.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-4">
            <Link href="/shop">Shop Sports</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 bg-white/10 border-white text-white hover:bg-white hover:text-gray-900"
          >
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>

      {/* ✅ Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
