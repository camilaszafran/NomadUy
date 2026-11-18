import { pageSeo } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import GuiaHero from '@/components/sections/guias/primeras-48h/GuiaHero'
import GuiaTimeline from '@/components/sections/guias/primeras-48h/GuiaTimeline'
import PdfBanner from '@/components/sections/home/PdfBanner'
import Footer from '@/components/layout/Footer'

const searchCopy = {
  "es": [
    "Primeras 48 horas en Uruguay",
    "Qué hacer al llegar a Uruguay: chip y eSIM, dinero, transporte y servicios cerca de tu alojamiento."
  ],
  "en": [
    "Your first 48 hours in Uruguay",
    "What to do on arrival in Uruguay: SIM and eSIM, money, transport and services near your accommodation."
  ],
  "pt": [
    "Primeiras 48 horas no Uruguai",
    "O que fazer ao chegar no Uruguai: chip e eSIM, dinheiro, transporte e serviços perto da hospedagem."
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [title, description] = searchCopy[locale === 'en' || locale === 'pt' ? locale : 'es']
  return pageSeo('/guias/primeras-48h', locale, title, description)
}

export default async function Primeras48hPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Nav />
      <GuiaHero />
      <div className="guide-article-wrap">
        <GuiaTimeline />
      </div>
      <PdfBanner />
      <Footer />
    </>
  )
}
