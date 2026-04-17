import { sanityFetch, featuredGuidesQuery } from '@/lib/sanity'
import type { GuideCard } from '@/types'
import FeaturedGuidesClient from './FeaturedGuidesClient'

export default async function FeaturedGuides() {
  const guides = await sanityFetch<GuideCard[]>(featuredGuidesQuery)
  return <FeaturedGuidesClient guides={guides} />
}
