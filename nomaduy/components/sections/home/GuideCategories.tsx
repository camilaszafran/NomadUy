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
import type { Icon } from '@phosphor-icons/react'
import { useTranslations, useLocale } from 'next-intl'
import { localizeHref } from '@/lib/locale'
import AnimateIn from '@/components/ui/AnimateIn'

const categoryMeta: { Icon: Icon; href: string }[] = [
  { Icon: AirplaneTakeoff, href: '/guias/primeras-48h' },
  { Icon: IdentificationCard, href: '/guias/legal-visas' },
  { Icon: MapPin, href: '/guias/barrios-montevideo' },
  { Icon: House, href: '/guias/encontrar-apartamento' },
  { Icon: Laptop, href: '/guias' },
  { Icon: CurrencyDollar, href: '/guias' },
  { Icon: FirstAid, href: '/guias/salud-mutualistas' },
  { Icon: Bus, href: '/guias/moverse-uruguay' },
  { Icon: ForkKnife, href: '/guias/gastronomia-uruguaya' },
  { Icon: MaskHappy, href: '/guias/cultura-uruguay' },
  { Icon: Tree, href: '/guias' },
  { Icon: DiamondsFour, href: '/guias' },
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
  const t = useTranslations('home.categories')
  const locale = useLocale()

  const items = t.raw('items') as { title: string; desc: string }[]

  return (
    <section className="categories" id="categories">
      <div className="section-header">
        <AnimateIn direction="reveal">
          <h2>{t('title')}</h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <p>{t('desc')}</p>
          <a href={localizeHref('/guias', locale)} className="section-header-cta">{t('cta')}</a>
        </AnimateIn>
      </div>

      <motion.div
        ref={gridRef}
        className="categories-grid"
        variants={gridVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {items.map((cat, i) => {
          const meta = categoryMeta[i]
          return (
            <motion.div key={i} variants={cardVariants}>
              <Link href={localizeHref(meta.href, locale)} className="cat-card cat-card-animated">
                <span className="cat-icon cat-icon-blue">
                  <meta.Icon size={30} weight="light" />
                </span>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <div className="cat-arrow">{t('explore')}</div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
