import type { Metadata } from 'next'
import { Newsreader, Inter } from 'next/font/google'
import './globals.css'

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'NomadUY — Hacé de Uruguay tu hogar',
  description: 'La guía más completa para vivir, trabajar y echar raíces en Uruguay — hecha por personas que eligieron quedarse.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${newsreader.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
