import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import PageSubtitle from '@/components/ui/PageSubtitle'
import Footer from '@/components/layout/Footer'
import CommunityBanner from '@/components/sections/home/CommunityBanner'
import PlaceMatcher from '@/components/sections/vivir/PlaceMatcher'
import PdfBanner from '@/components/sections/home/PdfBanner'
import { sanityFetch, placesQuery } from '@/lib/sanity'
import type { Place } from '@/types/place'

export const metadata = {
  title: 'Vivir en Uruguay — NomadUY',
  description: 'Encontrá tu lugar ideal en Uruguay según tu estilo de vida y presupuesto.',
}

export default async function VivirPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [places, t] = await Promise.all([
    sanityFetch<Place[]>(placesQuery),
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
      <PdfBanner />
      <Footer />
    </>
  )
}
