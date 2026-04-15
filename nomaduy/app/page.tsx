import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import CommunityBanner from '@/components/sections/CommunityBanner'
import GuideCategories from '@/components/sections/GuideCategories'
import FeaturedGuides from '@/components/sections/FeaturedGuides'
import DirectoryPreview from '@/components/sections/DirectoryPreview'
import ExploreUruguay from '@/components/sections/ExploreUruguay'
import ResourcesPreview from '@/components/sections/ResourcesPreview'
import Testimonials from '@/components/sections/Testimonials'
import PdfBanner from '@/components/sections/PdfBanner'
import Footer from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <CommunityBanner />
      <GuideCategories />
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
