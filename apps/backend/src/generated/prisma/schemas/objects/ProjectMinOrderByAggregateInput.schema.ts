import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  ownerId: SortOrderSchema.optional(),
  template: SortOrderSchema.optional(),
  compilerEngine: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  lastCompiledAt: SortOrderSchema.optional(),
  hasPdf: SortOrderSchema.optional(),
  storageBytes: SortOrderSchema.optional(),
  compilationCount: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ProjectMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProjectMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectMinOrderByAggregateInput>;
export const ProjectMinOrderByAggregateInputObjectZodSchema = makeSchema();
