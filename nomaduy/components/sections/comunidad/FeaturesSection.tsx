'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ChatTeardropText, CalendarBlank, ChatCircle,
  MapTrifold, DownloadSimple, EnvelopeSimple,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

const features: { Icon: Icon; badge: string; title: string; desc: string; items: string[] }[] = [
  {
    Icon: ChatTeardropText, badge: 'Gratis', title: 'Grupos de WhatsApp',
    desc: 'Acceso inmediato a grupos temáticos: housing, trabajo, legal y newcomers.',
    items: ['Grupo general de newcomers', 'Housing & alojamiento', 'Trabajo remoto & freelance', 'Legal & trámites'],
  },
  {
    Icon: CalendarBlank, badge: 'Mensual', title: 'Eventos presenciales',
    desc: 'Primer jueves de cada mes en Montevideo. El evento que construye comunidad real.',
    items: ['Venues rotativos en Pocitos y Palermo', 'Promedio 40–60 personas', 'Networking + drinks'],
  },
  {
    Icon: ChatCircle, badge: 'Comunidad', title: 'Foro de preguntas',
    desc: 'Un espacio para preguntar y compartir experiencias sobre vivir en Uruguay.',
    items: ['Trámites y burocracia', 'Barrios y vivienda', 'Búsqueda de compañeros de depto'],
  },
  {
    Icon: MapTrifold, badge: 'Próximamente', title: 'Mapa de miembros',
    desc: 'Mapa interactivo con la comunidad en Uruguay y el mundo.',
    items: ['Ver quién está cerca', 'Conectar antes de llegar', 'Mapa de coworkings y cafés'],
  },
  {
    Icon: DownloadSimple, badge: 'Gratis', title: 'Guía PDF de bienvenida',
    desc: '"Tus primeras 48 horas en Uruguay" — descargable, funciona sin internet.',
    items: ['18 pasos ordenados por prioridad', 'Actualizada cada trimestre', 'En español e inglés'],
  },
  {
    Icon: EnvelopeSimple, badge: 'Newsletter', title: 'Newsletter mensual',
    desc: 'Una vez al mes: novedades legales, eventos y nuevas guías.',
    items: ['Sin spam — solo lo útil', 'Cambios en leyes y trámites', 'Historias de la comunidad'],
  },
]

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.75', 'end 0.25'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="features-section">
      <div className="features-header">
        <div className="section-eyebrow">Lo que incluye</div>
        <h2>Todo lo que viene con unirte</h2>
        <p>Gratis para siempre. Premium más adelante para quien quiera más.</p>
      </div>

      <div className="features-timeline" ref={containerRef}>
        <div className="timeline-track">
          <motion.div className="timeline-fill" style={{ height: lineHeight }} />
        </div>

        {features.map((f, i) => {
          const isLeft = i % 2 === 0
          const isGold = !isLeft
          return (
            <motion.div
              key={f.title}
              className={`timeline-item ${isLeft ? 'timeline-item--left' : 'timeline-item--right'} ${isGold ? 'timeline-item--gold' : 'timeline-item--blue'}`}
              initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-icon"><f.Icon size={20} weight="regular" /></div>
                <div className="timeline-body">
                  <div className="timeline-title-row">
                    <span className="timeline-num">0{i + 1}</span>
                    <h3>{f.title}</h3>
                    <span className="timeline-badge">{f.badge}</span>
                  </div>
                  <p>{f.desc}</p>
                  <ul className="timeline-items">
                    {f.items.map(item => <li key={item}>{item}</li>)}
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
