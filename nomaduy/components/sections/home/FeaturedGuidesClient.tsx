'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  AirplaneTakeoff, Scales, MapPin, Bus, FirstAid,
  Bank, Laptop, UsersThree, ChatTeardropText,
  House, Heart, MapTrifold,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

const _client = createClient({ projectId: 'ohjste83', dataset: 'production', apiVersion: '2024-01-01', useCdn: true })
const _builder = createImageUrlBuilder(_client)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const urlFor = (source: any) => _builder.image(source)
import type { GuideCard } from '@/types'

const iconMap: Record<string, Icon> = {
  airplane:     AirplaneTakeoff,
  scales:       Scales,
  mapPin:       MapPin,
  bus:          Bus,
  firstAid:     FirstAid,
  bank:         Bank,
  laptop:       Laptop,
  usersThree:   UsersThree,
  chatTeardrop: ChatTeardropText,
  house:        House,
  heart:        Heart,
  map:          MapTrifold,
}

const categoryColors: Record<string, string> = {
  llegada:  'linear-gradient(135deg, #1B4F8A 0%, #2E6FB4 100%)',
  legal:    'linear-gradient(135deg, #2E7D52 0%, #3a9966 100%)',
  vivienda: 'linear-gradient(135deg, #D4922A 0%, #e8a93d 100%)',
  trabajo:  'linear-gradient(135deg, #1B4F8A 0%, #5b7fa8 100%)',
  moverse:  'linear-gradient(135deg, #2E7D52 0%, #4aaa78 100%)',
  salud:    'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)',
  familia:  'linear-gradient(135deg, #8e44ad 0%, #a855c9 100%)',
  finanzas: 'linear-gradient(135deg, #16a085 0%, #1abc9c 100%)',
  idioma:   'linear-gradient(135deg, #D4922A 0%, #c0872a 100%)',
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 240, damping: 22 } as object,
  },
}

type Props = { guides: GuideCard[] }

export default function FeaturedGuidesClient({ guides }: Props) {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <section className="featured">
      <div className="section-header">
        <h2>Las guías más leídas</h2>
      </div>

      <motion.div
        ref={gridRef}
        className="featured-grid"
        variants={gridVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {guides.map((g) => {
          const href = `/guias/${g.slug.current}`
          const GIcon = iconMap[g.icon] ?? Laptop
          const bg = categoryColors[g.category] ?? categoryColors.llegada

          return (
            <motion.div key={g._id} variants={cardVariants}>
              <Link href={href} className="feat-card">
                <div className="feat-card-img">
                  {g.coverImage ? (
                    <Image
                      src={urlFor(g.coverImage).width(600).height(340).url()}
                      alt={g.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="feat-card-placeholder" style={{ background: bg }}>
                      <GIcon size={48} weight="thin" color="rgba(255,255,255,0.85)" />
                    </div>
                  )}
                </div>
                <div className="feat-card-body">
                  <span className="feat-tag feat-tag-category">
                    {g.tags?.[0] ?? g.category}
                  </span>
                  <h3>{g.title}</h3>
                  <p>{g.summary}</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="featured-cta">
        <Link href="/guias" className="featured-cta-btn">
          Ver todas las guías →
        </Link>
      </div>
    </section>
  )
}
