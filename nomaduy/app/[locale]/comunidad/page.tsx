import { pageSeo } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import { AgendaContent, LearningContent, SocialContent } from '@/components/sections/discover/Content'
import Recommendations from '@/components/sections/discover/Recommendations'
import Nav from '@/components/layout/Nav'
import ComunidadHero from '@/components/sections/comunidad/ComunidadHero'
import FeaturesSection from '@/components/sections/comunidad/FeaturesSection'
import CommunityCarousel from '@/components/sections/comunidad/CommunityCarousel'
import EventsSection from '@/components/sections/comunidad/EventsSection'
import Footer from '@/components/layout/Footer'
import { getUpcomingEvents, calendarPublicUrl } from '@/lib/calendar'

const searchCopy = {
  "es": [
    "Comunidad de nómadas y migrantes en Uruguay",
    "Encontrá encuentros, talleres, intercambios de idiomas y recomendaciones para conocer gente en Uruguay."
  ],
  "en": [
    "Digital nomad and migrant community in Uruguay",
    "Find meetups, workshops, language exchanges and tips for meeting people in Uruguay."
  ],
  "pt": [
    "Comunidade de nômades e migrantes no Uruguai",
    "Encontre encontros, oficinas, intercâmbios de idiomas e dicas para conhecer pessoas no Uruguai."
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [title, description] = searchCopy[locale === 'en' || locale === 'pt' ? locale : 'es']
  return pageSeo('/comunidad', locale, title, description)
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
      <LearningContent locale={locale} />
      <Recommendations />
      <Footer />
    </>
  )
}
