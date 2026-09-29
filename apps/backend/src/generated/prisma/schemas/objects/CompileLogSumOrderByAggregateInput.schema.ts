import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  durationMs: SortOrderSchema.optional()
}).strict();
export const CompileLogSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CompileLogSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogSumOrderByAggregateInput>;
export const CompileLogSumOrderByAggregateInputObjectZodSchema = makeSchema();
