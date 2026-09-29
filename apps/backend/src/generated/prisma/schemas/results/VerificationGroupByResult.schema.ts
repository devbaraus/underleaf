import * as z from 'zod';
export const VerificationGroupByResultSchema = z.array(z.object({
  id: z.string().optional(),
  identifier: z.string().optional(),
  value: z.string().optional(),
  expiresAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    identifier: z.number().optional(),
    value: z.number().optional(),
    expiresAt: z.number().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _min: z.object({
    id: z.string().nullable().optional(),
    identifier: z.string().nullable().optional(),
    value: z.string().nullable().optional(),
    expiresAt: z.date().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable().optional(),
    identifier: z.string().nullable().optional(),
    value: z.string().nullable().optional(),
    expiresAt: z.date().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional()
}));