import { pageSeo } from '@/lib/seo'
import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { DiscoveryLinks, TravelContent } from '@/components/sections/discover/Content'
import Nav from '@/components/layout/Nav'
import ConocerHero from '@/components/sections/conocer-uruguay/ConocerHero'
import RoutesSection from '@/components/sections/conocer-uruguay/RoutesSection'
import PdfBanner from '@/components/sections/home/PdfBanner'
import Footer from '@/components/layout/Footer'
import { sanityFetch, rutasQuery } from '@/lib/sanity'
import type { Ruta } from '@/types'
import { regionalRoutes } from '@/lib/regional-routes'

const searchCopy = {
  "es": [
    "Qué hacer y dónde pasear en Uruguay",
    "Itinerarios y escapadas en Uruguay: vino, quesos, senderos, áreas protegidas, playas, náutica y fronteras."
  ],
  "en": [
    "Things to do and places to visit in Uruguay",
    "Uruguay itineraries for wine, cheese, hiking, protected areas, beaches, boating and border towns."
  ],
  "pt": [
    "O que fazer e visitar no Uruguai",
    "Roteiros pelo Uruguai de vinhos, queijos, trilhas, áreas protegidas, praias, náutica e fronteiras."
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [title, description] = searchCopy[locale === 'en' || locale === 'pt' ? locale : 'es']
  return pageSeo('/conocer-uruguay', locale, title, description)
}

export default async function ConocerUruguayPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  let routes: Ruta[] = []
  try {
    routes = await sanityFetch<Ruta[]>(rutasQuery, { locale })
  } catch {
    // The regional routes remain available while Sanity is unreachable.
  }

  const existingSlugs = new Set(routes.map(route => route.slug?.current))
  routes = [...routes, ...regionalRoutes(locale).filter(route => !existingSlugs.has(route.slug.current))]

  return (
    <>
      <Nav />
      <ConocerHero />
      <DiscoveryLinks items={[["cafes","Cafés"],["sin-auto","Escapadas sin auto"],["apps-turismo","Apps y experiencias"],["agenda-interior","Agenda del interior"]]} />
      <Suspense fallback={null}>
        <RoutesSection routes={routes} />
      </Suspense>
      <TravelContent locale={locale} />
      <PdfBanner />
      <Footer />
    </>
  )
}
