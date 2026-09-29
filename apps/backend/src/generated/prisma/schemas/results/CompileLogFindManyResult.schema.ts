import * as z from 'zod';
export const CompileLogFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  projectId: z.string(),
  userId: z.string(),
  success: z.boolean(),
  durationMs: z.number().int(),
  errors: z.unknown(),
  rawOutput: z.string(),
  engine: z.string(),
  createdAt: z.date(),
  project: z.unknown().optional(),
  user: z.unknown().optional()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});