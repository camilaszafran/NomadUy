import { getLocale } from 'next-intl/server'
import { sanityFetch, featuredGuidesQuery } from '@/lib/sanity'
import type { GuideCard } from '@/types'
import FeaturedGuidesClient from './FeaturedGuidesClient'

export default async function FeaturedGuides() {
  const locale = await getLocale()
  const guides = await sanityFetch<GuideCard[]>(featuredGuidesQuery, { locale })
  return <FeaturedGuidesClient guides={guides} />
}
