import * as z from 'zod';
export const ProjectFileUpsertResultSchema = z.object({
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
});