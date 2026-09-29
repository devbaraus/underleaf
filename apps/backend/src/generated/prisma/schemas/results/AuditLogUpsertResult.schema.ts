import * as z from 'zod';
export const AuditLogUpsertResultSchema = z.object({
  id: z.string(),
  model: z.string(),
  action: z.unknown(),
  recordId: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  after: z.unknown().nullable().optional(),
  createdAt: z.date(),
  user: z.unknown().optional()
});