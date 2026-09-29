import * as z from 'zod';
export const SessionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  expiresAt: z.date(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  impersonatedBy: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
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