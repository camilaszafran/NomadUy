'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'

const COUNTRY_CODES = [
  { code: '+54',  label: '🇦🇷 +54' },
  { code: '+591', label: '🇧🇴 +591' },
  { code: '+55',  label: '🇧🇷 +55' },
  { code: '+56',  label: '🇨🇱 +56' },
  { code: '+57',  label: '🇨🇴 +57' },
  { code: '+506', label: '🇨🇷 +506' },
  { code: '+53',  label: '🇨🇺 +53' },
  { code: '+593', label: '🇪🇨 +593' },
  { code: '+503', label: '🇸🇻 +503' },
  { code: '+502', label: '🇬🇹 +502' },
  { code: '+509', label: '🇭🇹 +509' },
  { code: '+504', label: '🇭🇳 +504' },
  { code: '+52',  label: '🇲🇽 +52' },
  { code: '+505', label: '🇳🇮 +505' },
  { code: '+507', label: '🇵🇦 +507' },
  { code: '+595', label: '🇵🇾 +595' },
  { code: '+51',  label: '🇵🇪 +51' },
  { code: '+1787', label: '🇵🇷 +1787' },
  { code: '+1',   label: '🇺🇸 +1' },
  { code: '+1',   label: '🇨🇦 +1' },
  { code: '+598', label: '🇺🇾 +598' },
  { code: '+58',  label: '🇻🇪 +58' },
  { code: '+34',  label: '🇪🇸 +34' },
  { code: '+351', label: '🇵🇹 +351' },
  { code: '+39',  label: '🇮🇹 +39' },
  { code: '+33',  label: '🇫🇷 +33' },
  { code: '+49',  label: '🇩🇪 +49' },
  { code: '+44',  label: '🇬🇧 +44' },
  { code: '+31',  label: '🇳🇱 +31' },
  { code: '+32',  label: '🇧🇪 +32' },
  { code: '+41',  label: '🇨🇭 +41' },
  { code: '+43',  label: '🇦🇹 +43' },
  { code: '+46',  label: '🇸🇪 +46' },
  { code: '+47',  label: '🇳🇴 +47' },
  { code: '+45',  label: '🇩🇰 +45' },
  { code: '+358', label: '🇫🇮 +358' },
  { code: '+48',  label: '🇵🇱 +48' },
  { code: '+380', label: '🇺🇦 +380' },
  { code: '+7',   label: '🇷🇺 +7' },
  { code: '+972', label: '🇮🇱 +972' },
  { code: '+90',  label: '🇹🇷 +90' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+91',  label: '🇮🇳 +91' },
  { code: '+86',  label: '🇨🇳 +86' },
  { code: '+81',  label: '🇯🇵 +81' },
  { code: '+82',  label: '🇰🇷 +82' },
  { code: '+61',  label: '🇦🇺 +61' },
  { code: '+64',  label: '🇳🇿 +64' },
  { code: '+27',  label: '🇿🇦 +27' },
]

const COUNTRIES = [
  'Alemania', 'Argentina', 'Australia', 'Austria', 'Bélgica', 'Bolivia', 'Brasil',
  'Canadá', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Cuba', 'Dinamarca',
  'Ecuador', 'El Salvador', 'España', 'Estados Unidos', 'Finlandia', 'Francia',
  'Guatemala', 'Haití', 'Honduras', 'India', 'Israel', 'Italia', 'Japón',
  'Corea del Sur', 'México', 'Nicaragua', 'Noruega', 'Nueva Zelanda', 'Países Bajos',
  'Panamá', 'Paraguay', 'Perú', 'Polonia', 'Portugal', 'Puerto Rico',
  'Reino Unido', 'República Dominicana', 'Rusia', 'Sudáfrica', 'Suecia', 'Suiza',
  'Turquía', 'Ucrania', 'Emiratos Árabes Unidos', 'Uruguay', 'Venezuela', 'Otro',
]

type Status = 'idle' | 'loading' | 'success' | 'error' | 'duplicate'

const PDF_BY_LOCALE: Record<string, string> = {
  es: '/guides/guia-es.pdf',
  en: '/guides/guia-en.pdf',
  pt: '/guides/guia-pt.pdf',
}

export default function JoinForm() {
  const locale = useLocale()
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefonoPrefijo, setTelefonoPrefijo] = useState('+54')
  const [telefonoNumero, setTelefonoNumero] = useState('')
  const [paisDeOrigen, setPaisDeOrigen] = useState('')
  const [situacion, setSituacion] = useState('')
  const [cuandoLlegas, setCuandoLlegas] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (status !== 'success') return
    const pdfPath = PDF_BY_LOCALE[locale] ?? PDF_BY_LOCALE.es
    const a = document.createElement('a')
    a.href = pdfPath
    a.download = 'NomadUY.pdf'
    a.click()
  }, [status, locale])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const telefono = telefonoNumero ? `${telefonoPrefijo}${telefonoNumero}` : ''

    const res = await fetch('/api/comunidad/unirse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, email, telefono, pais_de_origen: paisDeOrigen, situacion, cuando_llegas: cuandoLlegas }),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus('success')
    } else if (res.status === 409) {
      setStatus('duplicate')
    } else {
      setStatus('error')
      setErrorMsg(data.error ?? 'Error inesperado.')
    }
  }

  if (status === 'success') {
    return (
      <div className="hero-form hero-form--success">
        <div className="form-success-icon">✓</div>
        <h3>¡Bienvenido/a a NomadUY!</h3>
        <p>Ya sos parte de la comunidad. Te mandamos un email de bienvenida en breve.</p>
      </div>
    )
  }

  return (
    <form className="hero-form" id="unirme" onSubmit={handleSubmit} noValidate>
      <h3>Unirme a NomadUY</h3>
      <p>Gratis para siempre. Sin spam.</p>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre" type="text" placeholder="Tu nombre"
            value={nombre} onChange={e => setNombre(e.target.value)} required
          />
        </div>
        <div className="form-field">
          <label htmlFor="apellido">Apellido *</label>
          <input
            id="apellido" type="text" placeholder="Tu apellido"
            value={apellido} onChange={e => setApellido(e.target.value)} required
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="email">Email *</label>
        <input
          id="email" type="email" placeholder="tu@email.com"
          value={email} onChange={e => setEmail(e.target.value)} required
        />
      </div>

      <div className="form-field">
        <label htmlFor="telefono-numero">Teléfono</label>
        <div className="phone-row">
          <select
            className="phone-prefix"
            value={telefonoPrefijo}
            onChange={e => setTelefonoPrefijo(e.target.value)}
            aria-label="Código de país"
          >
            {COUNTRY_CODES.map((c, i) => (
              <option key={i} value={c.code}>{c.label}</option>
            ))}
          </select>
          <input
            id="telefono-numero" type="tel" placeholder="091 234 567"
            value={telefonoNumero} onChange={e => setTelefonoNumero(e.target.value)}
            className="phone-number"
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="pais">País de origen</label>
        <select id="pais" value={paisDeOrigen} onChange={e => setPaisDeOrigen(e.target.value)}>
          <option value="">Seleccioná tu país</option>
          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="situacion">¿Cuál es tu situación? *</label>
        <select id="situacion" value={situacion} onChange={e => setSituacion(e.target.value)} required>
          <option value="">Seleccioná una opción</option>
          <option value="nomada">Nómada digital (corto plazo)</option>
          <option value="expat">Expat (largo plazo, trabajo)</option>
          <option value="inmigrante">Inmigrante (permanente)</option>
          <option value="planeando">Todavía planeando mi llegada</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="cuando">¿Cuándo llegás? *</label>
        <select id="cuando" value={cuandoLlegas} onChange={e => setCuandoLlegas(e.target.value)} required>
          <option value="">Seleccioná una opción</option>
          <option value="ya_estoy">Ya estoy en Uruguay</option>
          <option value="menos_1_mes">En menos de 1 mes</option>
          <option value="1_3_meses">En 1–3 meses</option>
          <option value="3_6_meses">En 3–6 meses</option>
          <option value="no_se">Todavía no sé</option>
        </select>
      </div>

      {status === 'duplicate' && (
        <p className="form-message form-message--error">
          Este email ya está registrado. ¿Ya sos parte de la comunidad?
        </p>
      )}
      {status === 'error' && (
        <p className="form-message form-message--error">{errorMsg}</p>
      )}

      <button className="submit-btn" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Registrando...' : 'Unirme a la comunidad →'}
      </button>
      <p className="form-privacy">Sin spam. Accedé a nuestro Whatsapp.</p>
    </form>
  )
}
