import Nav from '@/components/layout/Nav'
import ConocerHero from '@/components/sections/conocer-uruguay/ConocerHero'
import RoutesSection from '@/components/sections/conocer-uruguay/RoutesSection'
import PdfBanner from '@/components/sections/home/PdfBanner'
import Footer from '@/components/layout/Footer'
import { sanityFetch, rutasQuery } from '@/lib/sanity'
import type { Ruta } from '@/types'

export const metadata = {
  title: 'Conocer Uruguay — NomadUY',
  description: 'Rutas y destinos en Uruguay diseñados por personas que viven acá.',
}

export default async function ConocerUruguayPage() {
  let routes: Ruta[] = []
  try {
    routes = await sanityFetch<Ruta[]>(rutasQuery)
  } catch {
    // Sanity unreachable — page renders with empty state
  }

  return (
    <>
      <Nav />
      <ConocerHero />
      <RoutesSection routes={routes} />
      <PdfBanner />
      <Footer />
    </>
  )
}
