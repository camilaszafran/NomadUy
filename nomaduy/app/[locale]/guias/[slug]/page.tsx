import SaveButton from '@/components/planner/Favorites'
import { pageSeo } from '@/lib/seo'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CultureContent } from '@/components/sections/discover/Content'
import { guideUpdates, HealthSources, UpdatedLegalGuide } from '@/components/sections/arrival/GuideUpdates'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PdfBanner from '@/components/sections/home/PdfBanner'
import PortableTextRenderer from '@/components/sections/guias/PortableTextRenderer'
import { sanityFetch, guideBySlugQuery, guideSlugQuery } from '@/lib/sanity'
import type { GuideDetail } from '@/types'
import { setRequestLocale } from 'next-intl/server'
import { localizeHref } from '@/lib/locale'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const guides = await sanityFetch<{ slug: string }[]>(guideSlugQuery)
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params
  if (slug === 'legal-visas') {
    const { title, summary } = guideUpdates(locale)
    return pageSeo('/guias/' + slug, locale, title, summary)
  }
  const guide = await sanityFetch<GuideDetail | null>(guideBySlugQuery, { slug, locale: locale || 'es' })
  if (!guide) return {}
  return pageSeo('/guias/' + slug, locale, guide.title, guide.summary ?? '')
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const guide = await sanityFetch<GuideDetail | null>(guideBySlugQuery, { slug, locale })

  if (!guide) notFound()
  const updates = guideUpdates(locale)
  const isLegal = slug === 'legal-visas'
  const title = isLegal ? updates.title : guide.title
  const summary = isLegal ? updates.summary : guide.summary

  return (
    <>
      <Nav />

      <div className="guia-page-hero">
        <div className="guia-hero-inner">
          <div>
            <div className="guia-breadcrumb">
              <Link href={localizeHref('/guias', locale)} style={{ color: 'inherit', textDecoration: 'none' }}>Guías</Link>
              <span>›</span> {title}
            </div>
            <h1>{title}</h1>
            {summary && <p>{summary}</p>}
            {guide.tags && guide.tags.length > 0 && (
              <div className="hero-tags">
                {guide.tags.map((tag) => (
                  <span key={tag} className="hero-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="guide-article-wrap">
        <div className="guide-article">
          <SaveButton item={{ href: '/guias/' + slug, title, kind: 'Guía' }} />
          {slug === 'salud-mutualistas' && <HealthSources locale={locale} />}
          {slug === 'moverse-uruguay' && (
            <p id="apps-transporte"><Link href={localizeHref('/explora#apps-transporte', locale)}>{updates.transport} →</Link></p>
          )}
          {slug === 'encontrar-apartamento' && (
            <p><Link href={localizeHref('/servicios#vivienda', locale)}>
              {locale === 'en' ? 'Rental portals and real estate agencies' : locale === 'pt' ? 'Portais de aluguel e imobiliárias' : 'Portales de alquiler e inmobiliarias'} →
            </Link></p>
          )}
          {isLegal ? <UpdatedLegalGuide locale={locale} /> : guide.body ? (
            <PortableTextRenderer value={guide.body} />
          ) : (
            <p style={{ color: 'var(--ink-60)' }}>Esta guía está en construcción. ¡Volvé pronto!</p>
          )}
        </div>
      </div>

      {slug === 'cultura-uruguay' && <CultureContent />}
      <PdfBanner />
      <Footer />
    </>
  )
}
