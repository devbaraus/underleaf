import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProjectOrderByWithRelationInputObjectSchema as ProjectOrderByWithRelationInputObjectSchema } from './ProjectOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  projectId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  path: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  isMain: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  sizeBytes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ProjectFileOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProjectFileOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileOrderByWithRelationInput>;
export const ProjectFileOrderByWithRelationInputObjectZodSchema = makeSchema();
