import AnimateIn from '@/components/ui/AnimateIn'
import type { Direction } from '@/components/ui/AnimateIn'

const testimonials = [
  {
    quote: 'Me mudé a Montevideo desde Berlín sin plan. Esta página fue lo primero que guardé. La guía de barrios sola me ahorró semanas de confusión.',
    initial: 'J',
    color: 'var(--blue-pale)',
    textColor: 'var(--blue)',
    name: 'Jonas W.',
    meta: 'Dev remoto · Pocitos',
  },
  {
    quote: 'El grupo de WhatsApp para recién llegados fue un salvavidas. Alguien de la comunidad me ayudó a encontrar departamento en 3 días.',
    initial: 'M',
    color: 'var(--green-pale)',
    textColor: 'var(--green)',
    name: 'Mariana C.',
    meta: 'Expat · Punta Carretas',
  },
  {
    quote: 'Por fin una guía que no trata a Uruguay como algo de paso. La sección de visas es la explicación más clara que encontré en internet.',
    initial: 'R',
    color: 'rgba(212,146,42,0.12)',
    textColor: 'var(--gold)',
    name: 'Rachel T.',
    meta: 'Nómade · 3 meses en Montevideo',
  },
]

// Alternating approach directions for a dynamic wave feel
const directions: Direction[] = ['left', 'up', 'right']

export default function Testimonials() {
  return (
    <section className="testimonials">
      <AnimateIn direction="reveal">
        <h2>De personas como vos</h2>
      </AnimateIn>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <AnimateIn key={t.name} delay={i * 0.14} direction={directions[i]}>
            <div className="testi-card" style={{ height: '100%' }}>
              <p className="testi-quote">{t.quote}&rdquo;</p>
              <div className="testi-author">
                <div
                  className="testi-avatar"
                  style={{ background: t.color, color: t.textColor }}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-meta">{t.meta}</div>
                </div>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
