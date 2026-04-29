'use client'

import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'

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
  const t = useTranslations('comunidad')
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
      setErrorMsg(data.error ?? t('form_error_default'))
    }
  }

  if (status === 'success') {
    return (
      <div className="hero-form hero-form--success">
        <div className="form-success-icon">✓</div>
        <h3>{t('form_success_heading')}</h3>
        <p>{t('form_success_msg')}</p>
      </div>
    )
  }

  return (
    <form className="hero-form" id="unirme" onSubmit={handleSubmit} noValidate>
      <h3>{t('form_title')}</h3>
      <p>{t('form_subtitle')}</p>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="nombre">{t('form_nombre_label')}</label>
          <input
            id="nombre" type="text" placeholder={t('form_nombre_placeholder')}
            value={nombre} onChange={e => setNombre(e.target.value)} required
          />
        </div>
        <div className="form-field">
          <label htmlFor="apellido">{t('form_apellido_label')}</label>
          <input
            id="apellido" type="text" placeholder={t('form_apellido_placeholder')}
            value={apellido} onChange={e => setApellido(e.target.value)} required
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="email">{t('form_email_label')}</label>
        <input
          id="email" type="email" placeholder={t('form_email_placeholder')}
          value={email} onChange={e => setEmail(e.target.value)} required
        />
      </div>

      <div className="form-field">
        <label htmlFor="telefono-numero">{t('form_telefono_label')}</label>
        <div className="phone-row">
          <select
            className="phone-prefix"
            value={telefonoPrefijo}
            onChange={e => setTelefonoPrefijo(e.target.value)}
            aria-label={t('form_country_code_aria')}
          >
            {COUNTRY_CODES.map((c, i) => (
              <option key={i} value={c.code}>{c.label}</option>
            ))}
          </select>
          <input
            id="telefono-numero" type="tel" placeholder={t('form_telefono_placeholder')}
            value={telefonoNumero} onChange={e => setTelefonoNumero(e.target.value)}
            className="phone-number"
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="pais">{t('form_pais_label')}</label>
        <select id="pais" value={paisDeOrigen} onChange={e => setPaisDeOrigen(e.target.value)}>
          <option value="">{t('form_pais_placeholder')}</option>
          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="situacion">{t('form_situacion_label')}</label>
        <select id="situacion" value={situacion} onChange={e => setSituacion(e.target.value)} required>
          <option value="">{t('form_situacion_placeholder')}</option>
          <option value="nomada">{t('form_situacion_nomada')}</option>
          <option value="expat">{t('form_situacion_expat')}</option>
          <option value="inmigrante">{t('form_situacion_inmigrante')}</option>
          <option value="planeando">{t('form_situacion_planning')}</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="cuando">{t('form_cuando_label')}</label>
        <select id="cuando" value={cuandoLlegas} onChange={e => setCuandoLlegas(e.target.value)} required>
          <option value="">{t('form_cuando_placeholder')}</option>
          <option value="ya_estoy">{t('form_cuando_here')}</option>
          <option value="menos_1_mes">{t('form_cuando_1month')}</option>
          <option value="1_3_meses">{t('form_cuando_1to3')}</option>
          <option value="3_6_meses">{t('form_cuando_3to6')}</option>
          <option value="no_se">{t('form_cuando_unsure')}</option>
        </select>
      </div>

      {status === 'duplicate' && (
        <p className="form-message form-message--error">
          {t('form_error_duplicate')}
        </p>
      )}
      {status === 'error' && (
        <p className="form-message form-message--error">{errorMsg}</p>
      )}

      <button className="submit-btn" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? t('form_loading') : t('form_submit')}
      </button>
      <p className="form-privacy">{t('form_privacy')}</p>
    </form>
  )
}
