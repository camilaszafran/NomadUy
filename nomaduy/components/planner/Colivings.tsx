'use client'
import { useState } from 'react'
import { useLocale } from 'next-intl'
import { colivings } from '@/lib/colivings'
import SaveButton from './Favorites'
import { linkTarget } from '@/lib/link-target'
const copy = {
 es: ['Colivings y viviendas compartidas', 'Filtrá por localidad. Antes de reservar, consultá estadía mínima, depósito, costo total, internet y reglas de convivencia.', 'Todas las localidades', 'Consultar disponibilidad', 'Revisado el 18 de noviembre de 2026.'],
 en: ['Coliving and shared homes', 'Filter by location. Before booking, ask about minimum stays, deposits, total price, internet and house rules.', 'All locations', 'Check availability', 'Reviewed on November 18, 2026.'],
 pt: ['Coliving e moradias compartilhadas', 'Filtre por localidade. Antes de reservar, consulte estadia mínima, caução, preço total, internet e regras da casa.', 'Todas as localidades', 'Consultar disponibilidade', 'Revisado em 18 de novembro de 2026.'],
}
export default function Colivings() {
 const locale = useLocale()
 const t = copy[locale === 'en' || locale === 'pt' ? locale : 'es']
 const items = colivings(locale)
 const [region, setRegion] = useState('')
 return <section className="coliving-section" id="colivings">
   <h2>{t[0]}</h2><p>{t[1]}</p>
   <label>{t[2]} <select value={region} onChange={event => setRegion(event.target.value)}>
     <option value="">{t[2]}</option>
     {[...new Set(items.map(item => item.region))].map(value => <option key={value}>{value}</option>)}
   </select></label>
   <div className="planner-results">{items.filter(item => !region || item.region === region).map(item =>
     <article className="arrival-card" key={item.href}>
       <small>{item.region} · {item.kind}</small><h3>{item.title}</h3><p>{item.description}</p>
       <div className="planner-actions"><a href={item.href} {...linkTarget(item.href)}>{t[3]} ↗</a><SaveButton item={item} /></div>
     </article>)}</div>
   <p className="arrival-checked">{t[4]}</p>
 </section>
}
