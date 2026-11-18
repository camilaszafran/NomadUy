import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Planner from '@/components/planner/Planner'
import { searchCatalog } from '@/lib/search-catalog'
import { arrivalLocale } from '@/lib/arrival-links'
import { pageSeo } from '@/lib/seo'
const copy = {
 es: ['Mi Uruguay', 'Buscá lo que necesitás, guardá tus lugares y armá tu lista para compartir.'],
 en: ['My Uruguay', 'Find what you need, save places and build a list to share.'],
 pt: ['Meu Uruguai', 'Encontre o que precisa, salve lugares e monte uma lista para compartilhar.'],
}
type Props = {
 params: Promise<{ locale: string }>
 searchParams: Promise<{ q?: string | string[]; favoritos?: string }>
}
export async function generateMetadata({ params }: Props) {
 const { locale } = await params
 const [title, description] = copy[arrivalLocale(locale)]
 return pageSeo('/mi-uruguay', locale, title, description)
}
export default async function MyUruguay({ params, searchParams }: Props) {
 const { locale } = await params
 setRequestLocale(locale)
 const [title, intro] = copy[arrivalLocale(locale)]
 const inputs = await searchParams
 const query = (Array.isArray(inputs.q) ? inputs.q[0] : inputs.q ?? '').slice(0, 250)
 const saved = inputs.favoritos === '1'
 const catalog = await searchCatalog(locale)
 return <><Nav /><header className="page-header page-header-blue"><div className="page-header-inner">
   <h1>{title}</h1><p>{intro}</p></div></header>
   <main className="main-wrap"><Planner key={query + String(saved)} catalog={catalog} initialQuery={query} initialSaved={saved} /></main><Footer /></>
}
