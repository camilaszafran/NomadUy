import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { pageSeo, siteUrl } from '@/lib/seo'
import { localizeHref } from '@/lib/locale'
import { arrivalLocale } from '@/lib/arrival-links'
import { nomadIdentity, organizationData } from '@/lib/nomad-identity'

type Props = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const copy = nomadIdentity[arrivalLocale(locale)]
  return pageSeo('/sobre-nomad', locale, copy.title, copy.description)
}
export default async function AboutNomad({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const copy = nomadIdentity[arrivalLocale(locale)]
  const structured = {
    '@context': 'https://schema.org', '@graph': [organizationData(arrivalLocale(locale)), {
      '@type': 'AboutPage', '@id': siteUrl('/sobre-nomad', locale) + '#page',
      url: siteUrl('/sobre-nomad', locale), name: copy.title, description: copy.description,
      inLanguage: locale, isAccessibleForFree: true,
      mainEntity: { '@id': 'https://www.nomad.com.uy/#organization' },
      isPartOf: { '@id': 'https://www.nomad.com.uy/#website' },
    }],
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }} />
    <Nav />
    <header className="page-header page-header-blue"><div className="page-header-inner"><h1>{copy.title}</h1><p>{copy.description}</p></div></header>
    <main className="main-wrap arrival-wrap">
      <section className="arrival-card"><h2>{copy.mission}</h2><p>{copy.scope}</p><p>{copy.community}</p><p>{copy.free}</p>
        <a href={localizeHref('/comunidad#recomendar', locale)} target="_blank" rel="noopener noreferrer">{copy.recommend} →</a>
      </section>
      <section className="arrival-card"><h2>{copy.responsibility}</h2><p>{copy.responsibilityText}</p><a href="mailto:info@nomad.com.uy">{copy.contact} →</a></section>
      <section className="arrival-card"><h2>{copy.editorial}</h2><p>{copy.editorialText}</p></section>
    </main><Footer />
  </>
}
