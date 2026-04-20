export default function PageSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: '#ffffff', fontSize: '1.05rem', maxWidth: '560px', lineHeight: '1.7' }}>
      {children}
    </p>
  )
}
