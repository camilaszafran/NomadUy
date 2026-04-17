'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/guias', label: 'Guías' },
  { href: '/vivir', label: 'Vivir' },
  { href: '/conocer-uruguay', label: 'Conocer Uruguay' },
  { href: '/recursos', label: 'Recursos' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav>
        <a href="/" className="nav-logo">
          Nomad<span>UY</span>
        </a>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
          <li><a href="/comunidad" className="nav-cta">Unirme</a></li>
        </ul>

        <button
          className="nav-hamburger"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <span className={`hbar${open ? ' open' : ''}`} />
          <span className={`hbar${open ? ' open' : ''}`} />
          <span className={`hbar${open ? ' open' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <div className="nav-drawer-links">
                {links.map(l => (
                  <a key={l.href} href={l.href} className="nav-drawer-link">
                    {l.label}
                  </a>
                ))}
              </div>
              <a href="/comunidad" className="nav-drawer-cta">
                Unirme a la comunidad →
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
