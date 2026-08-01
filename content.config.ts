import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    cases: defineCollection({
      type: 'page',
      source: {
        include: 'cases/*.md',
        exclude: ['cases/_*.md'],
      },
      schema: z.object({
        title: z.string(),
        category: z.enum(['sites', 'bots', 'miniapps']),
        description: z.string(),
        link: z.string(),
        image: z.string().optional(),
        alt: z.string().optional(),
        images: z.array(z.object({
          src: z.string(),
          alt: z.string(),
        })).optional(),
        order: z.number().default(999),
      }),
    }),
  },
})
