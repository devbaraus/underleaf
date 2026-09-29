import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  storageBytes: SortOrderSchema.optional(),
  compilationCount: SortOrderSchema.optional()
}).strict();
export const ProjectSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProjectSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectSumOrderByAggregateInput>;
export const ProjectSumOrderByAggregateInputObjectZodSchema = makeSchema();
