import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  durationMs: z.literal(true).optional()
}).strict();
export const CompileLogSumAggregateInputObjectSchema: z.ZodType<Prisma.CompileLogSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogSumAggregateInputType>;
export const CompileLogSumAggregateInputObjectZodSchema = makeSchema();
