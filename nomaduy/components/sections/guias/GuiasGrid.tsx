import { sanityFetch, guidesQuery } from '@/lib/sanity'
import type { GuideCard } from '@/types'
import GuiasGridClient from './GuiasGridClient'

export default async function GuiasGrid() {
  const guides = await sanityFetch<GuideCard[]>(guidesQuery)
  return <GuiasGridClient guides={guides} />
}
