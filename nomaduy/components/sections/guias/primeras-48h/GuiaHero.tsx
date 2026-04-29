import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { localizeHref } from '@/lib/locale'

export default async function GuiaHero() {
  const [t, locale] = await Promise.all([getTranslations('guias.primeras48'), getLocale()])

  const checks = [
    { done: true,  key: 'check_1' },
    { done: true,  key: 'check_2' },
    { done: false, key: 'check_3',  num: '3' },
    { done: false, key: 'check_4',  num: '4' },
    { done: false, key: 'check_5',  num: '5' },
  ] as const

  return (
    <div className="guia-page-hero">
      <div className="guia-hero-inner">
        <div>
          <div className="guia-breadcrumb">
            <Link href={localizeHref('/guias', locale)} style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('breadcrumb_label')}
            </Link>
            <span>›</span> {t('breadcrumb_current')}
          </div>
          <h1>{t('h1')}</h1>
          <p>{t('subtitle')}</p>
          <div className="hero-tags">
            <span className="hero-tag">{t('tag_airport')}</span>
            <span className="hero-tag">{t('tag_steps')}</span>
            <span className="hero-tag">{t('tag_time')}</span>
          </div>
        </div>
        <div className="hero-checklist-card">
          <div className="checklist-stat">
            <strong>{t('stat_count')}</strong>
            <span>{t('stat_label')}</span>
          </div>
          <div className="mini-checklist">
            {checks.map((item) => (
              <div key={item.key} className="mini-check-item">
                <div className={`mini-check-dot${item.done ? ' done' : ''}`}>
                  {item.done ? '✓' : item.num}
                </div>
                <span>{t(item.key)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
