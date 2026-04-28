'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import AnimateIn from '@/components/ui/AnimateIn'

const routes = [
  {
    img: '/images/routes/surf.jpg.avif',
    title: 'Surf & Costa',
    desc: 'Punta del Este, La Pedrera, Cabo Polonio y Punta del Diablo.',
    tag: 'Atlántico',
    href: '/conocer-uruguay?ruta=punta-del-diablo',
  },
  {
    img: '/images/routes/historia.jpg',
    title: 'Historia & Patrimonio',
    desc: 'Colonia del Sacramento, Fray Bentos y los secretos del litoral oeste.',
    tag: 'Cultura',
    href: '/conocer-uruguay?ruta=colonia-del-sacramento',
  },
  {
    img: '/images/routes/temas.jpg',
    title: 'Termas del norte',
    desc: 'Salto, Paysandú y las termas naturales más accesibles de la región.',
    tag: 'Relax',
    href: '/conocer-uruguay?ruta=termas-de-salto',
  },
  {
    img: '/images/routes/wildlife.webp',
    title: 'Wildlife & Naturaleza',
    desc: 'Cabo Polonio, lobos marinos, pingüinos y el cielo más estrellado.',
    tag: 'Naturaleza',
    href: '/conocer-uruguay?ruta=cabo-polonio',
  },
]

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 24 } as object,
  },
}

export default function ExploreUruguay() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <section className="categories explore-section">
      <div className="section-header">
        <AnimateIn direction="reveal">
          <h2>Conocer Uruguay</h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <p>Rutas de viaje por interés y duración — del fin de semana a la inmersión profunda.</p>
          <a href="/conocer-uruguay" className="section-header-cta">Ver todas las rutas →</a>
        </AnimateIn>
      </div>

      <motion.div
        ref={gridRef}
        className="routes-photo-grid"
        variants={gridVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {routes.map((route) => (
          <motion.a
            key={route.title}
            href={route.href}
            className="route-photo-card"
            variants={cardVariants}
          >
            <div className="route-photo-img">
              <Image
                src={route.img}
                alt={route.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="route-photo-overlay" />
              <div className="route-photo-content">
                <span className="route-photo-tag">{route.tag}</span>
                <h3>{route.title}</h3>
                <p>{route.desc}</p>
                <span className="route-photo-cta">Ver ruta →</span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
