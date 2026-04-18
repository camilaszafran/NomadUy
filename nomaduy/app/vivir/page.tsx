import Nav from '@/components/layout/Nav'
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

export default async function VivirPage() {
  const places = await sanityFetch<Place[]>(placesQuery)

  return (
    <>
      <Nav />
      <header className="page-header page-header-blue">
        <div className="page-header-inner">
          <div className="page-label">Dónde vivir</div>
          <h1>Vivir en Uruguay</h1>
          <p>Uruguay tiene mucho más que Montevideo. Encontrá el lugar que encaja con tu ritmo, presupuesto y forma de vida.</p>
        </div>
      </header>
      <PlaceMatcher places={places} />
      <PdfBanner />
      <Footer />
    </>
  )
}
