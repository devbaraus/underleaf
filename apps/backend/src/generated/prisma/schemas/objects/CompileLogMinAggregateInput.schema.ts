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
export const CompileLogMinAggregateInputObjectSchema: z.ZodType<Prisma.CompileLogMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CompileLogMinAggregateInputType>;
export const CompileLogMinAggregateInputObjectZodSchema = makeSchema();
