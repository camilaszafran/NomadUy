'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { localizeHref } from '@/lib/locale'

const barKeys = ['bar_rent', 'bar_food', 'bar_transport', 'bar_ocio', 'bar_health', 'bar_varios'] as const
const barColors = ['#1A4B8C', '#2E7D52', '#C8940F', '#7B3F8A', '#C0392B', '#5B5B7A']
const barPcts   = [43, 25, 5, 9, 6, 12]

export default function ResourcesPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t = useTranslations('home.resources')
  const locale = useLocale()

  return (
    <section className="resources-preview-section" ref={ref}>
      <motion.div
        className="resources-preview-text"
        initial={{ opacity: 0, x: -28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2>{t('title')}</h2>
        <p>{t('desc')}</p>
        <a href={localizeHref('/recursos', locale)} className="btn-resources">{t('cta')}</a>
      </motion.div>

      <motion.div
        className="resources-preview-card"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="rp-card-header">
          <span className="rp-card-label">{t('card_label')}</span>
          <motion.span
            className="rp-card-total"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {t('card_total')}
          </motion.span>
          <span className="rp-card-sub">{t('card_sub')}</span>
        </div>
        <div className="rp-bars">
          {barKeys.map((key, i) => (
            <div key={key} className="rp-bar-row">
              <span className="rp-bar-label">{t(key)}</span>
              <div className="rp-bar-bg">
                <motion.div
                  className="rp-bar-fill"
                  style={{ background: barColors[i] }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${barPcts[i]}%` } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                />
              </div>
              <span className="rp-bar-pct">{barPcts[i]}%</span>
            </div>
          ))}
        </div>
        <div className="rp-card-footer">
          <span>{t('external_count')}</span>
          <a href={localizeHref('/recursos', locale)} className="rp-card-cta">{t('open_calc')}</a>
        </div>
      </motion.div>
    </section>
  )
}
