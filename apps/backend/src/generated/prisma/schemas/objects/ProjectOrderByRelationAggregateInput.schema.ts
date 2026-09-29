import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ProjectOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ProjectOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectOrderByRelationAggregateInput>;
export const ProjectOrderByRelationAggregateInputObjectZodSchema = makeSchema();
