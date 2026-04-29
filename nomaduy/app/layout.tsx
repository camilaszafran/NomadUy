// Root layout — returns children directly.
// [locale]/layout.tsx provides <html>/<body> for all user pages.
// /studio uses app/studio/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
