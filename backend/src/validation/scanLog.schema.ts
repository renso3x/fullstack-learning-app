import { z } from 'zod';

export const createScanLogSchema = z.object({
  body: z.object({
    courseId: z.string().min(1),
    title: z.string().min(1),
    indication: z.string().min(1),
    dateOfScan: z.string().datetime().or(z.string()),
    location: z.string().min(1),
    notes: z.string().optional(),
    imageUrl: z.string().url().optional(),
  }),
});
