import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import RecursosHeader from '@/components/sections/recursos/RecursosHeader'
import CostCalculator from '@/components/sections/recursos/CostCalculator'
import ExternalLinks from '@/components/sections/recursos/ExternalLinks'
import PdfBanner from '@/components/sections/home/PdfBanner'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Recursos — NomadUY',
  description: 'Calculadora de costo de vida, checklists y herramientas para planear tu vida en Uruguay.',
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
      <CostCalculator />
      <ExternalLinks />
      <PdfBanner />
      <Footer />
    </>
  )
}
