import * as z from 'zod';
export const CompileLogAggregateResultSchema = z.object({  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    projectId: z.number().optional(),
    userId: z.number().optional(),
    success: z.number().optional(),
    durationMs: z.number().optional(),
    errors: z.number().optional(),
    rawOutput: z.number().optional(),
    engine: z.number().optional(),
    createdAt: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _sum: z.object({
    durationMs: z.number().nullable().optional()
  }).nullable().optional(),
  _avg: z.object({
    durationMs: z.number().nullable().optional()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable().optional(),
    projectId: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
    success: z.boolean().nullable().optional(),
    durationMs: z.number().int().nullable().optional(),
    rawOutput: z.string().nullable().optional(),
    engine: z.string().nullable().optional(),
    createdAt: z.date().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable().optional(),
    projectId: z.string().nullable().optional(),
    userId: z.string().nullable().optional(),
    success: z.boolean().nullable().optional(),
    durationMs: z.number().int().nullable().optional(),
    rawOutput: z.string().nullable().optional(),
    engine: z.string().nullable().optional(),
    createdAt: z.date().nullable().optional()
  }).nullable().optional()});