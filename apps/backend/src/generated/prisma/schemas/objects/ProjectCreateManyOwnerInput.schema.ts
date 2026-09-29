import * as z from 'zod';
import type { Prisma } from '../../browser';
import { ProjectCreatetagsInputObjectSchema as ProjectCreatetagsInputObjectSchema } from './ProjectCreatetagsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  template: z.string().optional(),
  compilerEngine: z.string().optional(),
  status: z.string().optional(),
  lastCompiledAt: z.coerce.date().optional().nullable(),
  hasPdf: z.boolean().optional(),
  storageBytes: z.number().int().optional(),
  compilationCount: z.number().int().optional(),
  tags: z.union([z.lazy(() => ProjectCreatetagsInputObjectSchema), z.string().array()]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ProjectCreateManyOwnerInputObjectSchema: z.ZodType<Prisma.ProjectCreateManyOwnerInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCreateManyOwnerInput>;
export const ProjectCreateManyOwnerInputObjectZodSchema = makeSchema();
