import * as z from 'zod';
export const SessionGroupByResultSchema = z.array(z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  token: z.string().optional(),
  expiresAt: z.date().optional(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  impersonatedBy: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    userId: z.number().optional(),
    token: z.number().optional(),
    expiresAt: z.number().optional(),
    ipAddress: z.number().optional(),
    userAgent: z.number().optional(),
    impersonatedBy: z.number().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _min: z.object({
    id: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
    token: z.string().nullable().optional(),
    expiresAt: z.date().nullable().optional(),
    ipAddress: z.string().nullable().optional(),
    userAgent: z.string().nullable().optional(),
    impersonatedBy: z.string().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
    token: z.string().nullable().optional(),
    expiresAt: z.date().nullable().optional(),
    ipAddress: z.string().nullable().optional(),
    userAgent: z.string().nullable().optional(),
    impersonatedBy: z.string().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional()
}));