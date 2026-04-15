import Nav from '@/components/layout/Nav'
import RecursosHeader from '@/components/sections/recursos/RecursosHeader'
import CostCalculator from '@/components/sections/recursos/CostCalculator'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Recursos — NomadUY',
  description: 'Calculadora de costo de vida, checklists y herramientas para planear tu vida en Uruguay.',
}

export default function RecursosPage() {
  return (
    <>
      <Nav />
      <RecursosHeader />
      <CostCalculator />
      <Footer />
    </>
  )
}
