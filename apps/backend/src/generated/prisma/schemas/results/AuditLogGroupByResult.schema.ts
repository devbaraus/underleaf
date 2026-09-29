import * as z from 'zod';
export const AuditLogGroupByResultSchema = z.array(z.object({
  id: z.string().optional(),
  model: z.string().optional(),
  action: z.unknown().optional(),
  recordId: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  after: z.unknown().nullable().optional(),
  createdAt: z.date().optional(),
  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    model: z.number().optional(),
    action: z.number().optional(),
    recordId: z.number().optional(),
    userId: z.number().optional(),
    after: z.number().optional(),
    createdAt: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _min: z.object({
    id: z.string().nullable().optional(),
    model: z.string().nullable().optional(),
    action: z.unknown().nullable().optional(),
    recordId: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
    createdAt: z.date().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable().optional(),
    model: z.string().nullable().optional(),
    action: z.unknown().nullable().optional(),
    recordId: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
    createdAt: z.date().nullable().optional()
  }).nullable().optional()
}));