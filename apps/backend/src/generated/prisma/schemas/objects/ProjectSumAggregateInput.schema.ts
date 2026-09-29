import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  storageBytes: z.literal(true).optional(),
  compilationCount: z.literal(true).optional()
}).strict();
export const ProjectSumAggregateInputObjectSchema: z.ZodType<Prisma.ProjectSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProjectSumAggregateInputType>;
export const ProjectSumAggregateInputObjectZodSchema = makeSchema();
