import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  sizeBytes: SortOrderSchema.optional()
}).strict();
export const ProjectFileAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProjectFileAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileAvgOrderByAggregateInput>;
export const ProjectFileAvgOrderByAggregateInputObjectZodSchema = makeSchema();
