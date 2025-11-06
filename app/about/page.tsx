import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Pro-Sport HUB - Elevate Your Game",
  description:
    "Discover the story behind Pro-Sport HUB, our mission to empower athletes, and our passion for high-performance sports gear built for champions.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-amber-900 font-rye mb-6">Driven by Passion. Built for Performance.</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          At Pro-Sport HUB, we believe every athlete deserves the gear to reach their full potential. Since 2010, we’ve
          been dedicated to crafting innovative sports equipment and apparel that fuel your passion for performance.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <Image
            src="/athlete-training.jpg"
            alt="Athlete training hard in the gym"
            width={600}
            height={500}
            className="rounded-lg w-120 h-120 shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-amber-900 font-rye">Our Journey to Excellence</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Founded in 2010 by sports enthusiasts and fitness experts, Pro-Sport HUB began as a small vision — to make
            professional-grade sportswear and equipment accessible to everyone. What started as a local shop quickly
            evolved into a nationwide brand trusted by athletes, trainers, and sports teams.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Every product we create is designed with precision, durability, and comfort in mind. From gym essentials to
            outdoor performance gear, our mission is to support you in breaking boundaries, achieving goals, and living
            an active life.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-amber-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-amber-900 font-rye text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">I</span>
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-3">Innovation</h3>
            <p className="text-gray-700">
              We push the limits of technology and design to create gear that enhances performance and endurance for
              athletes of all levels.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">P</span>
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-3">Passion</h3>
            <p className="text-gray-700">
              Our love for sports drives everything we do — from design to delivery, we’re committed to inspiring active
              lifestyles.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">T</span>
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-3">Trust</h3>
            <p className="text-gray-700">
              Built on integrity and excellence, Pro-Sport HUB stands by every product we sell and every athlete we
              serve.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-amber-900 font-rye mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Image
              src="/founder.jpg"
              alt="Alex Carter - Founder"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-amber-900">Mehmood Khan</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="text-center">
            <Image
              src="/designer.jpg"
              alt="Mia Johnson - Head of Design"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-amber-900">Tanveer Hassan</h3>
            <p className="text-gray-600">Head of Design & Innovation</p>
          </div>
          <div className="text-center">
            <Image
              src="/coach.jpg"
              alt="Chris Walker - Performance Director"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-amber-900">Haseeb Khalid</h3>
            <p className="text-gray-600">Performance Director</p>
          </div>
        </div>
      </div>
    </div>
  )
}
