import * as z from 'zod';
export const SystemSettingGroupByResultSchema = z.array(z.object({
  key: z.string().optional(),
  value: z.string().optional(),
  description: z.string().optional(),
  updatedAt: z.date().optional(),
  _count: z.union([z.number(), z.object({
    key: z.number().optional(),
    value: z.number().optional(),
    description: z.number().optional(),
    updatedAt: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _min: z.object({
    key: z.string().nullable().optional(),
    value: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    key: z.string().nullable().optional(),
    value: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional()
}));