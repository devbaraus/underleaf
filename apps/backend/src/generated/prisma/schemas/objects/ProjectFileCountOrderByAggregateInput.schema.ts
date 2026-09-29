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
export const ProjectFileCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProjectFileCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileCountOrderByAggregateInput>;
export const ProjectFileCountOrderByAggregateInputObjectZodSchema = makeSchema();
