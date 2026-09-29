import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  durationMs: SortOrderSchema.optional()
}).strict();
export const CompileLogAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CompileLogAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogAvgOrderByAggregateInput>;
export const CompileLogAvgOrderByAggregateInputObjectZodSchema = makeSchema();
