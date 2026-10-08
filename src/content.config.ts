import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// Image fields hold a file name without extension, resolved against
// src/assets/sessions/<session>/ (see src/lib/images.ts).
const sessions = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sessions' }),
  schema: z.object({
    templateKey: z.literal('session'),
    title: z.string(),
    session: z.string(),
    date: z.coerce.date(),
    position: z.number(),
    info: z.array(z.object({ role: z.string(), name: z.string() })),
    cover: z.string(),
    views: z.array(z.object({
      type: z.number(),
      first: z.string().nullable(),
      second: z.string().nullable(),
      description: z.string().nullable(),
    })),
    tags: z.array(z.string()).optional(),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
  }),
})

export const collections = { sessions, pages }
