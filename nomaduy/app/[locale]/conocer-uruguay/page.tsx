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

const searchCopy = {
  "es": [
    "Qué hacer y dónde pasear en Uruguay",
    "Rutas, cafés, turismo rural y escapadas por Uruguay con y sin auto."
  ],
  "en": [
    "Things to do and places to visit in Uruguay",
    "Itineraries, cafés, rural tourism and getaways across Uruguay with or without a car."
  ],
  "pt": [
    "O que fazer e visitar no Uruguai",
    "Roteiros, cafés, turismo rural e passeios pelo Uruguai com ou sem carro."
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
    // Sanity unreachable — page renders with empty state
  }

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
