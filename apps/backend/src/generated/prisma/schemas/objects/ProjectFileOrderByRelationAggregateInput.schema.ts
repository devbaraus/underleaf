import * as z from 'zod';
import type { Prisma } from '../../browser';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ProjectFileOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ProjectFileOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileOrderByRelationAggregateInput>;
export const ProjectFileOrderByRelationAggregateInputObjectZodSchema = makeSchema();
