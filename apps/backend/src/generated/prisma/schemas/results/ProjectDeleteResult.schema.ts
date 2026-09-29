import * as z from 'zod';
export const ProjectDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  ownerId: z.string(),
  template: z.string(),
  compilerEngine: z.string(),
  status: z.string(),
  lastCompiledAt: z.date().nullable().optional(),
  hasPdf: z.boolean(),
  storageBytes: z.number().int(),
  compilationCount: z.number().int(),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  owner: z.unknown().optional(),
  files: z.array(z.unknown()).optional(),
  compileLogs: z.array(z.unknown()).optional()
}));