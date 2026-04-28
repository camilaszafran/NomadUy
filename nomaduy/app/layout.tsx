// Minimal root layout — only applies to routes outside [locale] (e.g. /studio)
// All user-facing pages use app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
