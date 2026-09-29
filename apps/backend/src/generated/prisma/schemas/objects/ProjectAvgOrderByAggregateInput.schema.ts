import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  storageBytes: SortOrderSchema.optional(),
  compilationCount: SortOrderSchema.optional()
}).strict();
export const ProjectAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProjectAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectAvgOrderByAggregateInput>;
export const ProjectAvgOrderByAggregateInputObjectZodSchema = makeSchema();
