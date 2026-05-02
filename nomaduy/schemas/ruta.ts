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
    // Auto-generated translation fields — hidden from Studio UI
    defineField({ name: 'title_en', type: 'string', title: 'Title (EN)', hidden: true }),
    defineField({ name: 'title_pt', type: 'string', title: 'Title (PT)', hidden: true }),
    defineField({ name: 'teaser_en', type: 'text', title: 'Teaser (EN)', hidden: true }),
    defineField({ name: 'teaser_pt', type: 'text', title: 'Teaser (PT)', hidden: true }),
    defineField({ name: 'vibe_en', type: 'string', title: 'Vibe (EN)', hidden: true }),
    defineField({ name: 'vibe_pt', type: 'string', title: 'Vibe (PT)', hidden: true }),
    defineField({ name: 'interestLabel_en', type: 'string', title: 'Interest Label (EN)', hidden: true }),
    defineField({ name: 'interestLabel_pt', type: 'string', title: 'Interest Label (PT)', hidden: true }),
    defineField({ name: 'duration_en', type: 'string', title: 'Duration (EN)', hidden: true }),
    defineField({ name: 'duration_pt', type: 'string', title: 'Duration (PT)', hidden: true }),
    defineField({ name: 'stops_en', type: 'array', title: 'Stops (EN)', of: [{ type: 'string' }], hidden: true }),
    defineField({ name: 'stops_pt', type: 'array', title: 'Stops (PT)', of: [{ type: 'string' }], hidden: true }),
    defineField({
      name: 'itinerary_en',
      type: 'array',
      title: 'Itinerary (EN)',
      hidden: true,
      of: [{
        type: 'object',
        name: 'itineraryDayEn',
        fields: [
          defineField({ name: 'day', type: 'string', title: 'Day' }),
          defineField({ name: 'content', type: 'text', title: 'Content' }),
        ],
      }],
    }),
    defineField({
      name: 'itinerary_pt',
      type: 'array',
      title: 'Itinerary (PT)',
      hidden: true,
      of: [{
        type: 'object',
        name: 'itineraryDayPt',
        fields: [
          defineField({ name: 'day', type: 'string', title: 'Day' }),
          defineField({ name: 'content', type: 'text', title: 'Content' }),
        ],
      }],
    }),
    defineField({
      name: 'stayLinks_en',
      type: 'array',
      title: 'Stay Links (EN)',
      hidden: true,
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label' }),
          defineField({ name: 'url', type: 'url', title: 'URL' }),
        ],
      }],
    }),
    defineField({
      name: 'stayLinks_pt',
      type: 'array',
      title: 'Stay Links (PT)',
      hidden: true,
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label' }),
          defineField({ name: 'url', type: 'url', title: 'URL' }),
        ],
      }],
    }),
    defineField({
      name: 'doLinks_en',
      type: 'array',
      title: 'Do Links (EN)',
      hidden: true,
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label' }),
          defineField({ name: 'url', type: 'url', title: 'URL' }),
        ],
      }],
    }),
    defineField({
      name: 'doLinks_pt',
      type: 'array',
      title: 'Do Links (PT)',
      hidden: true,
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label' }),
          defineField({ name: 'url', type: 'url', title: 'URL' }),
        ],
      }],
    }),
    defineField({
      name: 'eatLinks_en',
      type: 'array',
      title: 'Eat Links (EN)',
      hidden: true,
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label' }),
          defineField({ name: 'url', type: 'url', title: 'URL' }),
        ],
      }],
    }),
    defineField({
      name: 'eatLinks_pt',
      type: 'array',
      title: 'Eat Links (PT)',
      hidden: true,
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label' }),
          defineField({ name: 'url', type: 'url', title: 'URL' }),
        ],
      }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'duration' },
  },
})
