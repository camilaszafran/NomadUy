import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { editorialReviewed } from '@/lib/nomad-identity'
import { guideSlugQuery, sanityFetch } from '@/lib/sanity'
import { featuredPlaceSlugs } from '@/lib/regional-places'
import { languageUrls, publicPaths, siteUrl } from '@/lib/seo'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await sanityFetch<{ slug: string }[]>(guideSlugQuery)
  const paths = new Set([...publicPaths, ...featuredPlaceSlugs.map(slug => '/vivir/lugares/' + slug), ...guides.map(({ slug }) => '/guias/' + slug)])
  return [...paths].flatMap(path => routing.locales.map(locale => ({
    url: siteUrl(path, locale),
    ...(path === '/sobre-nomad' || path.startsWith('/uruguay/') ? { lastModified: editorialReviewed } : {}),
    alternates: { languages: languageUrls(path) },
  })))
}
