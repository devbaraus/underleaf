import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CompileLogCountOrderByAggregateInputObjectSchema as CompileLogCountOrderByAggregateInputObjectSchema } from './CompileLogCountOrderByAggregateInput.schema';
import { CompileLogAvgOrderByAggregateInputObjectSchema as CompileLogAvgOrderByAggregateInputObjectSchema } from './CompileLogAvgOrderByAggregateInput.schema';
import { CompileLogMaxOrderByAggregateInputObjectSchema as CompileLogMaxOrderByAggregateInputObjectSchema } from './CompileLogMaxOrderByAggregateInput.schema';
import { CompileLogMinOrderByAggregateInputObjectSchema as CompileLogMinOrderByAggregateInputObjectSchema } from './CompileLogMinOrderByAggregateInput.schema';
import { CompileLogSumOrderByAggregateInputObjectSchema as CompileLogSumOrderByAggregateInputObjectSchema } from './CompileLogSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  projectId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  success: SortOrderSchema.optional(),
  durationMs: SortOrderSchema.optional(),
  errors: SortOrderSchema.optional(),
  rawOutput: SortOrderSchema.optional(),
  engine: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CompileLogCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CompileLogAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CompileLogMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CompileLogMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CompileLogSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CompileLogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CompileLogOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogOrderByWithAggregationInput>;
export const CompileLogOrderByWithAggregationInputObjectZodSchema = makeSchema();
