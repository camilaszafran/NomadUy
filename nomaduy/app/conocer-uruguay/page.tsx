import Nav from '@/components/layout/Nav'
import ConocerHero from '@/components/sections/conocer-uruguay/ConocerHero'
import RoutesSection from '@/components/sections/conocer-uruguay/RoutesSection'
import PdfBanner from '@/components/sections/home/PdfBanner'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Conocer Uruguay — NomadUY',
  description: 'Rutas y destinos en Uruguay diseñados por personas que viven acá.',
}

export default function ConocerUruguayPage() {
  return (
    <>
      <Nav />
      <ConocerHero />
      <RoutesSection />
      <PdfBanner />
      <Footer />
    </>
  )
}
