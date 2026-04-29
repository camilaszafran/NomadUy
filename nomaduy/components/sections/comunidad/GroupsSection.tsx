'use client'

import {
  Lightning,
  UsersThree,
  Laptop,
  House,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

const groupIcons: Icon[] = [Lightning, UsersThree, Laptop, House]

export default function GroupsSection() {
  const t = useTranslations('comunidad')

  const groups = [
    { name: t('group_sports_name'),       desc: t('group_sports_desc'),       tags: t.raw('group_sports_tags') as string[] },
    { name: t('group_social_name'),       desc: t('group_social_desc'),       tags: t.raw('group_social_tags') as string[] },
    { name: t('group_professional_name'), desc: t('group_professional_desc'), tags: t.raw('group_professional_tags') as string[] },
    { name: t('group_life_name'),         desc: t('group_life_desc'),         tags: t.raw('group_life_tags') as string[] },
  ]

  return (
    <section className="groups-section">
      <div className="groups-header">
        <div className="section-eyebrow">{t('groups_eyebrow')}</div>
        <h2>{t('groups_heading')}</h2>
        <p>{t('groups_desc')}</p>
      </div>
      <div className="groups-grid">
        {groups.map((g, i) => {
          const GIcon = groupIcons[i]
          return (
            <a key={g.name} href="#" className="group-card">
              <div className="group-card-header">
                <div className="group-icon">
                  <GIcon size={24} weight="thin" />
                </div>
                <h3>{g.name}</h3>
              </div>
              <p>{g.desc}</p>
              <div className="group-tags">
                {g.tags.map((tag) => <span key={tag} className="group-tag">{tag}</span>)}
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
