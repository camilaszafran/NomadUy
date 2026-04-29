'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ChatTeardropText, CalendarBlank, ChatCircle,
  MapTrifold, DownloadSimple, EnvelopeSimple,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

const featureIcons: Icon[] = [
  ChatTeardropText, CalendarBlank, ChatCircle,
  MapTrifold, DownloadSimple, EnvelopeSimple,
]

const featureKeys = [
  { title: 'feature_whatsapp_title', desc: 'feature_whatsapp_desc', items: 'feature_whatsapp_items', badge: 'badge_free' },
  { title: 'feature_events_title',   desc: 'feature_events_desc',   items: 'feature_events_items',   badge: 'badge_monthly' },
  { title: 'feature_forum_title',    desc: 'feature_forum_desc',    items: 'feature_forum_items',    badge: 'badge_community' },
  { title: 'feature_map_title',      desc: 'feature_map_desc',      items: 'feature_map_items',      badge: 'badge_coming_soon' },
  { title: 'feature_pdf_title',      desc: 'feature_pdf_desc',      items: 'feature_pdf_items',      badge: 'badge_free' },
  { title: 'feature_newsletter_title', desc: 'feature_newsletter_desc', items: 'feature_newsletter_items', badge: 'badge_newsletter' },
] as const

export default function FeaturesSection() {
  const t = useTranslations('comunidad')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.75', 'end 0.25'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="features-section">
      <div className="features-header">
        <div className="section-eyebrow">{t('features_eyebrow')}</div>
        <h2>{t('features_heading')}</h2>
        <p>{t('features_desc')}</p>
      </div>

      <div className="features-timeline" ref={containerRef}>
        <div className="timeline-track">
          <motion.div className="timeline-fill" style={{ height: lineHeight }} />
        </div>

        {featureKeys.map((keys, i) => {
          const FIcon = featureIcons[i]
          const isLeft = i % 2 === 0
          const isGold = !isLeft
          const items = t.raw(keys.items) as string[]

          return (
            <motion.div
              key={keys.title}
              className={`timeline-item ${isLeft ? 'timeline-item--left' : 'timeline-item--right'} ${isGold ? 'timeline-item--gold' : 'timeline-item--blue'}`}
              initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-icon"><FIcon size={20} weight="regular" /></div>
                <div className="timeline-body">
                  <div className="timeline-title-row">
                    <span className="timeline-num">0{i + 1}</span>
                    <h3>{t(keys.title)}</h3>
                    <span className="timeline-badge">{t(keys.badge)}</span>
                  </div>
                  <p>{t(keys.desc)}</p>
                  <ul className="timeline-items">
                    {items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
