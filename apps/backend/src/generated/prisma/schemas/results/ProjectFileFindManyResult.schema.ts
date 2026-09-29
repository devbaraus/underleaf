import * as z from 'zod';
export const ProjectFileFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string(),
  path: z.string(),
  content: z.string(),
  isMain: z.boolean(),
  type: z.string(),
  sizeBytes: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  project: z.unknown().optional()
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