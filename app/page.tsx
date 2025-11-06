import Hero from "@/components/Hero"
import ProductCategories from "@/components/ProductCategories"
import FeaturedProducts from "@/components/FeaturedProducts"
import TrustBadges from "@/components/TrustBadges"
import InstagramFeed from "@/components/InstagramFeed"
import Newsletter from "@/components/Newsletter"

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <ProductCategories />
      <FeaturedProducts />
      <InstagramFeed />
      <Newsletter />
    </>
  )
}
