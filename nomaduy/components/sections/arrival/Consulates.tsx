'use client'

import { useState } from 'react'
import records from '@/lib/foreign-consulates.json'
import { arrivalLocale, officialArrival } from '@/lib/arrival-links'
import { linkTarget } from '@/lib/link-target'

const labels = {
  es: ['País o nacionalidad', 'Ej.: Brasil, Argentina, España', 'Abrir ficha consular de', 'No encontramos una ficha con ese nombre. Consultá el directorio completo o al ministerio de relaciones exteriores de tu país para saber qué oficina atiende Uruguay.'],
  en: ['Country or nationality', 'e.g. Brazil, Argentina, Spain', 'Open official consular listing for', 'No matching listing. Consult the full directory or your country’s foreign ministry to find the office responsible for Uruguay.'],
  pt: ['País ou nacionalidade', 'Ex.: Brasil, Argentina, Espanha', 'Acessar ficha consular de', 'Não encontramos uma ficha com esse nome. Consulte o diretório completo ou o Ministério das Relações Exteriores do seu país para encontrar o posto responsável pelo Uruguai.'],
}
const aliases: Record<string, string> = {
  Alemania: 'Germany Deutschland', Brasil: 'Brazil brasileiro brasileira', España: 'Spain Espanha',
  'Estados Unidos': 'United States USA EUA', 'Reino Unido': 'United Kingdom UK Britain',
  Francia: 'France França', Italia: 'Italy Itália', Suiza: 'Switzerland Suíça',
  'Países Bajos': 'Netherlands Holland Holanda', Portugal: 'Português Portuguese',
}
const normalize = (value: string) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase().trim()

export default function Consulates({ locale }: { locale: string }) {
  const [query, setQuery] = useState('')
  const [label, placeholder, open, empty] = labels[arrivalLocale(locale)]
  const term = normalize(query)
  const matches = term ? records.filter(({ name }) => normalize(name + ' ' + (aliases[name] ?? '')).includes(term)) : []
  return (
    <div className="arrival-lookup">
      <label htmlFor="foreign-country">{label}</label>
      <input id="foreign-country" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={placeholder} autoComplete="off" />
      <div aria-live="polite">
        {term && (matches.length ? (
          <ul>
            {matches.map(({ name, href }) => <li key={href}><a href={href} {...linkTarget(href)}>{open} {name} ↗</a></li>)}
          </ul>
        ) : <p>{empty}</p>)}
      </div>
      <a href={officialArrival.consulates} {...linkTarget(officialArrival.consulates)}>
        {arrivalLocale(locale) === 'es' ? 'Ver todos los consulados' : arrivalLocale(locale) === 'pt' ? 'Ver todos os consulados' : 'Browse all consulates'} ↗
      </a>
    </div>
  )
}
