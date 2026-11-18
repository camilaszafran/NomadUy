import { Newsreader, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import '../globals.css'
import { FavoritesProvider } from '@/components/planner/Favorites'

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

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'pt' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${newsreader.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <FavoritesProvider>{children}</FavoritesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
