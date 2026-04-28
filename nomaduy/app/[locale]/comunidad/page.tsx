import Nav from '@/components/layout/Nav'
import ComunidadHero from '@/components/sections/comunidad/ComunidadHero'
import FeaturesSection from '@/components/sections/comunidad/FeaturesSection'
import CommunityCarousel from '@/components/sections/comunidad/CommunityCarousel'
import EventsSection from '@/components/sections/comunidad/EventsSection'
import Footer from '@/components/layout/Footer'
import { getUpcomingEvents, calendarPublicUrl } from '@/lib/calendar'

export const metadata = {
  title: 'Comunidad — NomadUY',
  description: 'Unirte a la comunidad de nómadas, expats e inmigrantes en Uruguay.',
}

export default async function ComunidadPage() {
  const events = await getUpcomingEvents()
  const calendarUrl = calendarPublicUrl()

  return (
    <>
      <Nav />
      <ComunidadHero />
      <FeaturesSection />
      <CommunityCarousel />
      <EventsSection events={events} calendarUrl={calendarUrl} />
      <Footer />
    </>
  )
}
