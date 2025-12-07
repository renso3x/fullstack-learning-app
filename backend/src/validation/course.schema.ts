import { z } from 'zod';

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    modality: z.string().min(1),
    status: z.enum(['active', 'inactive']).optional(),
  }),
});

export const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    modality: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});
