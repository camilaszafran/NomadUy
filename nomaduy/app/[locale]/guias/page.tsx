import { pageSeo } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import GuiasHeader from '@/components/sections/guias/GuiasHeader'
import GuiasGrid from '@/components/sections/guias/GuiasGrid'
import PdfBanner from '@/components/sections/home/PdfBanner'
import Footer from '@/components/layout/Footer'

const searchCopy = {
  "es": [
    "Guías prácticas para vivir en Uruguay",
    "Consultá las guías de llegada, residencia, alquiler, transporte, salud y cultura uruguaya."
  ],
  "en": [
    "Practical guides to living in Uruguay",
    "Browse guides to arrival, residency, renting, transport, healthcare and Uruguayan culture."
  ],
  "pt": [
    "Guias práticos para morar no Uruguai",
    "Consulte guias de chegada, residência, aluguel, transporte, saúde e cultura uruguaia."
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [title, description] = searchCopy[locale === 'en' || locale === 'pt' ? locale : 'es']
  return pageSeo('/guias', locale, title, description)
}

export default async function GuiasPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Nav />
      <GuiasHeader />
      <GuiasGrid locale={locale} />
      <PdfBanner />
      <Footer />
    </>
  )
}
