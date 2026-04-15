import Nav from '@/components/layout/Nav'
import VivirHeader from '@/components/sections/vivir/VivirHeader'
import DirectoryAccordion from '@/components/sections/vivir/DirectoryAccordion'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Vivir en Uruguay — NomadUY',
  description: 'Directorio verificado de coworkings, coliving, médicos y servicios en Uruguay.',
}

export default function VivirPage() {
  return (
    <>
      <Nav />
      <VivirHeader />
      <DirectoryAccordion />
      <Footer />
    </>
  )
}
