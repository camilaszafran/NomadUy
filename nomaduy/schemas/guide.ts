import { defineType, defineField } from 'sanity'

export const guideSchema = defineType({
  name: 'guide',
  title: 'Guía',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'Disponible', value: 'ready' },
          { title: 'En proceso', value: 'progress' },
          { title: 'Próximamente', value: 'soon' },
        ],
        layout: 'radio',
      },
      initialValue: 'soon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Guía destacada',
      description: 'Mostrar como guía destacada en la parte superior de la página',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      description: 'Número menor = aparece primero',
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'icon',
      title: 'Ícono',
      type: 'string',
      options: {
        list: [
          { title: 'Avión (Llegada)', value: 'airplane' },
          { title: 'Balanza (Legal)', value: 'scales' },
          { title: 'Pin (Barrios)', value: 'mapPin' },
          { title: 'Bus (Transporte)', value: 'bus' },
          { title: 'Cruz (Salud)', value: 'firstAid' },
          { title: 'Banco (Finanzas)', value: 'bank' },
          { title: 'Computadora (Trabajo)', value: 'laptop' },
          { title: 'Personas (Comunidad)', value: 'usersThree' },
          { title: 'Chat (Idioma)', value: 'chatTeardrop' },
          { title: 'Casa (Vivienda)', value: 'house' },
          { title: 'Corazón (Bienestar)', value: 'heart' },
          { title: 'Mapa (Explorar)', value: 'map' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Llegada', value: 'llegada' },
          { title: 'Legal & Trámites', value: 'legal' },
          { title: 'Vivienda', value: 'vivienda' },
          { title: 'Trabajo', value: 'trabajo' },
          { title: 'Moverse', value: 'moverse' },
          { title: 'Salud', value: 'salud' },
          { title: 'Familia', value: 'familia' },
          { title: 'Finanzas', value: 'finanzas' },
          { title: 'Idioma & Cultura', value: 'idioma' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas (para la tarjeta)',
      description: 'Ej: "15 min", "Llegada", "Trámites". Máximo 3.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'summary',
      title: 'Resumen (descripción de la tarjeta)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
    }),
    defineField({
      name: 'persona',
      title: 'Audiencia',
      description: 'Para qué perfil de usuario es relevante esta guía',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Nómada digital', value: 'nomad' },
          { title: 'Expat', value: 'expat' },
          { title: 'Inmigrante', value: 'immigrant' },
        ],
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Párrafo', value: 'normal' },
            { title: 'Título H2', value: 'h2' },
            { title: 'Título H3', value: 'h3' },
            { title: 'Título H4', value: 'h4' },
            { title: 'Cita', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Código', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'blank', type: 'boolean', title: 'Abrir en nueva pestaña' },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Texto alternativo' },
            { name: 'caption', type: 'string', title: 'Pie de foto' },
          ],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Cuadro informativo',
          fields: [
            {
              name: 'type',
              title: 'Tipo',
              type: 'string',
              options: {
                list: [
                  { title: 'Azul (info)', value: 'blue' },
                  { title: 'Verde (tip)', value: 'green' },
                  { title: 'Dorado (importante)', value: 'gold' },
                ],
                layout: 'radio',
              },
            },
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'body', type: 'text', title: 'Contenido' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'body' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'coverImage' },
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      const statusLabel: Record<string, string> = {
        ready: '✅ Disponible',
        progress: '🔄 En proceso',
        soon: '⏳ Próximamente',
      }
      return { title, subtitle: statusLabel[subtitle] ?? subtitle }
    },
  },
})
