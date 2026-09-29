import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

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
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ProjectFileMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProjectFileMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileMaxOrderByAggregateInput>;
export const ProjectFileMaxOrderByAggregateInputObjectZodSchema = makeSchema();
