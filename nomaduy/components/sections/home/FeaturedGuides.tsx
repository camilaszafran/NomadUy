'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import AnimateIn from '@/components/ui/AnimateIn'

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 240, damping: 22 } as object,
  },
}

const guides = [
  {
    href: '/guias#primeros-pasos',
    img: '/images/guides/arrival.jpg',
    tag: 'Llegada',
    tagClass: 'tag-arrival',
    title: 'Tus primeras 48 horas en Uruguay — el checklist completo',
    desc: 'Desde el aeropuerto hasta tu primer apartamento. Paso a paso, con links a cada recurso.',
  },
  {
    href: '/guias#gemas-escondidas',
    img: '/images/guides/gems.jpg',
    tag: 'Gemas',
    tagClass: 'tag-gems',
    title: '10 lugares de Uruguay que la mayoría de extranjeros nunca conoce',
    desc: 'Cabo Polonio, la Quebrada de los Cuervos, y más.',
  },
  {
    href: '/guias#comida',
    img: '/images/guides/food.jpg',
    tag: 'Comida',
    tagClass: 'tag-food',
    title: 'Los 15 platos que tenés que comer antes de irte de Uruguay',
    desc: 'Chivito, torta frita y el asado más largo del mundo.',
  },
]

export default function FeaturedGuides() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <section className="featured">
      <div className="section-header">
        <AnimateIn direction="reveal">
          <h2>Las guías más leídas</h2>
        </AnimateIn>
      </div>

      <motion.div
        ref={gridRef}
        className="featured-grid"
        variants={gridVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {guides.map((g) => (
          <motion.a
            key={g.href}
            href={g.href}
            className="feat-card"
            variants={cardVariants}
          >
            <div className="feat-card-img">
              <Image
                src={g.img}
                alt={g.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="feat-card-body">
              <span className={`feat-tag ${g.tagClass}`}>{g.tag}</span>
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
