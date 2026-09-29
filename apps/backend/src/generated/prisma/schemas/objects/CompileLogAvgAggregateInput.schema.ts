import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  durationMs: z.literal(true).optional()
}).strict();
export const CompileLogAvgAggregateInputObjectSchema: z.ZodType<Prisma.CompileLogAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogAvgAggregateInputType>;
export const CompileLogAvgAggregateInputObjectZodSchema = makeSchema();
