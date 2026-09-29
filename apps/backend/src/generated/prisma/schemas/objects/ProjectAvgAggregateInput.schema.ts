import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  storageBytes: z.literal(true).optional(),
  compilationCount: z.literal(true).optional()
}).strict();
export const ProjectAvgAggregateInputObjectSchema: z.ZodType<Prisma.ProjectAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProjectAvgAggregateInputType>;
export const ProjectAvgAggregateInputObjectZodSchema = makeSchema();
