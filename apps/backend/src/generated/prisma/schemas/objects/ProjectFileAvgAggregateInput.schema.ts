import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  sizeBytes: z.literal(true).optional()
}).strict();
export const ProjectFileAvgAggregateInputObjectSchema: z.ZodType<Prisma.ProjectFileAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileAvgAggregateInputType>;
export const ProjectFileAvgAggregateInputObjectZodSchema = makeSchema();
