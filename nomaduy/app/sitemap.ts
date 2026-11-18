import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { guideSlugQuery, sanityFetch } from '@/lib/sanity'
import { languageUrls, publicPaths, siteUrl } from '@/lib/seo'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await sanityFetch<{ slug: string }[]>(guideSlugQuery)
  const paths = new Set([...publicPaths, ...guides.map(({ slug }) => '/guias/' + slug)])
  return [...paths].flatMap(path => routing.locales.map(locale => ({
    url: siteUrl(path, locale),
    alternates: { languages: languageUrls(path) },
  })))
}
