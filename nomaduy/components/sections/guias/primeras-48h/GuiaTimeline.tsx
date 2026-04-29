import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { localizeHref } from '@/lib/locale'
import {
  DeviceMobile,
  CurrencyDollar,
  Car,
  CreditCard,
  Buildings,
  IdentificationCard,
  FirstAid,
  Globe,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'

const iconMap: Record<string, Icon> = {
  DeviceMobile,
  CurrencyDollar,
  Car,
  CreditCard,
  Buildings,
  IdentificationCard,
  FirstAid,
  Globe,
}

const phaseIds = ['fase-1', 'fase-2', 'fase-3']

type StepData = {
  num: number
  icon: string
  title: string
  subtitle: string
  priorityLabel: string
  body: string
  tips?: string[]
  infoType?: string
  infoTitle?: string
  infoBody?: string
}

type PhaseData = {
  badgeNum: string
  badgeColor: string
  time: string
  timeColor: string
  title: string
  steps: StepData[]
}

export default async function GuiaTimeline() {
  const [t, locale] = await Promise.all([getTranslations('guias.primeras48'), getLocale()])
  const phases = t.raw('phases') as PhaseData[]

  return (
    <div className="guide-layout">
      <aside className="guide-toc">
        <div className="toc-label">{t('toc_label')}</div>
        <ul className="toc-list">
          {phases.map((p, i) => (
            <li key={phaseIds[i]} className="toc-item">
              <a href={`#${phaseIds[i]}`}>
                <span className="toc-dot" />
                {p.title}
              </a>
            </li>
          ))}
        </ul>
        <a href={localizeHref('/comunidad', locale)} className="toc-pdf-cta">
          <strong>{t('pdf_cta_title')}</strong>
          <span>{t('pdf_cta_desc')}</span>
        </a>
      </aside>

      <div>
        <div className="guide-content">
          {phases.map((phase, pi) => (
            <section key={phaseIds[pi]} id={phaseIds[pi]} className="timeline-section">
              <div className="phase-header">
                <div className={`phase-badge ${phase.badgeColor}`}>{phase.badgeNum}</div>
                <div className="phase-meta">
                  <div className={`phase-time ${phase.timeColor}`}>{phase.time}</div>
                  <h2>{phase.title}</h2>
                </div>
              </div>
              <div className="steps-list">
                {phase.steps.map((step) => {
                  const StepIcon = iconMap[step.icon] ?? Globe
                  return (
                    <div key={step.num} className="step-card">
                      <div className="step-header">
                        <div className="step-num">{step.num}</div>
                        <div className="step-icon"><StepIcon size={22} weight="thin" /></div>
                        <div className="step-title-group">
                          <div className="step-title">{step.title}</div>
                          <div className="step-subtitle">{step.subtitle}</div>
                        </div>
                        <span className="step-priority priority-now">{step.priorityLabel}</span>
                      </div>
                      <div className="step-body">
                        <p>{step.body}</p>
                        {step.tips && (
                          <div className="step-tips">
                            <div className="step-tips-label">Tips de la comunidad</div>
                            <ul>
                              {step.tips.map((tip) => <li key={tip}>{tip}</li>)}
                            </ul>
                          </div>
                        )}
                        {step.infoType && (
                          <div className={`info-box ${step.infoType}`}>
                            <strong>{step.infoTitle}</strong>
                            <p>{step.infoBody}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="guide-cta-bar">
          <div>
            <h3>{t('footer_title')}</h3>
            <p>{t('footer_desc')}</p>
          </div>
          <div className="cta-bar-actions">
            <Link href={localizeHref('/comunidad', locale)} className="btn-primary">{t('footer_download')}</Link>
            <Link href={localizeHref('/comunidad', locale)} className="btn-ghost">{t('footer_community')}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
