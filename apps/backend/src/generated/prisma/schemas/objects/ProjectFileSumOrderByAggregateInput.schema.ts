import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  sizeBytes: SortOrderSchema.optional()
}).strict();
export const ProjectFileSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProjectFileSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileSumOrderByAggregateInput>;
export const ProjectFileSumOrderByAggregateInputObjectZodSchema = makeSchema();
