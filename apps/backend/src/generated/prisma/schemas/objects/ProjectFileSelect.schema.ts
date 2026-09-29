import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectArgsObjectSchema as ProjectArgsObjectSchema } from './ProjectArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  projectId: z.boolean().optional(),
  name: z.boolean().optional(),
  path: z.boolean().optional(),
  content: z.boolean().optional(),
  isMain: z.boolean().optional(),
  type: z.boolean().optional(),
  sizeBytes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  project: z.union([z.boolean(), z.lazy(() => ProjectArgsObjectSchema)]).optional()
}).strict();
export const ProjectFileSelectObjectSchema: z.ZodType<Prisma.ProjectFileSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileSelect>;
export const ProjectFileSelectObjectZodSchema = makeSchema();
