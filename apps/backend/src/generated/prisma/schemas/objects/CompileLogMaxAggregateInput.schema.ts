import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  projectId: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  success: z.literal(true).optional(),
  durationMs: z.literal(true).optional(),
  rawOutput: z.literal(true).optional(),
  engine: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const CompileLogMaxAggregateInputObjectSchema: z.ZodType<Prisma.CompileLogMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogMaxAggregateInputType>;
export const CompileLogMaxAggregateInputObjectZodSchema = makeSchema();
