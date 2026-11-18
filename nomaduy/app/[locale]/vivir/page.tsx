import { pageSeo } from '@/lib/seo'
import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { StayContent } from '@/components/sections/discover/Content'
import Nav from '@/components/layout/Nav'
import PageSubtitle from '@/components/ui/PageSubtitle'
import Footer from '@/components/layout/Footer'
import CommunityBanner from '@/components/sections/home/CommunityBanner'
import PlaceMatcher from '@/components/sections/vivir/PlaceMatcher'
import PdfBanner from '@/components/sections/home/PdfBanner'
import { allPlaces } from '@/lib/regional-places'

const searchCopy = {
  "es": [
    "Dónde vivir en Uruguay",
    "Explorá ciudades y barrios de Uruguay y encontrá opciones de alojamiento según tu estilo de vida."
  ],
  "en": [
    "Where to live in Uruguay",
    "Explore cities and neighbourhoods in Uruguay and find accommodation options for your lifestyle."
  ],
  "pt": [
    "Onde morar no Uruguai",
    "Explore cidades e bairros do Uruguai e encontre opções de hospedagem para o seu estilo de vida."
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [title, description] = searchCopy[locale === 'en' || locale === 'pt' ? locale : 'es']
  return pageSeo('/vivir', locale, title, description)
}

export default async function VivirPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [places, t] = await Promise.all([
    allPlaces(locale),
    getTranslations('vivir'),
  ])

  return (
    <>
      <Nav />
      <header className="page-header page-header-blue">
        <div className="page-header-inner">
          <div className="page-label">{t('label')}</div>
          <h1>{t('heading')}</h1>
          <PageSubtitle>{t('subtitle')}</PageSubtitle>
        </div>
      </header>
      <Suspense>
        <PlaceMatcher places={places} />
      </Suspense>
      <StayContent />
      <PdfBanner />
      <Footer />
    </>
  )
}
