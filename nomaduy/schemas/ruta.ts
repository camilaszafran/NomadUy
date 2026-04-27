import { defineField, defineType } from 'sanity'

export const rutaSchema = defineType({
  name: 'ruta',
  title: 'Ruta',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la ruta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duración',
      type: 'string',
      options: {
        list: [
          { title: '1 día', value: '1 día' },
          { title: 'Fin de semana', value: 'Fin de semana' },
          { title: '4–7 días', value: '4–7 días' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'distance',
      title: 'Distancia / tiempo de viaje',
      type: 'string',
      description: 'Ej: "2h 45min en auto"',
    }),
    defineField({
      name: 'vibe',
      title: 'Vibe / etiqueta extra',
      type: 'string',
      description: 'Ej: "Imperdible", "Verano", "Enoturismo"',
    }),
    defineField({
      name: 'interestLabel',
      title: 'Categoría (badge)',
      type: 'string',
      description: 'Ej: "Historia", "Playa", "Naturaleza"',
    }),
    defineField({
      name: 'teaser',
      title: 'Descripción breve',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'stops',
      title: 'Paradas destacadas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Aparecen como chips en la tarjeta',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
      ],
    }),
    defineField({
      name: 'photos',
      title: 'Fotos (carrusel en el modal)',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
        ],
      }],
    }),
    defineField({
      name: 'itinerary',
      title: 'Itinerario',
      type: 'array',
      of: [{
        type: 'object',
        name: 'itineraryDay',
        fields: [
          defineField({ name: 'day', title: 'Título del día / bloque', type: 'string' }),
          defineField({ name: 'content', title: 'Descripción', type: 'text', rows: 5 }),
        ],
        preview: { select: { title: 'day' } },
      }],
    }),
    defineField({
      name: 'stayLinks',
      title: 'Dónde dormir',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Nombre', type: 'string' }),
          defineField({ name: 'url', title: 'URL', type: 'url' }),
        ],
        preview: { select: { title: 'label', subtitle: 'url' } },
      }],
    }),
    defineField({
      name: 'doLinks',
      title: 'Qué hacer',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Nombre', type: 'string' }),
          defineField({ name: 'url', title: 'URL', type: 'url' }),
        ],
        preview: { select: { title: 'label', subtitle: 'url' } },
      }],
    }),
    defineField({
      name: 'eatLinks',
      title: 'Dónde comer',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Nombre', type: 'string' }),
          defineField({ name: 'url', title: 'URL', type: 'url' }),
        ],
        preview: { select: { title: 'label', subtitle: 'url' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'duration' },
  },
})
