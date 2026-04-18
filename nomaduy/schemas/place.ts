import { defineType, defineField } from 'sanity'

export const placeSchema = defineType({
  name: 'place',
  title: 'Lugar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del lugar',
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
      name: 'region',
      title: 'Región / Departamento',
      type: 'string',
      description: 'Ej: Montevideo, Rocha, Salto',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Una frase corta que describe el lugar',
    }),
    defineField({
      name: 'placeholderGradient',
      title: 'Gradiente (placeholder de foto)',
      type: 'string',
      description: 'CSS gradient mientras no haya fotos. Ej: linear-gradient(135deg, #1A4B8C, #0D1F3C)',
    }),
    defineField({
      name: 'photos',
      title: 'Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Texto alternativo' },
          ],
        },
      ],
    }),
    defineField({
      name: 'costOfLiving',
      title: 'Costo de vida (1–5)',
      type: 'number',
      description: '1 = muy barato, 5 = caro',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'urbanRural',
      title: 'Urbano / Rural (1–5)',
      type: 'number',
      description: '1 = rural profundo, 5 = ciudad grande',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'population',
      title: 'Tamaño de la ciudad (1–5)',
      type: 'number',
      description: '1 = aldea pequeña, 5 = gran ciudad',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'facts',
      title: 'Datos del lugar',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Párrafo', value: 'normal' },
            { title: 'Título H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'links',
      title: 'Lugares recomendados (cafés, coworkings)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Nombre del lugar' },
            {
              name: 'category',
              type: 'string',
              title: 'Tipo',
              options: {
                list: [
                  { title: 'Café', value: 'cafe' },
                  { title: 'Coworking', value: 'coworking' },
                  { title: 'Otro', value: 'other' },
                ],
                layout: 'radio',
              },
            },
            { name: 'url', type: 'url', title: 'URL (Google Maps, web oficial)' },
            { name: 'logo', type: 'image', title: 'Logo (opcional)' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'category' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'region' },
  },
})
