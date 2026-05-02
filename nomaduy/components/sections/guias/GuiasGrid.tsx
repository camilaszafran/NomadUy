import { sanityFetch, guidesQuery } from '@/lib/sanity'
import type { GuideCard } from '@/types'
import GuiasGridClient from './GuiasGridClient'

export default async function GuiasGrid({ locale }: { locale: string }) {
  const guides = await sanityFetch<GuideCard[]>(guidesQuery, { locale })
  return <GuiasGridClient guides={guides} />
}
