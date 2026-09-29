import * as z from 'zod';
export const CompileLogCreateResultSchema = z.object({
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
});