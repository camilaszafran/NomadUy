import { pageSeo } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import { CreatorContent, WorkContent } from '@/components/sections/discover/Content'
import Nav from '@/components/layout/Nav'
import RecursosHeader from '@/components/sections/recursos/RecursosHeader'
import CostCalculator from '@/components/sections/recursos/CostCalculator'
import ExternalLinks from '@/components/sections/recursos/ExternalLinks'
import PdfBanner from '@/components/sections/home/PdfBanner'
import Footer from '@/components/layout/Footer'

const searchCopy = {
  "es": [
    "Recursos para instalarte en Uruguay",
    "Calculadora de costo de vida, trámites, espacios de coworking y apoyo para emprender en Uruguay."
  ],
  "en": [
    "Resources for settling in Uruguay",
    "Cost of living calculator, paperwork, coworking spaces and startup support in Uruguay."
  ],
  "pt": [
    "Recursos para se instalar no Uruguai",
    "Calculadora de custo de vida, documentação, espaços de coworking e apoio para empreender no Uruguai."
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [title, description] = searchCopy[locale === 'en' || locale === 'pt' ? locale : 'es']
  return pageSeo('/recursos', locale, title, description)
}

export default async function RecursosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Nav />
      <RecursosHeader />
      <main>
      <CostCalculator />
      <ExternalLinks />
      <WorkContent locale={locale} />
      <CreatorContent />
      </main>
      <PdfBanner />
      <Footer />
    </>
  )
}
