# NomadUY — Guía de operación

Sitio web para nómadas digitales que se mudan a Uruguay. Construido con Next.js, Sanity, Supabase y Resend.

---

## Correr el proyecto en local

### Requisitos previos
- Node.js instalado
- Archivo `.env.local` en la raíz del proyecto con las variables de entorno (Sanity, Supabase, Resend)

### Pasos

```bash
# Desde la carpeta nomaduy/
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

El servidor se recarga automáticamente cada vez que se guarda un archivo de código.

---

## Editar contenido en Sanity (CMS)

Sanity es el gestor de contenido del sitio. Desde el studio se pueden editar guías, rutas y lugares.

### Con el servidor local corriendo

Ir a [http://localhost:3000/studio](http://localhost:3000/studio)

### En producción

Ir a [https://www.nomaduy.com/studio](https://www.nomaduy.com/studio) (o el dominio de Vercel correspondiente).

### Qué se puede editar

| Tipo | Qué es |
|------|--------|
| **Guías** | Artículos de la sección Guías (texto, imágenes, categoría) |
| **Rutas** | Rutas de la página Conocer Uruguay (itinerarios, fotos, links) |
| **Lugares** | Lugares de la sección Vivir (descripción, fotos, scores) |

### Notas importantes
- Los cambios en Sanity se reflejan en el sitio **sin necesidad de redesplegar**. El sitio hace refetch del contenido automáticamente cada hora.
- Si se necesita ver el cambio de inmediato en producción, se puede forzar un revalidado o simplemente esperar unos minutos.

---

## Ver datos en Supabase

Supabase almacena los registros del formulario de la comunidad (emails de personas que se unen).

1. Ir a [https://supabase.com](https://supabase.com) e iniciar sesión
2. La cuenta está vinculada a **info@villapancha.uy** — la primera vez hay que aceptar la invitación al equipo que llega por email
3. Dentro del proyecto, ir a **Table Editor** para ver los registros
4. La tabla principal es `community_members` (o similar) con los emails y fechas de registro

---

## Agregar eventos al calendario de NomadUY

Los eventos de la comunidad se gestionan desde Google Calendar.

- **Cuenta:** info@nodolunarejo.uy
- Iniciar sesión en Google con esa cuenta
- Abrir Google Calendar y buscar el calendario **Nomad UY**
- Crear eventos ahí — aparecerán en la sección Comunidad del sitio

> Los eventos no requieren redesplegar el sitio.

---

## Deployar en Vercel

El sitio está hosteado en Vercel bajo la cuenta de **camilaszafran**.

### Cuándo hace falta redesplegar

| Situación | ¿Hay que redesplegar? |
|-----------|----------------------|
| Se editó contenido en Sanity | No |
| Se agregaron eventos al calendario | No |
| Se modificó código (componentes, CSS, lógica) | Sí |

### Cómo redesplegar

**Opción A — automática (recomendada):**
Hacer `git push` a la rama `main`. Vercel detecta el push y despliega automáticamente.

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
```

**Opción B — manual desde el dashboard:**
1. Ir a [https://vercel.com](https://vercel.com) e iniciar sesión con la cuenta de camilaszafran
2. Seleccionar el proyecto **nomaduy**
3. Ir a la pestaña **Deployments**
4. Click en **Redeploy** sobre el último deployment

### Variables de entorno en Vercel
Si se agregan nuevas variables al `.env.local`, hay que agregarlas también en Vercel:
- Dashboard del proyecto → **Settings** → **Environment Variables**

---

## Gestión de emails (Resend)

Los emails transaccionales (confirmación al unirse a la comunidad, etc.) se envían a través de **Resend**.

- **Cuenta:** nodolunarejo
- Ir a [https://resend.com](https://resend.com) e iniciar sesión
- Desde el dashboard se pueden ver los emails enviados, el historial y posibles errores de entrega

---

## Stack técnico (referencia rápida)

| Servicio | Para qué | Acceso |
|----------|----------|--------|
| **Next.js** | Framework del sitio | Código en este repo |
| **Sanity** | CMS de contenido | `/studio` |
| **Supabase** | Base de datos (registros comunidad) | info@villapancha.uy |
| **Resend** | Envío de emails | cuenta nodolunarejo |
| **Vercel** | Hosting y deploy | cuenta camilaszafran |
| **Google Calendar** | Eventos de comunidad | info@nodolunarejo.uy |

---

## Estructura de carpetas (referencia)

```
nomaduy/
├── app/               # Páginas (Next.js App Router)
│   └── styles/        # CSS dividido por página
├── components/        # Componentes React
│   └── sections/      # Secciones por página
├── lib/               # Clientes de Sanity, Supabase y Resend
├── schemas/           # Schemas de Sanity (tipos de contenido)
├── messages/          # Traducciones (ES / EN / PT)
└── scripts/           # Scripts de seed de datos (no correr sin revisar)
```

## Recomendaciones de la comunidad

El formulario de Comunidad guarda las sugerencias como borradores privados de
Sanity. Requiere que `SANITY_API_TOKEN` tenga permiso de escritura en el dataset
y que `RESEND_API_KEY` pueda enviar desde `bienvenida@nomad.com.uy`. La
notificación se envía a `info@nomad.com.uy`. El enlace de revisión permite
editar, publicar o descartar una sola sugerencia y queda inutilizado al
procesarla. Si se configura `NOMAD_REVIEW_SECRET`, se usa para firmar enlaces;
si se cambia la clave que los firmó, los anteriores dejan de funcionar.
