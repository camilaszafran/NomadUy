'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { localizeHref } from '@/lib/locale'
import AnimateIn from '@/components/ui/AnimateIn'

const routeImages = [
  { img: '/images/routes/surf.jpg.avif', href: '/conocer-uruguay?ruta=punta-del-diablo' },
  { img: '/images/routes/historia.jpg',  href: '/conocer-uruguay?ruta=colonia-del-sacramento' },
  { img: '/images/routes/temas.jpg',     href: '/conocer-uruguay?ruta=termas-de-salto' },
  { img: '/images/routes/wildlife.webp', href: '/conocer-uruguay?ruta=cabo-polonio' },
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
  const t = useTranslations('home.explore')
  const locale = useLocale()

  const items = t.raw('items') as { title: string; desc: string; tag: string }[]

  return (
    <section className="categories explore-section">
      <div className="section-header">
        <AnimateIn direction="reveal">
          <h2>{t('title')}</h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <p>{t('subtitle')}</p>
          <a href={localizeHref('/conocer-uruguay', locale)} className="section-header-cta">{t('cta')}</a>
        </AnimateIn>
      </div>

      <motion.div
        ref={gridRef}
        className="routes-photo-grid"
        variants={gridVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {items.map((route, i) => (
          <motion.a
            key={i}
            href={localizeHref(routeImages[i].href, locale)}
            className="route-photo-card"
            variants={cardVariants}
          >
            <div className="route-photo-img">
              <Image
                src={routeImages[i].img}
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
                <span className="route-photo-cta">{t('see_route')}</span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
