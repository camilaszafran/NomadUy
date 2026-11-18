'use client'

import { useEffect } from 'react'

export default function OpenLinkedSection() {
  useEffect(() => {
    function revealSection() {
      const target = document.getElementById(window.location.hash.slice(1))
      const entry = target?.closest<HTMLDetailsElement>('details.explore-entry')
      if (target && entry && !entry.open) {
        entry.open = true
        target.scrollIntoView()
      }
    }
    revealSection()
    window.addEventListener('hashchange', revealSection)
    return () => window.removeEventListener('hashchange', revealSection)
  }, [])
  return null
}
