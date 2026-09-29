import * as z from 'zod';
export const SessionUpdateResultSchema = z.nullable(z.object({
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
}));