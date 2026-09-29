import * as z from 'zod';
import type { Prisma } from '../../browser';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  title: z.literal(true).optional(),
  description: z.literal(true).optional(),
  ownerId: z.literal(true).optional(),
  template: z.literal(true).optional(),
  compilerEngine: z.literal(true).optional(),
  status: z.literal(true).optional(),
  lastCompiledAt: z.literal(true).optional(),
  hasPdf: z.literal(true).optional(),
  storageBytes: z.literal(true).optional(),
  compilationCount: z.literal(true).optional(),
  tags: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ProjectCountAggregateInputObjectSchema: z.ZodType<Prisma.ProjectCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProjectCountAggregateInputType>;
export const ProjectCountAggregateInputObjectZodSchema = makeSchema();
