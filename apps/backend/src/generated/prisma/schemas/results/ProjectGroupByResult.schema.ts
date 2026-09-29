import * as z from 'zod';
export const ProjectGroupByResultSchema = z.array(z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  ownerId: z.string().optional(),
  template: z.string().optional(),
  compilerEngine: z.string().optional(),
  status: z.string().optional(),
  lastCompiledAt: z.date().nullable().optional(),
  hasPdf: z.boolean().optional(),
  storageBytes: z.number().int().optional(),
  compilationCount: z.number().int().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    title: z.number().optional(),
    description: z.number().optional(),
    ownerId: z.number().optional(),
    template: z.number().optional(),
    compilerEngine: z.number().optional(),
    status: z.number().optional(),
    lastCompiledAt: z.number().optional(),
    hasPdf: z.number().optional(),
    storageBytes: z.number().optional(),
    compilationCount: z.number().optional(),
    tags: z.number().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _sum: z.object({
    storageBytes: z.number().nullable().optional(),
    compilationCount: z.number().nullable().optional()
  }).nullable().optional(),
  _avg: z.object({
    storageBytes: z.number().nullable().optional(),
    compilationCount: z.number().nullable().optional()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    ownerId: z.string().nullable().optional(),
    template: z.string().nullable().optional(),
    compilerEngine: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    lastCompiledAt: z.date().nullable().optional(),
    hasPdf: z.boolean().nullable().optional(),
    storageBytes: z.number().int().nullable().optional(),
    compilationCount: z.number().int().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    ownerId: z.string().nullable().optional(),
    template: z.string().nullable().optional(),
    compilerEngine: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    lastCompiledAt: z.date().nullable().optional(),
    hasPdf: z.boolean().nullable().optional(),
    storageBytes: z.number().int().nullable().optional(),
    compilationCount: z.number().int().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional()
}));