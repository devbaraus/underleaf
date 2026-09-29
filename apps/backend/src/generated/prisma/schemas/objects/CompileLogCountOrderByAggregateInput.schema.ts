import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  projectId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  success: SortOrderSchema.optional(),
  durationMs: SortOrderSchema.optional(),
  errors: SortOrderSchema.optional(),
  rawOutput: SortOrderSchema.optional(),
  engine: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const CompileLogCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CompileLogCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogCountOrderByAggregateInput>;
export const CompileLogCountOrderByAggregateInputObjectZodSchema = makeSchema();
