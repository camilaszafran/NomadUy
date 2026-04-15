import Nav from '@/components/layout/Nav'
import ComunidadHero from '@/components/sections/comunidad/ComunidadHero'
import FeaturesSection from '@/components/sections/comunidad/FeaturesSection'
import PlatformsSection from '@/components/sections/comunidad/PlatformsSection'
import GroupsSection from '@/components/sections/comunidad/GroupsSection'
import EventsSection from '@/components/sections/comunidad/EventsSection'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Comunidad — NomadUY',
  description: 'Unirte a la comunidad de nómadas, expats e inmigrantes en Uruguay.',
}

export default function ComunidadPage() {
  return (
    <>
      <Nav />
      <ComunidadHero />
      <FeaturesSection />
      <PlatformsSection />
      <GroupsSection />
      <EventsSection />
      <Footer />
    </>
  )
}
