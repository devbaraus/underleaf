import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  sizeBytes: z.literal(true).optional()
}).strict();
export const ProjectFileSumAggregateInputObjectSchema: z.ZodType<Prisma.ProjectFileSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProjectFileSumAggregateInputType>;
export const ProjectFileSumAggregateInputObjectZodSchema = makeSchema();
