import { pageSeo, siteOrigin } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Hero from '@/components/sections/home/Hero'
import FeaturedGuides from '@/components/sections/home/FeaturedGuides'
import DirectoryPreview from '@/components/sections/home/DirectoryPreview'
import ExploreUruguay from '@/components/sections/home/ExploreUruguay'
import ResourcesPreview from '@/components/sections/home/ResourcesPreview'
import Testimonials from '@/components/sections/home/Testimonials'
import PdfBanner from '@/components/sections/home/PdfBanner'
import Footer from '@/components/layout/Footer'
import { getUpcomingEvents } from '@/lib/calendar'
import type { CalendarEvent } from '@/lib/calendar'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  let events: CalendarEvent[] = []
  try {
    events = await getUpcomingEvents()
  } catch {
    // calendar unavailable — hero renders with static fallback
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'NomadUY',
        alternateName: 'Nomad UY',
        url: siteOrigin,
        inLanguage: ['es', 'en', 'pt'],
      }) }} />
      <Nav />
      <Hero events={events} />
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

const searchCopy = {
  "es": [
    "Vivir y trabajar en Uruguay",
    "Guías para mudarte a Uruguay, resolver trámites, encontrar alquiler y conocer gente. Para nómadas digitales y personas recién llegadas."
  ],
  "en": [
    "Living and working in Uruguay",
    "Guides to moving to Uruguay, getting set up, renting a home and meeting people. For digital nomads and newcomers."
  ],
  "pt": [
    "Morar e trabalhar no Uruguai",
    "Guias para mudar para o Uruguai, resolver documentos, encontrar aluguel e conhecer pessoas. Para nômades digitais e recém-chegados."
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [title, description] = searchCopy[locale === 'en' || locale === 'pt' ? locale : 'es']
  return pageSeo('/', locale, title, description)
}
