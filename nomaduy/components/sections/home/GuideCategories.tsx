'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  AirplaneTakeoff,
  IdentificationCard,
  MapPin,
  House,
  Laptop,
  CurrencyDollar,
  FirstAid,
  Bus,
  ForkKnife,
  MaskHappy,
  Tree,
  DiamondsFour,
} from '@phosphor-icons/react'
import AnimateIn from '@/components/ui/AnimateIn'

const categories = [
  { Icon: AirplaneTakeoff, title: 'Primeros pasos y llegada', desc: 'Las primeras 48 horas — SIM, cambio de moneda, banco, apps esenciales.', href: '/guias/primeras-48h' },
  { Icon: IdentificationCard, title: 'Visas y legal', desc: 'Visa turista, permiso nómade digital, residencia — paso a paso, en lenguaje claro.', href: '/guias/legal-visas' },
  { Icon: MapPin, title: 'Barrios', desc: 'Pocitos, Palermo, Ciudad Vieja — encontrá tu rincón en Montevideo.', href: '/guias/barrios-montevideo' },
  { Icon: House, title: 'Housing y alquiler', desc: 'Cómo encontrar depto, contratos en español, precios actualizados.', href: '/guias/encontrar-apartamento' },
  { Icon: Laptop, title: 'Trabajo y coworking', desc: 'Los mejores coworkings y cafés donde realmente podés trabajar.', href: '/guias' },
  { Icon: CurrencyDollar, title: 'Costo de vida', desc: 'Presupuestos reales, estrategia USD vs. peso, ventajas impositivas.', href: '/guias' },
  { Icon: FirstAid, title: 'Salud y bienestar', desc: 'Mutualistas, seguro internacional, farmacias y médicos recomendados.', href: '/guias/salud-mutualistas' },
  { Icon: Bus, title: 'Transporte', desc: 'STM, Uber, viajes intercity, cómo llegar a Punta del Este.', href: '/guias/moverse-uruguay' },
  { Icon: ForkKnife, title: 'Comida y restaurantes', desc: 'Del chivito a las parrillas escondidas — la guía definitiva de food.', href: '/guias/gastronomia-uruguaya' },
  { Icon: MaskHappy, title: 'Cultura e idioma', desc: 'Mate, carnaval, tango, rioplatense y cómo encajar con los locales.', href: '/guias/cultura-uruguay' },
  { Icon: Tree, title: 'Parques y naturaleza', desc: 'La Rambla, Parque Rodó y escapadas de naturaleza desde la ciudad.', href: '/guias' },
  { Icon: DiamondsFour, title: 'Gemas escondidas', desc: 'Cabo Polonio, Punta del Diablo, Salto — lo que los turistas no ven.', href: '/guias' },
]

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22 } as object,
  },
}

export default function GuideCategories() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <section className="categories" id="categories">
      <div className="section-header">
        <AnimateIn direction="reveal">
          <h2>Todo lo que necesitás, organizado.</h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <p>Dieciséis secciones con guías en profundidad sobre cada aspecto de vivir en Uruguay.</p>
          <a href="/guias" className="section-header-cta">Ver toda la guía →</a>
        </AnimateIn>
      </div>

      <motion.div
        ref={gridRef}
        className="categories-grid"
        variants={gridVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {categories.map((cat) => (
          <motion.div key={cat.title} variants={cardVariants}>
            <Link href={cat.href} className="cat-card cat-card-animated">
              <span className="cat-icon cat-icon-blue">
                <cat.Icon size={30} weight="light" />
              </span>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
              <div className="cat-arrow">Explorar →</div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
