import { setRequestLocale } from 'next-intl/server'
import { AgendaContent, SocialContent } from '@/components/sections/discover/Content'
import Recommendations from '@/components/sections/discover/Recommendations'
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

export default async function ComunidadPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const events = await getUpcomingEvents()
  const calendarUrl = calendarPublicUrl()

  return (
    <>
      <Nav />
      <ComunidadHero />
      <FeaturesSection />
      <CommunityCarousel />
      <EventsSection events={events} calendarUrl={calendarUrl} />
      <AgendaContent />
      <SocialContent locale={locale} />
      <Recommendations />
      <Footer />
    </>
  )
}
