import Nav from '@/components/layout/Nav'
import GuiasHeader from '@/components/sections/guias/GuiasHeader'
import GuiasGrid from '@/components/sections/guias/GuiasGrid'
import PdfBanner from '@/components/sections/home/PdfBanner'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Guías — NomadUY',
  description: 'Guías claras y prácticas sobre vivir en Uruguay — escritas por gente que lo vivió.',
}

export default function GuiasPage() {
  return (
    <>
      <Nav />
      <GuiasHeader />
      <GuiasGrid />
      <PdfBanner />
      <Footer />
    </>
  )
}
