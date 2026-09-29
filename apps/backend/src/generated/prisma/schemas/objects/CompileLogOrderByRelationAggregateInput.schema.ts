import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CompileLogOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CompileLogOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogOrderByRelationAggregateInput>;
export const CompileLogOrderByRelationAggregateInputObjectZodSchema = makeSchema();
