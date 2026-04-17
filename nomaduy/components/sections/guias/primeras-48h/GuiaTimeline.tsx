import Link from 'next/link'
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

type Step = {
  num: number
  Icon: Icon
  title: string
  subtitle: string
  priority: string
  priorityLabel: string
  body: string
  tips?: string[]
  info?: { type: string; title: string; body: string }
}

type Phase = {
  id: string
  badgeNum: string
  badgeColor: string
  time: string
  timeColor: string
  title: string
  steps: Step[]
}

const phases: Phase[] = [
  {
    id: 'fase-1',
    badgeNum: '1', badgeColor: 'blue',
    time: 'Primeras 2 horas — Al aterrizar', timeColor: 'blue',
    title: 'En el aeropuerto',
    steps: [
      {
        num: 1, Icon: DeviceMobile, title: 'Comprá una SIM card', subtitle: 'Antel o Claro — en el mismo aeropuerto',
        priority: 'priority-now', priorityLabel: 'Ahora',
        body: 'Hay locales de Antel y Claro en la zona de llegadas. Un plan de 30 días con datos ilimitados cuesta entre $400–600 UYU (~$10–15 USD).',
        tips: ['Pedí plan con datos, no solo voz', 'Antel tiene mejor cobertura en interior', 'Llevá efectivo — no siempre aceptan tarjeta'],
      },
      {
        num: 2, Icon: CurrencyDollar, title: 'Cambiá dinero', subtitle: 'Casa de cambio en Carrasco',
        priority: 'priority-now', priorityLabel: 'Ahora',
        body: 'Hay una casa de cambio en el aeropuerto. El tipo de cambio no es el mejor, pero cambiá lo suficiente para el taxi y los primeros días (~$100 USD).',
        tips: ['Tasa aeropuerto es 5–8% peor que en ciudad', 'Llevar USD es la mejor opción al llegar', 'Los cajeros (ATM) dan pesos — buscar "Scotiabank" o "BROU"'],
      },
      {
        num: 3, Icon: Car, title: 'Transporte al centro', subtitle: 'Taxi, Uber o bus',
        priority: 'priority-now', priorityLabel: 'Ahora',
        body: 'Uber funciona perfecto desde Carrasco. El taxi oficial cuesta ~$1,500 UYU (~$37 USD) al centro/Pocitos. El bus 700 llega a Ciudad Vieja por ~$50 UYU pero tarda 1h30.',
        info: { type: 'blue', title: 'Tip de la comunidad', body: 'Uber es confiable, más barato que taxi y el conductor ya sabe adónde vas. Descargalo antes de aterrizar.' },
      },
    ],
  },
  {
    id: 'fase-2',
    badgeNum: '2', badgeColor: 'gold',
    time: 'Primer día', timeColor: 'gold',
    title: 'Instalarate',
    steps: [
      {
        num: 4, Icon: CreditCard, title: 'Descargá Prex', subtitle: 'Billetera digital uruguaya',
        priority: 'priority-soon', priorityLabel: 'Día 1',
        body: 'Prex es la billetera digital más usada en Uruguay. Podés cargarla con efectivo en cualquier RedPagos, y usarla para pagar en comercios, delivery y servicios.',
        tips: ['Descargá la app y registrate con tu pasaporte', 'Cargala en cualquier RedPagos o Abitab', 'Funciona para pagar Uber, Pedidos Ya, etc.'],
      },
      {
        num: 5, Icon: DeviceMobile, title: 'Instalá las apps esenciales', subtitle: 'Taxi, delivery, mapas',
        priority: 'priority-soon', priorityLabel: 'Día 1',
        body: 'Las apps que vas a usar todos los días en Uruguay:',
        tips: ['Uber — transporte de punto a punto', 'Pedidos Ya — delivery de comida', 'Google Maps — funciona perfecto en Montevideo', 'Urufarma — encontrar farmacias y precios de remedios'],
      },
      {
        num: 6, Icon: Buildings, title: 'Orientate en tu barrio', subtitle: 'Supermercado, farmacia, cajero',
        priority: 'priority-soon', priorityLabel: 'Día 1',
        body: 'Lo primero que necesitás encontrar cerca de tu alojamiento: supermercado (Tienda Inglesa, Disco, Ta-Ta), farmacia, cajero automático y una panadería.',
        info: { type: 'green', title: 'Supermercados principales', body: 'Tienda Inglesa (premium), Disco/Devoto (medio), Ta-Ta (económico). Todos tienen buenos productos y aceptan tarjeta.' },
      },
    ],
  },
  {
    id: 'fase-3',
    badgeNum: '3', badgeColor: 'green',
    time: 'Día 2 — Primeros trámites', timeColor: 'green',
    title: 'Primeros pasos burocráticos',
    steps: [
      {
        num: 7, Icon: IdentificationCard, title: 'Cédula de identidad', subtitle: 'Correo Uruguayo o DNIC',
        priority: 'priority-day2', priorityLabel: 'Día 2+',
        body: 'Si vas a vivir más de 90 días, empezá el trámite de cédula. Necesitás pasaporte y dirección. El trámite se hace en Correo Uruguayo y tarda 2–4 semanas.',
        tips: ['Llevá pasaporte original + fotocopia', 'Necesitás dirección uruguaya (puede ser alojamiento temporal)', 'El costo es ~$700 UYU'],
      },
      {
        num: 8, Icon: FirstAid, title: 'Mutualista o DISSE', subtitle: 'Sistema de salud',
        priority: 'priority-day2', priorityLabel: 'Día 2+',
        body: 'Uruguay tiene un sistema de salud público-privado. Si trabajás de forma dependiente, DISSE te asigna una mutualista. Si sos freelance/nómada, podés contratar una directamente.',
        info: { type: 'gold', title: 'Para nómadas digitales', body: 'Podés contratar una mutualista privada (Médica Uruguaya, CASMU, etc.) por ~$80–120 USD/mes. Cubre médicos, urgencias y estudios básicos.' },
      },
      {
        num: 9, Icon: Globe, title: 'Unirte a NomadUY', subtitle: 'La comunidad que hace más fácil todo esto',
        priority: 'priority-day2', priorityLabel: 'Día 2+',
        body: 'La comunidad de NomadUY tiene grupos de WhatsApp por tema (housing, trabajo, legal, social), un foro de preguntas y respuestas, y eventos mensuales en Montevideo.',
        tips: ['WhatsApp group: acceso inmediato', 'Foro: buscar antes de preguntar', 'Evento mensual: primer jueves de cada mes'],
      },
    ],
  },
]

export default function GuiaTimeline() {
  return (
    <div className="guide-layout">
      <aside className="guide-toc">
        <div className="toc-label">En esta guía</div>
        <ul className="toc-list">
          {phases.map((p) => (
            <li key={p.id} className="toc-item">
              <a href={`#${p.id}`}>
                <span className="toc-dot" />
                {p.title}
              </a>
            </li>
          ))}
        </ul>
        <a href="/comunidad" className="toc-pdf-cta">
          <strong>Descargar PDF</strong>
          <span>Guía completa para llevar</span>
        </a>
      </aside>

      <div>
        <div className="guide-content">
          {phases.map((phase) => (
            <section key={phase.id} id={phase.id} className="timeline-section">
              <div className="phase-header">
                <div className={`phase-badge ${phase.badgeColor}`}>{phase.badgeNum}</div>
                <div className="phase-meta">
                  <div className={`phase-time ${phase.timeColor}`}>{phase.time}</div>
                  <h2>{phase.title}</h2>
                </div>
              </div>
              <div className="steps-list">
                {phase.steps.map((step) => (
                  <div key={step.num} className="step-card">
                    <div className="step-header">
                      <div className="step-num">{step.num}</div>
                      <div className="step-icon"><step.Icon size={22} weight="thin" /></div>
                      <div className="step-title-group">
                        <div className="step-title">{step.title}</div>
                        <div className="step-subtitle">{step.subtitle}</div>
                      </div>
                      <span className={`step-priority ${step.priority}`}>{step.priorityLabel}</span>
                    </div>
                    <div className="step-body">
                      <p>{step.body}</p>
                      {step.tips && (
                        <div className="step-tips">
                          <div className="step-tips-label">Tips de la comunidad</div>
                          <ul>
                            {step.tips.map((t) => <li key={t}>{t}</li>)}
                          </ul>
                        </div>
                      )}
                      {step.info && (
                        <div className={`info-box ${step.info.type}`}>
                          <strong>{step.info.title}</strong>
                          <p>{step.info.body}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="guide-cta-bar">
          <div>
            <h3>¿Querés la guía completa en PDF?</h3>
            <p>Descargala gratis — funciona sin conexión a internet.</p>
          </div>
          <div className="cta-bar-actions">
            <Link href="/comunidad" className="btn-primary">Descargar gratis</Link>
            <Link href="/comunidad" className="btn-ghost">Unirme a la comunidad</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
