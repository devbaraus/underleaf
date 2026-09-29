import * as z from 'zod';
export const ProjectFileGroupByResultSchema = z.array(z.object({
  id: z.string().optional(),
  projectId: z.string().optional(),
  name: z.string().optional(),
  path: z.string().optional(),
  content: z.string().optional(),
  isMain: z.boolean().optional(),
  type: z.string().optional(),
  sizeBytes: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _count: z.union([z.number(), z.object({
    id: z.number().optional(),
    projectId: z.number().optional(),
    name: z.number().optional(),
    path: z.number().optional(),
    content: z.number().optional(),
    isMain: z.number().optional(),
    type: z.number().optional(),
    sizeBytes: z.number().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
    _all: z.number().optional()
  })]).optional(),
  _sum: z.object({
    sizeBytes: z.number().nullable().optional()
  }).nullable().optional(),
  _avg: z.object({
    sizeBytes: z.number().nullable().optional()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable().optional(),
    projectId: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    path: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    isMain: z.boolean().nullable().optional(),
    type: z.string().nullable().optional(),
    sizeBytes: z.number().int().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable().optional(),
    projectId: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    path: z.string().nullable().optional(),
    content: z.string().nullable().optional(),
    isMain: z.boolean().nullable().optional(),
    type: z.string().nullable().optional(),
    sizeBytes: z.number().int().nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  }).nullable().optional()
}));