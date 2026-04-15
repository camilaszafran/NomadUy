import Nav from '@/components/layout/Nav'
import GuiaHero from '@/components/sections/guias/primeras-48h/GuiaHero'
import GuiaTimeline from '@/components/sections/guias/primeras-48h/GuiaTimeline'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Primeras 48 horas en Uruguay — NomadUY',
  description: '18 pasos ordenados por prioridad para tus primeras 48 horas en Uruguay.',
}

export default function Primeras48hPage() {
  return (
    <>
      <Nav />
      <GuiaHero />
      <GuiaTimeline />
      <Footer />
    </>
  )
}
