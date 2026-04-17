import { Calculator, CheckSquare, Scroll, DeviceMobile } from '@phosphor-icons/react/dist/ssr'
import AnimateIn from '@/components/ui/AnimateIn'

const resources = [
  { Icon: Calculator, title: 'Calculadora de costo de vida', desc: 'Ajustá sliders a tu estilo de vida — Budget, Cómodo o Expat. Resultado en USD o UYU.', cta: 'Abrir calculadora →' },
  { Icon: CheckSquare, title: 'Checklist: Primeras 48h', desc: '18 pasos esenciales al llegar. Descargable en PDF, gratis para miembros.', cta: 'Descargar →' },
  { Icon: Scroll, title: 'Trámites & Residencia', desc: 'Cédula, permiso nómada digital y residencia — en lenguaje claro, sin abogado.', cta: 'Ver guía →' },
  { Icon: DeviceMobile, title: 'Apps esenciales', desc: 'MiUruguay, STM, Pedidos Ya y las 12 apps que todo nómada necesita al llegar.', cta: 'Ver lista →' },
]

export default function ResourcesPreview() {
  return (
    <section className="categories" style={{ background: 'var(--surface)' }}>
      <div className="section-header">
        <AnimateIn direction="reveal">
          <h2>Recursos & Calculadoras</h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <p>Números reales, checklists descargables y links directos a lo que necesitás.</p>
          <a href="/recursos" className="section-header-cta">Ver todos los recursos →</a>
        </AnimateIn>
      </div>

      <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {resources.map((r, i) => (
          <AnimateIn key={r.title} delay={i * 0.1} direction="scale">
            <a href="/recursos" className="cat-card cat-card-animated" style={{ display: 'block' }}>
              <span className="cat-icon cat-icon-gold">
                <r.Icon size={26} weight="light" />
              </span>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <div className="cat-arrow">{r.cta}</div>
            </a>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
