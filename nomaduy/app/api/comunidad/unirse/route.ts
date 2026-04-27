import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { resend } from '@/lib/resend'
import { welcomeEmail } from '@/lib/emails/welcome'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const body = await request.json()
  const { nombre, apellido, email, telefono, pais_de_origen, situacion, cuando_llegas } = body

  if (!nombre || !apellido || !email || !situacion || !cuando_llegas) {
    return NextResponse.json({ error: 'Por favor completá todos los campos obligatorios.' }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'El email no es válido.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('miembros')
    .insert({ nombre, apellido, email, telefono, pais_de_origen, situacion, cuando_llegas })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Este email ya está registrado en la comunidad.' }, { status: 409 })
    }
    console.error('Supabase error:', error)
    return NextResponse.json({ error: 'Error al registrarse. Intentá de nuevo.' }, { status: 500 })
  }

  // Send welcome email — non-blocking, a failure won't break registration
  resend.emails.send({
    from: 'NomadUY <bienvenida@nomad.com.uy>',
    to: email,
    subject: '¡Bienvenido/a a NomadUY! 🇺🇾',
    html: welcomeEmail(nombre),
  }).catch((err) => console.error('Resend error:', err))

  return NextResponse.json({ success: true })
}
