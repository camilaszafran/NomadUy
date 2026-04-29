import { getTranslations } from 'next-intl/server'
import AnimateIn from '@/components/ui/AnimateIn'
import type { Direction } from '@/components/ui/AnimateIn'

const cards = [
  { initial: 'J', color: 'var(--blue-pale)',            textColor: 'var(--blue)'  },
  { initial: 'M', color: 'var(--green-pale)',           textColor: 'var(--green)' },
  { initial: 'R', color: 'rgba(212,146,42,0.12)',       textColor: 'var(--gold)'  },
] as const

const directions: Direction[] = ['left', 'up', 'right']

export default async function Testimonials() {
  const t = await getTranslations('home.testimonials')

  return (
    <section className="testimonials">
      <AnimateIn direction="reveal">
        <h2>{t('title')}</h2>
      </AnimateIn>

      <div className="testimonials-grid">
        {cards.map((card, i) => {
          const n = (i + 1) as 1 | 2 | 3
          return (
            <AnimateIn key={n} delay={i * 0.14} direction={directions[i]}>
              <div className="testi-card" style={{ height: '100%' }}>
                <p className="testi-quote">{t(`q${n}`)}&rdquo;</p>
                <div className="testi-author">
                  <div
                    className="testi-avatar"
                    style={{ background: card.color, color: card.textColor }}
                  >
                    {card.initial}
                  </div>
                  <div>
                    <div className="testi-name">{t(`name${n}`)}</div>
                    <div className="testi-meta">{t(`meta${n}`)}</div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          )
        })}
      </div>
    </section>
  )
}
