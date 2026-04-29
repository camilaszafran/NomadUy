import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PdfBanner from '@/components/sections/home/PdfBanner'
import PortableTextRenderer from '@/components/sections/guias/PortableTextRenderer'
import { sanityFetch, guideBySlugQuery, guideSlugQuery } from '@/lib/sanity'
import type { GuideDetail } from '@/types'
import { getLocale } from 'next-intl/server'
import { localizeHref } from '@/lib/locale'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const guides = await sanityFetch<{ slug: string }[]>(guideSlugQuery)
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const guide = await sanityFetch<GuideDetail | null>(guideBySlugQuery, { slug })
  if (!guide) return {}
  return {
    title: `${guide.title} — NomadUY`,
    description: guide.summary,
  }
}

export default async function GuidePage({ params }: Props) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()])
  const guide = await sanityFetch<GuideDetail | null>(guideBySlugQuery, { slug })

  if (!guide) notFound()

  return (
    <>
      <Nav />

      <div className="guia-page-hero">
        <div className="guia-hero-inner">
          <div>
            <div className="guia-breadcrumb">
              <Link href={localizeHref('/guias', locale)} style={{ color: 'inherit', textDecoration: 'none' }}>Guías</Link>
              <span>›</span> {guide.title}
            </div>
            <h1>{guide.title}</h1>
            {guide.summary && <p>{guide.summary}</p>}
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
          {guide.body ? (
            <PortableTextRenderer value={guide.body} />
          ) : (
            <p style={{ color: 'var(--ink-60)' }}>Esta guía está en construcción. ¡Volvé pronto!</p>
          )}
        </div>
      </div>

      <PdfBanner />
      <Footer />
    </>
  )
}
