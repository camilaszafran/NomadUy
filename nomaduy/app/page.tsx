import Nav from '@/components/layout/Nav'
import Hero from '@/components/sections/home/Hero'
import FeaturedGuides from '@/components/sections/home/FeaturedGuides'
import DirectoryPreview from '@/components/sections/home/DirectoryPreview'
import ExploreUruguay from '@/components/sections/home/ExploreUruguay'
import ResourcesPreview from '@/components/sections/home/ResourcesPreview'
import Testimonials from '@/components/sections/home/Testimonials'
import PdfBanner from '@/components/sections/home/PdfBanner'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <FeaturedGuides />
      <DirectoryPreview />
      <ExploreUruguay />
      <ResourcesPreview />
      <Testimonials />
      <PdfBanner />
      <Footer />
    </>
  )
}
