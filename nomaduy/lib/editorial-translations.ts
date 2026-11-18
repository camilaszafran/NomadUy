// Exact editorial corrections for existing CMS translations; IDs, URLs and source text stay intact.
const corrections: Record<string, Record<string, string>> = {
  en: {
    'Legal & All': 'Visas, residency and legal procedures',
    'This — Costa de Rocha': 'East — Rocha Coast',
    'South Center': 'South-Central Uruguay',
    'Devil\'s Point': 'Punta del Diablo',
    'Old Town & Harbor': 'Ciudad Vieja & the Port',
    'Trámites': 'Paperwork',
  },
  pt: {
    'Legal & Vistos': 'Vistos, residência e documentação',
    'Saúde e Seguradoras de Saúde': 'Saúde e planos de saúde',
    'Ponta do Diabo': 'Punta del Diablo',
    'Grutas do Palácio': 'Grutas del Palacio',
    'Lavalleja — Villa Serrana e Grutas do Palácio': 'Lavalleja — Villa Serrana e Grutas del Palacio',
    'Quebrada dos Corvos': 'Quebrada de los Cuervos',
    'Trámites': 'Documentação',
    'Visas': 'Vistos',
  },
}

export function correctEditorialTranslations<T>(value: T, locale: unknown): T {
  const copy = typeof locale === 'string' ? corrections[locale] : undefined
  if (!copy) return value
  const visit = (item: unknown): unknown => {
    if (typeof item === 'string') return Object.hasOwn(copy, item) ? copy[item] : item
    if (Array.isArray(item)) return item.map(visit)
    if (item && typeof item === 'object') return Object.fromEntries(Object.entries(item).map(([key, child]) => [key, visit(child)]))
    return item
  }
  return visit(value) as T
}
