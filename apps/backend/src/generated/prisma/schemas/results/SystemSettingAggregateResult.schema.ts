import * as z from 'zod';
export const SystemSettingAggregateResultSchema = z.object({  _count: z.union([z.number(), z.object({
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
  }).nullable().optional()});