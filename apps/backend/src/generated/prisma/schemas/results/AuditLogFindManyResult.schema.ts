import * as z from 'zod';
export const AuditLogFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  model: z.string(),
  action: z.unknown(),
  recordId: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  after: z.unknown().nullable().optional(),
  createdAt: z.date(),
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